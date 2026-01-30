
// import { chatWithJSON } from './openai';
// import { searchRelevantContext } from './rag-search';
// import type { DomainScore, GlobalJudgement } from '../types';

// export class ExaminerAgent {
//   caseData: any;

//   constructor(caseData: any) {
//     this.caseData = caseData;
//   }

//   /**
//    * Analyze doctor's tone (runs silently in background)
//    */
//   async analyzeDoctorTone(
//     doctorMessage: string,
//     patientContext: string
//   ): Promise<any> {
//     try {
//       const prompt = `Analyze this doctor's question using MedPsychKH CASC Communication standards.

// **Context:**
// Patient: "${patientContext}"
// Doctor: "${doctorMessage}"
// Specialty: ${this.caseData.specialty}
// Patient's emotional state: ${this.caseData.patient_profile.emotional_state}

// **Assess against MedPsychKH criteria:**
// 1. Formulaic phrases (e.g., "How does that make you feel?" repeatedly)
// 2. Picking up on emotional cues (patient mentions distress, does doctor respond?)
// 3. Questioning style (open vs closed, appropriate vs inappropriate)
// 4. Robotic delivery vs genuine conversation

// Return JSON:
// {
//   "empathy_level": "high|medium|low",
//   "tone": "brief description",
//   "communication_score": 1-10,
//   "concerns": ["specific issues"],
//   "positive_aspects": ["techniques used"],
//   "formulaic_detected": boolean,
//   "question_type": "open|closed|mixed",
//   "responds_to_cues": boolean,
//   "validation_provided": boolean
// }`;

//       const response = await chatWithJSON([{ role: 'user', content: prompt }], {}, 0.3);

//       return {
//         empathy_level: response.empathy_level || 'medium',
//         tone: response.tone || 'neutral',
//         communication_score: response.communication_score || 7,
//         concerns: response.concerns || [],
//         positive_aspects: response.positive_aspects || [],
//         formulaic_detected: response.formulaic_detected || false,
//         question_type: response.question_type || 'mixed',
//         responds_to_cues: response.responds_to_cues !== false,
//         validation_provided: response.validation_provided !== false,
//       };
//     } catch (error) {
//       console.error('❌ Tone analysis error:', error);
//       return {
//         empathy_level: 'medium',
//         tone: 'neutral',
//         communication_score: 7,
//         concerns: [],
//         positive_aspects: [],
//         formulaic_detected: false,
//         question_type: 'mixed',
//         responds_to_cues: true,
//         validation_provided: true,
//       };
//     }
//   }

//   /**
//    * Generate evaluation using ONLY explicit MedPsychKH PDF criteria
//    */
//   async generateEvaluation(
//     conversation: any[],
//     elapsedTime: number,
//     communicationAnalysis?: any
//   ): Promise<any> {
//     try {
//       const doctorMessages = conversation
//         .filter((msg) => msg.role === 'doctor')
//         .map((msg) => msg.content);

//       const stationType = this.caseData.station_type || 'history';

//       // Get RAG context
//       const ragContext = await searchRelevantContext(
//         `${this.caseData.diagnosis} CASC ${this.caseData.specialty}`,
//         this.caseData.case_id,
//         3
//       );

//       const contextText = ragContext.map((ctx) => ctx.content).join('\n\n');

//       const commMetrics = communicationAnalysis ? `
// **Communication Analysis:**
// - Average Empathy: ${communicationAnalysis.average_empathy}
// - Average Score: ${communicationAnalysis.average_tone_score}/10
// - Questions Asked: ${communicationAnalysis.total_questions}
// - Formulaic Count: ${communicationAnalysis.formulaic_count || 0}
// - Common Issues: ${communicationAnalysis.common_issues?.join(', ') || 'None'}
// ` : '';

//       const prompt = `You are a STRICT CASC examiner using the official MedPsychKH Communication and Marking Scheme 2025.

// **STATION: ${stationType.toUpperCase()}**
// Diagnosis: ${this.caseData.diagnosis}
// Specialty: ${this.caseData.specialty}
// Patient: ${this.caseData.patient_profile.name}, ${this.caseData.patient_profile.age}
// Emotional State: ${this.caseData.patient_profile.emotional_state}
// Time: ${Math.round(elapsedTime / 60)} min / 7 min

// **Key Points Expected:**
// ${this.caseData.key_examination_points.join('\n')}

// **Full Conversation:**
// ${conversation.map((msg) => 
//   `${msg.role === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 ' + this.caseData.patient_profile.name}: ${msg.content}`
// ).join('\n')}

// ${commMetrics}

// **Clinical Context:**
// ${contextText || 'Standard CASC principles'}

// ═══════════════════════════════════════════════════════════
// OFFICIAL MedPsychKH 2025 MARKING CRITERIA (DIRECT FROM PDF)
// ═══════════════════════════════════════════════════════════

// **MOST FREQUENT FAILURE REASONS (PDF Page - Communication Red Flags):**

// 1. **"The Formulaic Consultation Trap"** (The #1 reason candidates fail)
//    - Repetitive phrases: "How does that make you feel?"
//    - Questions as a "list" rather than conversation
//    - Pre-prepared responses that don't match patient's answers
//    - Robotic delivery without genuine connection

// 2. **"Poor listening skills. Poor use and response to cues"** (Most frequent failure)
//    - Not picking up on verbal cues (hesitations, tone changes, word choices)
//    - Not picking up on emotional cues (distress signals, withdrawal)
//    - Not picking up on content cues (hints about other problems)

// 3. **"Poor questioning style"** (Extremely common failure)
//    - The 90% closed question trap
//    - Inappropriate or unprofessional questions

// **COMMUNICATION RED FLAGS - What Leads to Failure (PDF Explicit List):**

// "Listening and Responsiveness:
// - Not picking up on emotional cues
// - Failing to respond to patient's concerns
// - Continuing with agenda when patient is distressed
// - Not adapting to patient's communication style"

// "Language and Tone Issues:
// - Sounding patronizing or robotic"

// "Structure and Flow:
// - Jumping between topics without transitions
// - Not signposting what you're doing"

// ═══════════════════════════════════════════════════════════
// GLOBAL JUDGEMENT CRITERIA (PDF DEFINITIONS - EXACT QUOTES)
// ═══════════════════════════════════════════════════════════

// **Pass:**
// "The candidate demonstrates a clear level of competence expected of a newly appointed ST4, using a clinical approach that, while not always the best, is reasonably systematic, clinically justifiable, and well communicated. All essential areas of skill identified in the construct are covered."

// **Borderline Pass:**
// "The candidate shows an adequate level of competence expected of a newly appointed ST4, using a clinical approach which is at times unsystematic or inconsistent with practice at the ST4 level. Communication is mostly appropriate. The candidate covers most of the essential skill areas in the construct, but some desirable ones may be omitted."

// **Borderline Fail:**
// "The candidate fails to demonstrate an adequate level of competence. Their clinical approach is at times unsystematic or inconsistent with practice at the ST4 level. Communication may be appropriate, but the candidate does not adequately cover essential issues or makes too many omissions of less important factors."

// **KEY DISTINCTION:** Borderline Fail requires "Communication MAY be appropriate"

// **Fail:**
// "The candidate fails to demonstrate competence, with a clinical approach that shows frequent omissions and lacks focus."

// **KEY CRITERIA:** "Frequent omissions" AND "lacks focus"

// **Severe Fail:**
// "The candidate fails to demonstrate competence, with a clinical approach that is incompatible with accepted practice. Their performance may show inadequate reasoning and/or technical incompetence, alongside a marked lack of respect, attention, or empathy for the patient."

// ═══════════════════════════════════════════════════════════
// DOMAIN WEIGHTS (PDF Table - ${stationType.toUpperCase()} Station)
// ═══════════════════════════════════════════════════════════

// ${this.getWeightsDescription(stationType)}

// ═══════════════════════════════════════════════════════════
// YOUR TASK
// ═══════════════════════════════════════════════════════════

// **STEP 1: Check for the THREE most frequent failures:**
// 1. Did the candidate fall into "The Formulaic Consultation Trap"? (robotic, repetitive phrases, questions as list)
// 2. Did the candidate demonstrate "Poor listening skills, poor response to cues"? (missed emotional cues, didn't respond to patient's distress)
// 3. Did the candidate show "Poor questioning style"? (inappropriate questions, all closed questions)

// **STEP 2: Check Communication Red Flags:**
// - Not picking up on emotional cues? (patient mentions anxiety/distress, doctor ignores)
// - Failing to respond to patient's concerns?
// - Robotic delivery?
// - Jumping between topics without transitions?

// **STEP 3: Assess "Frequent Omissions" and "Lacks Focus":**
// - Were essential topics omitted? (safety assessment, key symptoms, depth of exploration)
// - Was approach disorganized or unfocused?

// **STEP 4: Determine Global Judgement:**
// - If communication is NOT appropriate (formulaic, poor cues, robotic) → Cannot be Borderline Fail → Must be FAIL or worse
// - If "frequent omissions" present → FAIL criterion met
// - If "lacks focus" present → FAIL criterion met

// **STEP 5: Score Domains:**
// - PDF states: "Most candidates land in borderline because they focus on technical aspects rather than communication"
// - Borderline candidates typically score around 3/5 (60%)
// - If candidate is WORSE than borderline (hits multiple failure criteria) → scores should be BELOW 3/5
// - Be honest: If performance was poor, give LOW scores (1-2 range)
// - If performance hits #1 failure reason (formulaic trap) → communication score should be LOW
// - If performance hits #2 failure reason (poor cues) → communication score should be LOW

// ═══════════════════════════════════════════════════════════
// RETURN FORMAT
// ═══════════════════════════════════════════════════════════

// Return JSON:
// {
//   "part_1_examiner_feedback": {
//     "global_judgement": "Excellent Pass|Pass|Borderline Pass|Borderline Fail|Fail|Severe Fail",
//     "critique": {
//       "response_to_cues": "Did candidate pick up on emotional cues? Give specific examples from conversation",
//       "questioning_style": "Was questioning appropriate and professional? Quote examples",
//       "technical_proficiency": "Was approach systematic and fluent?",
//       "formulaic_trap": "Did candidate fall into formulaic trap? Give examples"
//     },
//     "better_ways": [
//       "Specific example: Instead of [quote from conversation], candidate should have said [better phrase]"
//     ]
//   },
//   "part_2_guide": {
//     "step_1_alignment": {
//       "professionalism": "What was needed for this case",
//       "communication": "Key communication skills needed",
//       "clinical_assessment": "What should have been assessed",
//       "clinical_management": "Safety and management priorities"
//     },
//     "step_2_ideal_structure": ["Opening & rapport", "Core assessment", "Safety", "Summary"],
//     "step_3_exemplar_responses": ["Example of excellent phrasing for this case"],
//     "step_4_illustrated_examples": ["Candidate: ... → Patient: ... → Follow-up: ..."],
//     "step_5_common_mistakes": ["Mistake in this consultation → How to correct"],
//     "step_6_red_flags": ["Specific red flags from PDF that apply"],
//     "step_7_checklist": ["Essential items that should be covered"]
//   },
//   "domains": {
//     "professionalism": {
//       "score": 1-5 (BE HONEST: if unprofessional, score LOW),
//       "percentage": <score/5*100>,
//       "feedback": "Specific feedback",
//       "strengths": [],
//       "weaknesses": [],
//       "examples": ["Quote from conversation"]
//     },
//     "consultation_management": {
//       "score": 1-5 (BE HONEST: if disorganized, score LOW),
//       "percentage": <score/5*100>,
//       "feedback": "Specific feedback",
//       "strengths": [],
//       "weaknesses": [],
//       "examples": []
//     },
//     "communication_skills": {
//       "score": 1-5 (CRITICAL: If hit #1 or #2 failure reason, score LOW. Borderline = 3/5, worse = 1-2/5),
//       "percentage": <score/5*100>,
//       "feedback": "Reference the THREE most frequent failures",
//       "strengths": [],
//       "weaknesses": ["Must note if: formulaic trap, poor cues, poor questioning"],
//       "examples": ["Quote specific failures"],
//       "sub_domains": {
//         "personalisation_and_respect": {"score": 1-5, "feedback": "..."},
//         "recognising_cues": {"score": 1-5, "feedback": "Did they recognize cues? Be specific"},
//         "empathy": {"score": 1-5, "feedback": "Did they validate emotions?"},
//         "clear_information": {"score": 1-5, "feedback": "..."}
//       },
//       "formulaic_concerns": ["List any formulaic phrases"],
//       "listening_quality": "excellent|good|adequate|poor (poor if missed multiple cues)",
//       "question_style_balance": "description of question types"
//     },
//     "clinical_assessment": {
//       "score": 1-5 (BE HONEST: if frequent omissions, score LOW),
//       "percentage": <score/5*100>,
//       "feedback": "Compare coverage against key examination points",
//       "strengths": [],
//       "weaknesses": ["Note omissions"],
//       "examples": []
//     },
//     "clinical_management": {
//       "score": 1-5 (BE HONEST: if no safety assessment, score LOW),
//       "percentage": <score/5*100>,
//       "feedback": "Was safety addressed?",
//       "strengths": [],
//       "weaknesses": ["Note if safety missing"],
//       "examples": []
//     }
//   },
//   "global_judgement": "MUST match part_1 - Use PDF definitions exactly",
//   "global_justification": "Explain using PDF criteria: 'Candidate demonstrated [list failures from PDF]. This meets PDF definition of [grade] which states...'",
//   "emotional_intelligence": {
//     "overall_rating": "excellent|good|fair|poor",
//     "tone_consistency": "...",
//     "empathy_highlights": [],
//     "empathy_concerns": ["Note if failed to validate"],
//     "communication_style": "genuine|adequate|formulaic|robotic",
//     "patient_comfort_level": "high|adequate|low"
//   },
//   "safety_concerns": ["List if safety not assessed"],
//   "formulaic_trap_detected": boolean,
//   "overall_comments": "Honest assessment of performance",
//   "key_strengths": [],
//   "critical_improvements": ["Based on failures identified"],
//   "recommendations": []
// }

// **CRITICAL REMINDERS:**
// 1. Use ONLY the PDF criteria listed above
// 2. If candidate hits #1, #2, or #3 most frequent failures → score accordingly LOW
// 3. Borderline candidates score ~3/5 (60%) → worse performances score 1-2/5
// 4. "Frequent omissions" + "lacks focus" = FAIL per PDF definition
// 5. If communication NOT appropriate = cannot be Borderline Fail
// 6. Be HONEST - don't inflate scores
// 7. Quote specific examples from conversation`;

//       const response = await chatWithJSON([{ role: 'user', content: prompt }], {}, 0.2);

//       // Calculate scores
//       const totalDomainScore = Object.values(response.domains).reduce(
//         (sum: number, domain: any) => sum + (domain.score || 0),
//         0
//       );

//       const weightedPercentage = this.calculateWeightedScore(response.domains, stationType);
//       const passFail = this.determinePassFail(response.global_judgement, weightedPercentage);

//       return {
//         ...response,
//         communication_analysis: communicationAnalysis || {},
//         total_domain_score: totalDomainScore,
//         weighted_percentage: weightedPercentage,
//         pass_fail: passFail,
//         confidence_level: 'High',
//         station_type: stationType,
//         case_id: this.caseData.case_id,
//         specialty: this.caseData.specialty,
//         timestamp: new Date().toISOString(),
//       };
//     } catch (error) {
//       console.error('❌ Evaluation error:', error);
//       return this.getFallbackEvaluation(communicationAnalysis);
//     }
//   }

//   private getWeightsDescription(stationType: string): string {
//     const weights: any = {
//       history: 'Clinical Assessment ~50%, Communication ~20%, Consultation Management ~20%, Professionalism ~10%',
//       management: 'Clinical Management ~50%, Communication ~20%, Professionalism ~10%, Consultation ~10%, Assessment ~10%',
//       examination: 'Clinical Assessment ~60%, Communication ~20%, Consultation ~10%, Professionalism ~10%',
//       breaking_bad_news: 'Communication ~45%, Clinical Management ~30%, Professionalism ~15%, Consultation ~10%',
//     };
//     return weights[stationType] || weights.history;
//   }

//   private calculateWeightedScore(domains: any, stationType: string): number {
//     const weights: any = {
//       history: { professionalism: 10, consultation_management: 20, communication_skills: 20, clinical_assessment: 50, clinical_management: 0 },
//       management: { professionalism: 10, consultation_management: 10, communication_skills: 20, clinical_assessment: 10, clinical_management: 50 },
//       examination: { professionalism: 10, consultation_management: 10, communication_skills: 20, clinical_assessment: 60, clinical_management: 0 },
//       breaking_bad_news: { professionalism: 15, consultation_management: 10, communication_skills: 45, clinical_assessment: 0, clinical_management: 30 },
//     };

//     const w = weights[stationType] || weights.history;
//     let total = 0;
//     Object.keys(w).forEach((domain) => {
//       const percentage = domains[domain]?.percentage || 0;
//       total += (percentage * w[domain]) / 100;
//     });
//     return Math.round(total);
//   }

//   private determinePassFail(globalJudgement: string, weightedPercentage: number): 'PASS' | 'FAIL' {
//     if (globalJudgement === 'Severe Fail' || globalJudgement === 'Fail') return 'FAIL';
//     if (globalJudgement === 'Borderline Fail') return weightedPercentage >= 60 ? 'PASS' : 'FAIL';
//     return 'PASS';
//   }

//   private getFallbackEvaluation(communicationAnalysis: any) {
//     const fallbackDomain = {
//       score: 3,
//       percentage: 60,
//       feedback: 'Unable to complete evaluation',
//       strengths: [],
//       weaknesses: ['Evaluation incomplete'],
//       examples: [],
//     };

//     return {
//       part_1_examiner_feedback: {
//         global_judgement: 'Borderline Pass',
//         critique: {
//           response_to_cues: 'Unable to assess',
//           questioning_style: 'Unable to assess',
//           technical_proficiency: 'Unable to assess',
//           formulaic_trap: 'Unable to assess'
//         },
//         better_ways: []
//       },
//       part_2_guide: {
//         step_1_alignment: {},
//         step_2_ideal_structure: [],
//         step_3_exemplar_responses: [],
//         step_4_illustrated_examples: [],
//         step_5_common_mistakes: [],
//         step_6_red_flags: [],
//         step_7_checklist: []
//       },
//       domains: {
//         professionalism: fallbackDomain,
//         consultation_management: fallbackDomain,
//         communication_skills: {
//           ...fallbackDomain,
//           sub_domains: {
//             personalisation_and_respect: { score: 3, feedback: 'Unable to assess' },
//             recognising_cues: { score: 3, feedback: 'Unable to assess' },
//             empathy: { score: 3, feedback: 'Unable to assess' },
//             clear_information: { score: 3, feedback: 'Unable to assess' },
//           },
//           formulaic_concerns: [],
//           listening_quality: 'adequate',
//           question_style_balance: 'mixed',
//         },
//         clinical_assessment: fallbackDomain,
//         clinical_management: fallbackDomain,
//       },
//       global_judgement: 'Borderline Pass',
//       global_justification: 'Evaluation incomplete',
//       emotional_intelligence: {
//         overall_rating: 'fair',
//         tone_consistency: 'adequate',
//         empathy_highlights: [],
//         empathy_concerns: [],
//         communication_style: 'standard',
//         patient_comfort_level: 'adequate',
//       },
//       communication_analysis: communicationAnalysis || {},
//       safety_concerns: [],
//       formulaic_trap_detected: false,
//       overall_comments: 'Evaluation could not be completed.',
//       key_strengths: [],
//       critical_improvements: [],
//       recommendations: [],
//       total_domain_score: 15,
//       weighted_percentage: 60,
//       pass_fail: 'PASS',
//       confidence_level: 'Low',
//       station_type: 'history',
//       specialty: 'Unknown',
//       timestamp: new Date().toISOString(),
//     };
//   }
// }
import { analyzeQuestionStyle, CASC_MARKING_SCHEME, detectFormulaicPhrases, getMarkingReference } from '../casc-marking-scheme';
import { chatWithJSON } from './openai';


export class ExaminerAgent {
  private caseData: any;

  constructor(caseData: any) {
    this.caseData = caseData;
  }

  /**
   * Analyze doctor's tone during conversation (used during active conversation)
   * This runs SILENTLY and stores tone_history for later evaluation
   */
  async analyzeDoctorTone(
    doctorMessage: string,
    patientContext: string = ''
  ): Promise<any> {
    const prompt = `You are analyzing a doctor's communication during a CASC psychiatric exam.

DOCTOR'S MESSAGE: "${doctorMessage}"
PATIENT CONTEXT: "${patientContext}"

Analyze the tone and quality of this question/statement. Return JSON:
{
  "empathy_score": 1-10,
  "tone_score": 1-10,
  "question_type": "open|closed|focused|compound",
  "concerns": ["list any concerns"],
  "strengths": ["list strengths"]
}`;

    try {
      const analysis = await chatWithJSON(
        [{ role: 'user', content: prompt }],
        {},
        0.3
      );

      return {
        empathy_score: analysis.empathy_score || 5,
        tone_score: analysis.tone_score || 5,
        question_type: analysis.question_type || 'unknown',
        concerns: analysis.concerns || [],
        strengths: analysis.strengths || [],
      };
    } catch (error) {
      console.error('Tone analysis error:', error);
      return {
        empathy_score: 5,
        tone_score: 5,
        question_type: 'unknown',
        concerns: [],
        strengths: [],
      };
    }
  }

  /**
   * Evaluate complete CASC station (used at end of exam)
   * Uses the comprehensive MedPsychKH 2025 marking scheme
   */
  async evaluateStation(conversationHistory: any[]): Promise<any> {
    console.log('🎓 CASC Examiner: Starting evaluation with marking scheme...');

    // STEP 1: Analyze conversation automatically
    const doctorMessages = conversationHistory.filter(m => m.role === 'doctor');
    const questions = doctorMessages.map(m => m.content).filter(c => c.includes('?'));
    
    const questionAnalysis = analyzeQuestionStyle(questions);
    const formulaicPhrases = detectFormulaicPhrases(
      doctorMessages.map(m => m.content).join(' ')
    );

    // STEP 2: Identify cues
    const cueObservations = this.identifyCues(conversationHistory);

    // STEP 3: Build prompt with marking scheme
    const evaluation = await this.evaluateWithGPT4o(
      conversationHistory,
      questionAnalysis,
      formulaicPhrases,
      cueObservations
    );

    // STEP 4: Return complete evaluation
    return evaluation;
  }

  /**
   * Alias for evaluateStation - for backward compatibility
   */
  async evaluate(conversationHistory: any[]): Promise<any> {
    return await this.evaluateStation(conversationHistory);
  }

  /**
   * Generate evaluation with optional elapsed time and communication analysis
   * This is called from the route handler with additional parameters
   */
  async generateEvaluation(
    conversationHistory: any[],
    elapsedSeconds?: number,
    communicationAnalysis?: any
  ): Promise<any> {
    console.log('🎓 CASC Examiner: Starting evaluation with marking scheme...');

    // STEP 1: Analyze conversation automatically
    const doctorMessages = conversationHistory.filter(m => m.role === 'doctor');
    const questions = doctorMessages.map(m => m.content).filter(c => c.includes('?'));
    
    const questionAnalysis = analyzeQuestionStyle(questions);
    const formulaicPhrases = detectFormulaicPhrases(
      doctorMessages.map(m => m.content).join(' ')
    );

    // STEP 2: Identify cues
    const cueObservations = this.identifyCues(conversationHistory);

    // STEP 3: Build prompt with marking scheme, incorporating the additional data
    const evaluation = await this.evaluateWithGPT4o(
      conversationHistory,
      questionAnalysis,
      formulaicPhrases,
      cueObservations,
      elapsedSeconds,
      communicationAnalysis
    );

    // STEP 4: Return complete evaluation
    return evaluation;
  }

  /**
   * Identify cues from conversation
   */
  private identifyCues(conversation: any[]) {
    const cues: any[] = [];
    const patientMessages = conversation.filter(m => m.role === 'patient');
    const doctorMessages = conversation.filter(m => m.role === 'doctor');

    // Look for cue patterns
    const cuePatterns = [
      { regex: /\[.*?wring.*?hands.*?\]/i, cue: 'wrings hands' },
      { regex: /\[.*?look.*?away.*?\]/i, cue: 'looks away' },
      { regex: /\[.*?look.*?down.*?\]/i, cue: 'looks down' },
      { regex: /\[.*?pause.*?\]/i, cue: 'pauses' },
      { regex: /\[.*?tearful.*?\]/i, cue: 'tearful' },
      { regex: /I\.\.\..*?um/i, cue: 'hesitates' }
    ];

    patientMessages.forEach((msg) => {
      cuePatterns.forEach(({ regex, cue }) => {
        if (regex.test(msg.content)) {
          const nextDoctor = doctorMessages.find(d => 
            new Date(d.timestamp) > new Date(msg.timestamp)
          );

          const addressed = nextDoctor && (
            nextDoctor.content.toLowerCase().includes('notice') ||
            nextDoctor.content.toLowerCase().includes('see') ||
            nextDoctor.content.toLowerCase().includes('difficult')
          );

          cues.push({
            cue,
            response: addressed ? nextDoctor.content : 'not addressed',
            impact: addressed 
              ? 'Candidate acknowledged the cue'
              : 'Candidate missed opportunity to address patient discomfort',
            marking_reference: getMarkingReference('cues')
          });
        }
      });
    });

    return cues.slice(0, 5);
  }

  /**
   * Call GPT-4o with marking scheme to evaluate
   * Updated to accept and use elapsedSeconds and communicationAnalysis
   */
  private async evaluateWithGPT4o(
    conversation: any[],
    questionAnalysis: any,
    formulaicPhrases: string[],
    cueObservations: any[],
    elapsedSeconds?: number,
    communicationAnalysis?: any
  ) {
    const transcript = conversation
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n');

    // Build additional context if provided
    let additionalContext = '';
    if (elapsedSeconds !== undefined) {
      additionalContext += `\nELAPSED TIME: ${Math.round(elapsedSeconds / 60)} minutes (${elapsedSeconds} seconds)`;
    }
    if (communicationAnalysis) {
      additionalContext += `\n\nCOMMUNICATION METRICS:
- Average Empathy: ${communicationAnalysis.average_empathy}
- Average Tone Score: ${communicationAnalysis.average_tone_score}/10
- Open Questions: ${communicationAnalysis.open_questions}
- Closed Questions: ${communicationAnalysis.closed_questions}
- Common Issues: ${communicationAnalysis.common_issues.join(', ') || 'None'}
- Strengths: ${communicationAnalysis.strengths.join(', ') || 'None'}`;
    }

    const prompt = `You are a CASC examiner using MedPsychKH 2025 marking scheme.

MARKING SCHEME (from PDF):
${JSON.stringify(CASC_MARKING_SCHEME.MOST_FREQUENT_FAILURES, null, 2)}

CONVERSATION:
${transcript}
${additionalContext}

ANALYSIS:
- Questions: ${questionAnalysis.open_questions + questionAnalysis.closed_questions}
- Closed: ${questionAnalysis.percentage_closed}%
- Formulaic: ${formulaicPhrases.join(', ') || 'None'}
- Cues: ${cueObservations.map(c => c.cue).join(', ')}

Return complete evaluation JSON:
{
  "global_judgement": "Pass|Borderline Pass|Borderline Fail|Fail",
  "global_justification": "...",
  "pass_fail": "PASS|FAIL",
  "total_domain_score": 0-25,
  "weighted_percentage": 0-100,
  "domains": {
    "professionalism": {"score": 1-5, "percentage": 0-100, "feedback": "...", "strengths": [], "weaknesses": []},
    "consultation_management": {"score": 1-5, "percentage": 0-100, "feedback": "...", "strengths": [], "weaknesses": []},
    "communication_skills": {
      "score": 1-5,
      "percentage": 0-100,
      "feedback": "...",
      "sub_domains": {
        "personalisation_and_respect": {"score": 1-5},
        "recognising_responding_to_cues": {"score": 1-5},
        "empathy": {"score": 1-5},
        "providing_clear_information": {"score": 1-5}
      },
      "listening_quality": "poor|adequate|good|excellent",
      "question_style_balance": "${questionAnalysis.percentage_closed}% closed questions",
      "formulaic_concerns": ${JSON.stringify(formulaicPhrases)},
      "strengths": [],
      "weaknesses": []
    },
    "clinical_assessment": {"score": 1-5, "percentage": 0-100, "feedback": "...", "strengths": [], "weaknesses": []},
    "clinical_management": {"score": 1-5, "percentage": 0-100, "feedback": "...", "strengths": [], "weaknesses": []}
  },
  "cue_observations": ${JSON.stringify(cueObservations)},
  "question_coaching": [
    {
      "your_question": "quote from transcript",
      "assessment": "GOOD|OK|POOR",
      "feedback": "brief note",
      "better_version": "improved",
      "excellent_version": "best",
      "marking_reference": "${getMarkingReference('poor_questioning')}"
    }
  ],
  "part_1_examiner_feedback": {
    "better_ways": [{"your_response": "...", "what_was_good": "..."}],
    "critique": {
      "response_to_cues": "...",
      "questioning_style": "...",
      "formulaic_trap": "..."
    }
  },
  "communication_analysis": {
    "total_questions": ${questionAnalysis.open_questions + questionAnalysis.closed_questions},
    "average_empathy": "low|moderate|high",
    "average_tone_score": 1-10,
    "formulaic_count": ${formulaicPhrases.length}
  },
  "emotional_intelligence": {
    "overall_rating": "poor|fair|good|excellent",
    "communication_style": "...",
    "tone_consistency": "...",
    "patient_comfort_level": "...",
    "empathy_highlights": [],
    "empathy_concerns": []
  },
  "formulaic_trap_detected": ${formulaicPhrases.length >= 2},
  "safety_concerns": [],
  "key_strengths": [],
  "critical_improvements": [],
  "recommendations": [],
  "overall_comments": "..."
}`;

    const evaluation = await chatWithJSON([{ role: 'user', content: prompt }], {}, 0.3);

    // Add metadata
    return {
      ...evaluation,
      station_type: this.caseData.station_type || 'history_taking',
      specialty: this.caseData.specialty || 'General Adult Psychiatry',
      evaluated_at: new Date().toISOString(),
      elapsed_seconds: elapsedSeconds
    };
  }
}

/**
 * Standalone function export for those who prefer functional approach
 */
export async function evaluateCASCStation(
  conversationHistory: any[],
  caseData: any
): Promise<any> {
  const examiner = new ExaminerAgent(caseData);
  return await examiner.evaluateStation(conversationHistory);
}




















































