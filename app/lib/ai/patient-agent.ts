import OpenAI from 'openai';
import { MedicalCase, Message, EmotionalState } from '../types';
import { searchRelevantContext } from './rag-search';

export class PatientAgent {
  caseData: MedicalCase;
  private openai: OpenAI;

  constructor(caseData: MedicalCase) {
    this.caseData = caseData;
    
    // Hardcoded API key - no environment variables
    this.openai = new OpenAI({
      //apiKey: "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"
      apiKey: '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',
    });
  }

  async getInitialStatement(): Promise<string> {
    const name = this.caseData?.patient_profile?.name || 'Patient';
    const emotionalState = this.caseData?.patient_profile?.emotional_state || 'concerned';
    const presentingComplaint = this.caseData?.patient_profile?.presenting_complaint || 'not feeling well';

    const greetings = [
      `Hello doctor, my name is ${name}... [${emotionalState}] I've been ${presentingComplaint}.`,
      `Hi doctor, I'm ${name}... [${emotionalState}] I really need help with something.`,
      `Good morning doctor, my name is ${name}... [${emotionalState}] I haven't been doing well lately.`,
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  async respond(
    doctorMessage: string,
    conversationHistory: Message[] = []
  ): Promise<{ response: string; emotion: EmotionalState }> {
    
    // STEP 1: Get RAG context
    let ragContext = '';
    try {
      const ragResults = await searchRelevantContext(
        doctorMessage,
        this.caseData.case_id,
        2
      );
      
      if (ragResults && ragResults.length > 0) {
        ragContext = ragResults
          .map((r) => `${r.content} (relevance: ${r.relevance_score.toFixed(2)})`)
          .join('\n\n');
      }
    } catch (error) {
      console.error('RAG search failed:', error);
    }

    // Build conversation context
    const recentHistory = conversationHistory
      .slice(-4)
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .join('\n');

    // STEP 2: Create prompt
    const prompt = `You are a REAL patient in a medical examination. You must respond naturally and authentically.

YOUR CHARACTER:
- Name: ${this.caseData.patient_profile.name}
- Age: ${this.caseData.patient_profile.age}
- Gender: ${this.caseData.patient_profile.gender}
- Emotional State: ${this.caseData.patient_profile.emotional_state}
- Communication Style: ${this.caseData.patient_profile.communication_style}

YOUR MEDICAL CONDITION:
${this.caseData.history_of_presenting_complaint}

RECENT CONVERSATION:
${recentHistory}

DOCTOR JUST SAID:
"${doctorMessage}"

MEDICAL CONTEXT (use this to inform your responses accurately):
${ragContext || 'No additional context available'}

CRITICAL INSTRUCTIONS:
1. ANALYZE what the doctor ACTUALLY asked.
2. GRADUAL DISCLOSURE: Answer what was asked, nothing more.
3. KEEP IT SHORT: 2-4 sentences maximum.
4. SHOW EMOTION: Use markers like [pause] or [looks down].

NOW RESPOND as ${this.caseData.patient_profile.name} would.`;

    // STEP 3: Call OpenAI
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a patient in a medical examination. Respond naturally in character.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 300,
      });

      const responseText = response.choices[0]?.message?.content || 'I... I need a moment to think...';

      const emotion = this.determineEmotion(
        responseText,
        this.caseData.patient_profile.emotional_state
      );

      return {
        response: responseText,
        emotion,
      };
    } catch (error) {
      console.error('OpenAI error:', error);
      return {
        response: "I'm sorry, I'm feeling a bit overwhelmed right now...",
        emotion: 'anxious',
      };
    }
  }

  private determineEmotion(
    responseText: string,
    baseEmotionalState: string
  ): EmotionalState {
    const lowerResponse = responseText.toLowerCase();
    const lowerState = baseEmotionalState.toLowerCase();

    if (lowerResponse.includes('worried') || lowerResponse.includes('anxious') || lowerState.includes('anxious')) {
      return 'anxious';
    }
    if (lowerResponse.includes('sad') || lowerResponse.includes('low') || lowerState.includes('depressed')) {
      return 'sad';
    }
    if (lowerResponse.includes('pain') || lowerResponse.includes('hurt') || lowerState.includes('pain')) {
      return 'distressed';
    }
    if (lowerResponse.includes('better') || lowerResponse.includes('thank you')) {
      return 'hopeful';
    }
    return 'calm';
  }
}
// import OpenAI from 'openai';
// import { MedicalCase, Message, EmotionalState } from '../types';
// import { searchRelevantContext } from './rag-search';

// export class PatientAgent {
//   caseData: MedicalCase;
//   private openai: OpenAI;

//   constructor(caseData: MedicalCase) {
//     this.caseData = caseData;
    
//     // Initializing inside the constructor ensures process.env is accessed 
//     // at runtime on the server, preventing the "Missing credentials" error.
//     const apiKey = process.env.OPENAI_API_KEY;
//     if (!apiKey) {
//       console.error("CRITICAL: OPENAI_API_KEY is missing from environment variables.");
//     }

//     this.openai = new OpenAI({
//       apiKey: apiKey || '',
//     });
//   }

//   async getInitialStatement(): Promise<string> {
//     const name = this.caseData?.patient_profile?.name || 'Patient';
//     const emotionalState = this.caseData?.patient_profile?.emotional_state || 'concerned';
//     const presentingComplaint = this.caseData?.patient_profile?.presenting_complaint || 'not feeling well';

//     const greetings = [
//       `Hello doctor, my name is ${name}... [${emotionalState}] I've been ${presentingComplaint}.`,
//       `Hi doctor, I'm ${name}... [${emotionalState}] I really need help with something.`,
//       `Good morning doctor, my name is ${name}... [${emotionalState}] I haven't been doing well lately.`,
//     ];

//     return greetings[Math.floor(Math.random() * greetings.length)];
//   }

//   async respond(
//     doctorMessage: string,
//     conversationHistory: Message[] = []
//   ): Promise<{ response: string; emotion: EmotionalState }> {
    
//     // STEP 1: Get RAG context
//     let ragContext = '';
//     try {
//       const ragResults = await searchRelevantContext(
//         doctorMessage,
//         this.caseData.case_id,
//         2
//       );
      
//       if (ragResults && ragResults.length > 0) {
//         ragContext = ragResults
//           .map((r) => `${r.content} (relevance: ${r.relevance_score.toFixed(2)})`)
//           .join('\n\n');
//       }
//     } catch (error) {
//       console.error('RAG search failed:', error);
//     }

//     // Build conversation context
//     const recentHistory = conversationHistory
//       .slice(-4)
//       .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
//       .join('\n');

//     // STEP 2: Create prompt
//     const prompt = `You are a REAL patient in a medical examination. You must respond naturally and authentically.

// YOUR CHARACTER:
// - Name: ${this.caseData.patient_profile.name}
// - Age: ${this.caseData.patient_profile.age}
// - Gender: ${this.caseData.patient_profile.gender}
// - Emotional State: ${this.caseData.patient_profile.emotional_state}
// - Communication Style: ${this.caseData.patient_profile.communication_style}

// YOUR MEDICAL CONDITION:
// ${this.caseData.history_of_presenting_complaint}

// RECENT CONVERSATION:
// ${recentHistory}

// DOCTOR JUST SAID:
// "${doctorMessage}"

// MEDICAL CONTEXT (use this to inform your responses accurately):
// ${ragContext || 'No additional context available'}

// CRITICAL INSTRUCTIONS:
// 1. ANALYZE what the doctor ACTUALLY asked.
// 2. GRADUAL DISCLOSURE: Answer what was asked, nothing more.
// 3. KEEP IT SHORT: 2-4 sentences maximum.
// 4. SHOW EMOTION: Use markers like [pause] or [looks down].

// NOW RESPOND as ${this.caseData.patient_profile.name} would.`;

//     // STEP 3: Call OpenAI using the instance client
//     try {
//       const response = await this.openai.chat.completions.create({
//         model: process.env.OPENAI_MODEL || 'gpt-4o',
//         messages: [
//           { role: 'system', content: 'You are a patient in a medical examination. Respond naturally in character.' },
//           { role: 'user', content: prompt }
//         ],
//         temperature: 0.8,
//         max_tokens: 300,
//       });

//       const responseText = response.choices[0]?.message?.content || 'I... I need a moment to think...';

//       const emotion = this.determineEmotion(
//         responseText,
//         this.caseData.patient_profile.emotional_state
//       );

//       return {
//         response: responseText,
//         emotion,
//       };
//     } catch (error) {
//       console.error('OpenAI error:', error);
//       return {
//         response: "I'm sorry, I'm feeling a bit overwhelmed right now...",
//         emotion: 'anxious',
//       };
//     }
//   }

//   private determineEmotion(
//     responseText: string,
//     baseEmotionalState: string
//   ): EmotionalState {
//     const lowerResponse = responseText.toLowerCase();
//     const lowerState = baseEmotionalState.toLowerCase();

//     if (lowerResponse.includes('worried') || lowerResponse.includes('anxious') || lowerState.includes('anxious')) {
//       return 'anxious';
//     }
//     if (lowerResponse.includes('sad') || lowerResponse.includes('low') || lowerState.includes('depressed')) {
//       return 'sad';
//     }
//     if (lowerResponse.includes('pain') || lowerResponse.includes('hurt') || lowerState.includes('pain')) {
//       return 'distressed';
//     }
//     if (lowerResponse.includes('better') || lowerResponse.includes('thank you')) {
//       return 'hopeful';
//     }
//     return 'calm';
//   }
// }
