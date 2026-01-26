
// import { chatWithJSON } from './openai';
// import { searchRelevantContext } from './rag-search';

// export class ExaminerAgent {
//   caseData: any;

//   constructor(caseData: any) {
//     this.caseData = caseData;
//   }

//   /**
//    * Analyze doctor's tone WITHOUT RAG (faster for real-time chat)
//    */
//   async analyzeDoctorTone(
//     doctorMessage: string,
//     patientContext: string
//   ): Promise<any> {
//     try {
//       // SKIP RAG search for faster real-time response
//       // Only use standard medical communication principles
      
//       const prompt = `You are evaluating a medical student's communication during a patient interview.

// **Context:**
// Patient's last statement: "${patientContext}"
// Doctor's response: "${doctorMessage}"
// Specialty: ${this.caseData.specialty}
// Patient's emotional state: ${this.caseData.patient_profile.emotional_state}

// **Best Practice Guidelines:**
// Use standard medical communication principles focusing on empathy, active listening, and patient-centered care.

// Analyze the doctor's tone and communication quality. Return JSON with:
// {
//   "empathy_level": "high|medium|low",
//   "tone": "brief description of tone",
//   "communication_score": 0-10,
//   "concerns": ["list of specific issues, if any - empty array if none"],
//   "positive_aspects": ["list of positive communication techniques used"]
// }

// Focus on:
// - Empathy and active listening
// - Appropriate language (avoiding jargon)
// - Open-ended vs closed questions
// - Rapport building
// - Cultural sensitivity`;

//       const response = await chatWithJSON(
//         [{ role: 'user', content: prompt }],
//         {},
//         0.3
//       );

//       return {
//         empathy_level: response.empathy_level || 'medium',
//         tone: response.tone || '',
//         communication_score: response.communication_score || 7,
//         concerns: response.concerns || [],
//         positive_aspects: response.positive_aspects || [],
//       };
//     } catch (error) {
//       console.error('❌ Tone analysis error:', error);
//       // Return safe fallback
//       return {
//         empathy_level: 'medium',
//         tone: 'neutral',
//         communication_score: 7,
//         concerns: [],
//         positive_aspects: [],
//       };
//     }
//   }

//   /**
//    * Generate comprehensive evaluation WITH RAG (for final detailed evaluation)
//    * NOW INCLUDES: communicationAnalysis parameter for cumulative data
//    */
//   async generateEvaluation(
//     conversation: any[],
//     elapsedTime: number,
//     communicationAnalysis?: any // ← NEW PARAMETER (optional for backward compatibility)
//   ): Promise<any> {
//     try {
//       // Extract doctor questions
//       const doctorMessages = conversation
//         .filter((msg) => msg.role === 'doctor')
//         .map((msg) => msg.content);

//       // USE RAG for comprehensive final evaluation
//       const ragContext = await searchRelevantContext(
//         `${this.caseData.diagnosis} clinical assessment examination criteria ${this.caseData.specialty}`,
//         this.caseData.case_id,
//         3
//       );

//       const contextText = ragContext
//         .map((ctx) => ctx.content)
//         .join('\n\n');

//       // Build communication metrics section
//       const commMetricsText = communicationAnalysis ? `
// **Communication Metrics (Collected Throughout Exam):**
// - Average Empathy Level: ${communicationAnalysis.average_empathy}
// - Average Communication Score: ${communicationAnalysis.average_tone_score}/10
// - Total Questions Asked: ${communicationAnalysis.total_questions}
// - Common Issues: ${communicationAnalysis.common_issues.join(', ') || 'None'}
// - Strengths: ${communicationAnalysis.strengths.join(', ') || 'None'}
// ` : '';

//       const prompt = `You are evaluating a medical student's clinical examination.

// **Case Information:**
// Diagnosis: ${this.caseData.diagnosis}
// Specialty: ${this.caseData.specialty}
// Key examination points needed:
// ${this.caseData.key_examination_points.join('\n')}

// **Student's Questions:**
// ${doctorMessages.join('\n')}

// **Time taken:** ${Math.round(elapsedTime / 60)} minutes (limit: 7 minutes)

// ${commMetricsText}

// **Clinical Guidelines:**
// ${contextText || 'Standard clinical assessment principles'}

// Provide a comprehensive evaluation as JSON:
// {
//   "domains": {
//     "history_taking": {"score": 0-25, "strengths": ["..."], "weaknesses": ["..."]},
//     "clinical_reasoning": {"score": 0-25, "strengths": ["..."], "weaknesses": ["..."]},
//     "communication_and_empathy": {"score": 0-25, "strengths": ["..."], "weaknesses": ["..."]},
//     "professionalism": {"score": 0-25, "strengths": ["..."], "weaknesses": ["..."]}
//   },
//   "communication_analysis": {
//     "average_empathy": "${communicationAnalysis?.average_empathy || 'medium'}",
//     "average_tone_score": ${communicationAnalysis?.average_tone_score || 7},
//     "total_questions": ${communicationAnalysis?.total_questions || 0},
//     "common_issues": ${JSON.stringify(communicationAnalysis?.common_issues || [])},
//     "strengths": ${JSON.stringify(communicationAnalysis?.strengths || [])}
//   },
//   "emotional_intelligence": {
//     "overall_rating": "excellent|good|fair|needs improvement",
//     "communication_style": "description",
//     "empathy_highlights": ["highlight 1", "highlight 2"]
//   },
//   "total_score": 0-100,
//   "max_score": 100,
//   "percentage": 0-100,
//   "pass_fail": "PASS|FAIL",
//   "confidence_level": "High|Medium|Low",
//   "overall_comments": "2-3 sentences",
//   "key_strengths": ["strength 1", "strength 2"],
//   "critical_improvements": ["area 1", "area 2"],
//   "recommendations": ["specific action 1", "specific action 2"]
// }

// Passing threshold is 60%. Be fair but rigorous. Use the communication metrics provided.`;

//       const response = await chatWithJSON(
//         [{ role: 'user', content: prompt }],
//         {},
//         0.3
//       );

//       return response;
//     } catch (error) {
//       console.error('❌ Evaluation error:', error);
//       // Return safe fallback evaluation
//       return {
//         domains: {
//           history_taking: { score: 15, strengths: [], weaknesses: ['Evaluation unavailable'] },
//           clinical_reasoning: { score: 15, strengths: [], weaknesses: ['Evaluation unavailable'] },
//           communication_and_empathy: { score: 15, strengths: [], weaknesses: ['Evaluation unavailable'] },
//           professionalism: { score: 15, strengths: [], weaknesses: ['Evaluation unavailable'] },
//         },
//         communication_analysis: communicationAnalysis || {
//           average_empathy: 'medium',
//           average_tone_score: 7,
//           total_questions: 0,
//           common_issues: [],
//           strengths: [],
//         },
//         emotional_intelligence: {
//           overall_rating: 'fair',
//           communication_style: 'Standard',
//           empathy_highlights: [],
//         },
//         total_score: 60,
//         max_score: 100,
//         percentage: 60,
//         pass_fail: 'PASS',
//         confidence_level: 'Low',
//         overall_comments: 'Technical issue during evaluation.',
//         key_strengths: ['Completed examination'],
//         critical_improvements: ['System evaluation error occurred'],
//         recommendations: ['Retry examination for full feedback'],
//       };
//     }
//   }
// }

///////////////////////second attempt///////////////////////
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
//       const prompt = `Analyze this doctor's question in a psychiatric interview.

// **Context:**
// Patient: "${patientContext}"
// Doctor: "${doctorMessage}"
// Specialty: ${this.caseData.specialty}
// Patient's emotional state: ${this.caseData.patient_profile.emotional_state}

// Return JSON:
// {
//   "empathy_level": "high|medium|low",
//   "tone": "brief description",
//   "communication_score": 1-10,
//   "concerns": ["issues - empty if none"],
//   "positive_aspects": ["techniques used"],
//   "formulaic_detected": boolean (true if robotic/scripted like "How does that make you feel?"),
//   "question_type": "open|closed|mixed",
//   "responds_to_cues": boolean (true if doctor responded to patient's cues)
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
//       };
//     }
//   }

//   /**
//    * Generate CASC-aligned evaluation
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
// **Communication Metrics:**
// - Average Empathy: ${communicationAnalysis.average_empathy}
// - Average Score: ${communicationAnalysis.average_tone_score}/10
// - Questions Asked: ${communicationAnalysis.total_questions}
// - Formulaic Count: ${communicationAnalysis.formulaic_count || 0}
// - Open Questions: ${communicationAnalysis.open_questions || 0}
// - Closed Questions: ${communicationAnalysis.closed_questions || 0}
// - Common Issues: ${communicationAnalysis.common_issues.join(', ') || 'None'}
// ` : '';

//       const prompt = `You are a CASC examiner using official RCPsych marking criteria.

// **STATION: ${stationType.toUpperCase()}**
// Diagnosis: ${this.caseData.diagnosis}
// Specialty: ${this.caseData.specialty}
// Time: ${Math.round(elapsedTime / 60)} min (limit: 7 min)

// **Key Points Expected:**
// ${this.caseData.key_examination_points.join('\n')}

// **Doctor's Questions:**
// ${doctorMessages.join('\n')}

// ${commMetrics}

// **Guidelines:**
// ${contextText || 'Standard CASC principles'}

// **MARK USING CASC 5-DOMAIN STRUCTURE (1-5 scale):**

// 1. **Professionalism** (1-5): Respectful, ethical, patient-centered
// 2. **Consultation Management** (1-5): Logical structure, time management, task completion
// 3. **Communication Skills** (1-5): MUST assess 4 sub-domains:
//    - Personalisation & Respect
//    - Recognising & Responding to Cues
//    - Empathy & Active Listening
//    - Clear Information
//    DETECT: Formulaic phrases, poor listening, closed question overload
// 4. **Clinical Assessment** (1-5): Symptom exploration, formulation
// 5. **Clinical Management** (1-5): Safety, shared decisions, evidence-based

// **GLOBAL JUDGEMENT (choose one):**
// - Excellent Pass: Entirely justifiable, technically proficient
// - Pass: Systematic, clinically justifiable
// - Borderline Pass: Adequate essentials, some omissions
// - Borderline Fail: Unsystematic, important omissions
// - Fail: Frequent omissions, lacks focus
// - Severe Fail: Incompatible with accepted practice

// **CRITICAL FAILURES:**
// - Missing key risks (suicide, safeguarding)
// - Formulaic/robotic
// - Unsafe recommendations
// - Lack of empathy

// Return EXACT JSON:
// {
//   "domains": {
//     "professionalism": {
//       "score": 1-5,
//       "percentage": <score/5*100>,
//       "feedback": "...",
//       "strengths": ["..."],
//       "weaknesses": ["..."],
//       "examples": ["..."]
//     },
//     "consultation_management": { ... same structure ... },
//     "communication_skills": {
//       "score": 1-5,
//       "percentage": <score/5*100>,
//       "feedback": "...",
//       "strengths": ["..."],
//       "weaknesses": ["..."],
//       "examples": ["..."],
//       "sub_domains": {
//         "personalisation_and_respect": {"score": 1-5, "feedback": "..."},
//         "recognising_cues": {"score": 1-5, "feedback": "..."},
//         "empathy": {"score": 1-5, "feedback": "..."},
//         "clear_information": {"score": 1-5, "feedback": "..."}
//       },
//       "formulaic_concerns": ["list formulaic phrases"],
//       "listening_quality": "excellent|good|adequate|poor",
//       "question_style_balance": "description"
//     },
//     "clinical_assessment": { ... same ... },
//     "clinical_management": { ... same ... }
//   },
//   "global_judgement": "Excellent Pass|Pass|Borderline Pass|Borderline Fail|Fail|Severe Fail",
//   "global_justification": "why this grade",
//   "emotional_intelligence": {
//     "overall_rating": "excellent|good|fair|poor",
//     "tone_consistency": "...",
//     "empathy_highlights": ["..."],
//     "empathy_concerns": ["..."],
//     "communication_style": "...",
//     "patient_comfort_level": "..."
//   },
//   "safety_concerns": ["list critical risks missed"],
//   "formulaic_trap_detected": boolean,
//   "overall_comments": "2-3 sentences",
//   "key_strengths": ["..."],
//   "critical_improvements": ["..."],
//   "recommendations": ["..."]
// }`;

//       const response = await chatWithJSON([{ role: 'user', content: prompt }], {}, 0.3);

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
//         confidence_level: response.confidence_level || 'Medium',
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
//       feedback: 'Evaluation unavailable',
//       strengths: [],
//       weaknesses: ['Technical error'],
//       examples: [],
//     };

//     return {
//       domains: {
//         professionalism: fallbackDomain,
//         consultation_management: fallbackDomain,
//         communication_skills: {
//           ...fallbackDomain,
//           sub_domains: {
//             personalisation_and_respect: { score: 3, feedback: 'N/A' },
//             recognising_cues: { score: 3, feedback: 'N/A' },
//             empathy: { score: 3, feedback: 'N/A' },
//             clear_information: { score: 3, feedback: 'N/A' },
//           },
//           formulaic_concerns: [],
//           listening_quality: 'adequate',
//           question_style_balance: 'N/A',
//         },
//         clinical_assessment: fallbackDomain,
//         clinical_management: fallbackDomain,
//       },
//       global_judgement: 'Borderline Pass',
//       global_justification: 'Technical issue',
//       communication_analysis: communicationAnalysis || {},
//       emotional_intelligence: {
//         overall_rating: 'fair',
//         tone_consistency: 'adequate',
//         empathy_highlights: [],
//         empathy_concerns: [],
//         communication_style: 'Standard',
//         patient_comfort_level: 'adequate',
//       },
//       total_domain_score: 15,
//       weighted_percentage: 60,
//       pass_fail: 'PASS',
//       confidence_level: 'Low',
//       safety_concerns: [],
//       formulaic_trap_detected: false,
//       overall_comments: 'Technical issue during evaluation',
//       key_strengths: ['Completed exam'],
//       critical_improvements: ['System error'],
//       recommendations: ['Retry for full feedback'],
//       station_type: 'history',
//       case_id: this.caseData.case_id,
//       specialty: this.caseData.specialty || 'Unknown',
//       timestamp: new Date().toISOString(),
//     };
//   }
// }

/////////////////third attempt/////////////////////
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
//    * NOW DETECTS: Incomplete sentences, judgmental language, poor validation
//    */
//   async analyzeDoctorTone(
//     doctorMessage: string,
//     patientContext: string
//   ): Promise<any> {
//     try {
//       const prompt = `Analyze this doctor's question in a psychiatric interview with STRICT CASC standards.

// **Context:**
// Patient: "${patientContext}"
// Doctor: "${doctorMessage}"
// Specialty: ${this.caseData.specialty}
// Patient's emotional state: ${this.caseData.patient_profile.emotional_state}

// **CRITICAL DETECTION:**
// 1. Incomplete sentences (e.g., "so have you seen any") - MAJOR FAILURE
// 2. Judgmental language (e.g., "how this affected you so much") - implies excessive reaction
// 3. Lack of validation before questioning (jumping to technical questions)
// 4. Formulaic/robotic phrases ("How does that make you feel?")
// 5. Poor opening (no introduction, no greeting)
// 6. Missed emotional cues (patient mentions distress, doctor ignores)

// Return JSON:
// {
//   "empathy_level": "high|medium|low",
//   "tone": "brief description",
//   "communication_score": 1-10 (be STRICT - incomplete sentences = max 4),
//   "concerns": ["specific issues - MUST flag incomplete sentences and judgmental language"],
//   "positive_aspects": ["techniques used"],
//   "formulaic_detected": boolean,
//   "question_type": "open|closed|mixed",
//   "responds_to_cues": boolean,
//   "incomplete_sentence": boolean (true if sentence is cut off or unprofessional),
//   "judgmental_language": boolean (true if implies patient overreacting),
//   "validation_provided": boolean (true if doctor validated emotion before questioning)
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
//         incomplete_sentence: response.incomplete_sentence || false,
//         judgmental_language: response.judgmental_language || false,
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
//         incomplete_sentence: false,
//         judgmental_language: false,
//         validation_provided: true,
//       };
//     }
//   }

//   /**
//    * Generate STRICT CASC-aligned evaluation following the example format
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

//       const patientMessages = conversation
//         .filter((msg) => msg.role === 'patient')
//         .map((msg) => msg.content);

//       const stationType = this.caseData.station_type || 'history';

//       // Get RAG context
//       const ragContext = await searchRelevantContext(
//         `${this.caseData.diagnosis} CASC ${this.caseData.specialty}`,
//         this.caseData.case_id,
//         3
//       );

//       const contextText = ragContext.map((ctx) => ctx.content).join('\n\n');

//       // Count incomplete sentences, judgmental language
//       const incompleteSentences = doctorMessages.filter(msg => 
//         msg.trim().length < 10 || 
//         msg.endsWith('any') || 
//         msg.endsWith('so') ||
//         !msg.match(/[.!?]$/) && msg.split(' ').length > 2
//       ).length;

//       const judgmentalPhrases = doctorMessages.filter(msg =>
//         msg.match(/so much|too much|overreact|excessive|just/i)
//       ).length;

//       const commMetrics = communicationAnalysis ? `
// **Communication Metrics:**
// - Average Empathy: ${communicationAnalysis.average_empathy}
// - Average Score: ${communicationAnalysis.average_tone_score}/10
// - Questions Asked: ${communicationAnalysis.total_questions}
// - Formulaic Count: ${communicationAnalysis.formulaic_count || 0}
// - Open Questions: ${communicationAnalysis.open_questions || 0}
// - Closed Questions: ${communicationAnalysis.closed_questions || 0}
// - Incomplete Sentences: ${incompleteSentences}
// - Judgmental Language: ${judgmentalPhrases}
// - Common Issues: ${communicationAnalysis.common_issues?.join(', ') || 'None'}
// ` : '';

//       const prompt = `You are a STRICT CASC examiner using official RCPsych marking criteria. Follow the EXACT format from this example:

// **EXAMPLE FORMAT TO FOLLOW:**
// "Part 1: Examiner Judgment and Feedback
// Global Judgment: [Grade]
// Critique of the Interaction:
// • Response to Cues: [Detailed critique]
// • Questioning Style: [Detailed critique] 
// • Technical Proficiency: [Detailed critique]
// • Formulaic Trap: [Detailed critique]
// Better Ways of Interacting:
// • [Specific examples of better phrases]

// Part 2: High-Scoring Exam-Ready Guide
// STEP 1 – ALIGNMENT
// STEP 2 – IDEAL ROLE-PLAY STRUCTURE
// STEP 3 – EXEMPLAR CANDIDATE RESPONSES
// STEP 4 – ILLUSTRATED ROLE-PLAY EXAMPLES
// STEP 5 – COMMON MISTAKES & HOW TO AVOID THEM
// STEP 6 – EXAMINER 'RED FLAGS'
// STEP 7 – FINAL HIGH-YIELD SUMMARY"

// **STATION: ${stationType.toUpperCase()}**
// Diagnosis: ${this.caseData.diagnosis}
// Specialty: ${this.caseData.specialty}
// Patient: ${this.caseData.patient_profile.name}
// Emotional State: ${this.caseData.patient_profile.emotional_state}
// Time: ${Math.round(elapsedTime / 60)} min (limit: 7 min)

// **Key Points Expected:**
// ${this.caseData.key_examination_points.join('\n')}

// **Full Conversation:**
// ${conversation.map((msg, idx) => 
//   `${msg.role === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 ' + this.caseData.patient_profile.name}: ${msg.content}`
// ).join('\n')}

// ${commMetrics}

// **Clinical Guidelines:**
// ${contextText || 'Standard CASC principles'}

// **STRICT MARKING CRITERIA:**

// 🚨 **AUTOMATIC BORDERLINE FAIL or FAIL if:**
// 1. Incomplete sentences (e.g., "so have you seen any")
// 2. Judgmental language (e.g., "how this affected you so much")
// 3. No introduction/greeting at start
// 4. Ignored emotional cues repeatedly
// 5. Formulaic/robotic consultation style
// 6. Missing validation before questioning

// **CASC 5-DOMAIN STRUCTURE (1-5 scale - BE STRICT):**

// 1. **Professionalism** (1-5): 
//    - Score 3 or below if: No introduction, unprofessional language
//    - Incomplete sentences = max score 3

// 2. **Consultation Management** (1-5):
//    - Score 3 or below if: Poor structure, time wasted

// 3. **Communication Skills** (1-5) - MOST CRITICAL:
//    - Score 2-3 if: Judgmental language, missed cues, no validation
//    - Score 1-2 if: Incomplete sentences + other failures
//    - MUST assess 4 sub-domains strictly
//    - Detect formulaic phrases, poor listening

// 4. **Clinical Assessment** (1-5):
//    - Score based on coverage of key points

// 5. **Clinical Management** (1-5):
//    - Score based on safety and recommendations

// **GLOBAL JUDGEMENT (BE STRICT):**
// - Excellent Pass: Entirely justifiable, no flaws
// - Pass: Systematic, clinically sound
// - Borderline Pass: Adequate but notable omissions
// - Borderline Fail: Unsystematic, incomplete sentences, judgmental language, missed cues
// - Fail: Frequent failures, unprofessional
// - Severe Fail: Unsafe, incompatible with practice

// **CRITICAL FAILURES THAT REQUIRE BORDERLINE FAIL OR WORSE:**
// - Incomplete sentences (unprofessional)
// - Judgmental phrasing (implies patient overreacting)
// - No validation before technical questions
// - Missed emotional cues (patient says "losing independence", doctor ignores)
// - Formulaic/robotic ("How does that make you feel?" repeatedly)

// Return JSON with TWO PARTS:

// {
//   "part_1_examiner_feedback": {
//     "global_judgement": "Excellent Pass|Pass|Borderline Pass|Borderline Fail|Fail|Severe Fail",
//     "critique": {
//       "response_to_cues": "Detailed critique with examples",
//       "questioning_style": "Detailed critique of phrasing and professionalism",
//       "technical_proficiency": "Critique of fluency, incomplete sentences, professionalism",
//       "formulaic_trap": "Assessment of robotic vs genuine interaction"
//     },
//     "better_ways": [
//       "Specific example: Instead of X, say Y",
//       "Another example with exact phrasing"
//     ]
//   },
//   "part_2_guide": {
//     "step_1_alignment": {
//       "professionalism": "What was needed",
//       "communication": "What was needed",
//       "clinical_assessment": "What was needed",
//       "clinical_management": "What was needed"
//     },
//     "step_2_ideal_structure": [
//       "1. Opening & Rapport: ...",
//       "2. ...",
//       "..."
//     ],
//     "step_3_exemplar_responses": [
//       "Excellent (Context): 'Exact phrase to use'",
//       "..."
//     ],
//     "step_4_illustrated_examples": [
//       "Candidate: '...' → Patient: '...' → Follow-up: '...'"
//     ],
//     "step_5_common_mistakes": [
//       "Mistake: X → Correction: Y"
//     ],
//     "step_6_red_flags": [
//       "Specific red flags from this consultation"
//     ],
//     "step_7_checklist": [
//       "[ ] Item to check",
//       "..."
//     ]
//   },
//   "domains": {
//     "professionalism": {
//       "score": 1-5,
//       "percentage": <score/5*100>,
//       "feedback": "Be specific about failures",
//       "strengths": ["..."],
//       "weaknesses": ["..."],
//       "examples": ["specific quotes from conversation"]
//     },
//     "consultation_management": { ... same ... },
//     "communication_skills": {
//       "score": 1-5,
//       "percentage": <score/5*100>,
//       "feedback": "Highlight incomplete sentences, judgmental language",
//       "strengths": ["..."],
//       "weaknesses": ["Must include: incomplete sentences, judgmental phrasing, missed cues"],
//       "examples": ["Quote incomplete sentence", "Quote judgmental phrase"],
//       "sub_domains": {
//         "personalisation_and_respect": {"score": 1-5, "feedback": "..."},
//         "recognising_cues": {"score": 1-5, "feedback": "MUST note missed cues"},
//         "empathy": {"score": 1-5, "feedback": "MUST note lack of validation"},
//         "clear_information": {"score": 1-5, "feedback": "..."}
//       },
//       "formulaic_concerns": ["List exact phrases"],
//       "listening_quality": "excellent|good|adequate|poor",
//       "question_style_balance": "description"
//     },
//     "clinical_assessment": { ... same ... },
//     "clinical_management": { ... same ... }
//   },
//   "global_judgement": "MUST match part_1",
//   "global_justification": "Explain why this grade - reference incomplete sentences, judgmental language, missed cues",
//   "emotional_intelligence": {
//     "overall_rating": "excellent|good|fair|poor",
//     "tone_consistency": "...",
//     "empathy_highlights": ["..."],
//     "empathy_concerns": ["MUST list: no validation, judgmental language"],
//     "communication_style": "...",
//     "patient_comfort_level": "..."
//   },
//   "safety_concerns": ["..."],
//   "formulaic_trap_detected": boolean,
//   "overall_comments": "Be honest about failures",
//   "key_strengths": ["..."],
//   "critical_improvements": ["MUST include: avoid incomplete sentences, remove judgmental language, validate before questioning"],
//   "recommendations": ["Specific actionable items"]
// }

// **REMEMBER:** 
// - Incomplete sentence = Borderline Fail minimum
// - Judgmental language = Borderline Fail minimum  
// - Missed emotional cues = Lower communication score
// - Be STRICT like a real CASC examiner`;

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
//         confidence_level: response.confidence_level || 'Medium',
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
//       feedback: 'Unable to complete full evaluation',
//       strengths: ['Attempted consultation'],
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
//       global_justification: 'Evaluation incomplete - technical error',
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
//       overall_comments: 'Evaluation could not be completed due to technical error.',
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
import { chatWithJSON } from './openai';
import { searchRelevantContext } from './rag-search';
import type { DomainScore, GlobalJudgement } from '../types';

export class ExaminerAgent {
  caseData: any;

  constructor(caseData: any) {
    this.caseData = caseData;
  }

  /**
   * Analyze doctor's tone (runs silently in background)
   */
  async analyzeDoctorTone(
    doctorMessage: string,
    patientContext: string
  ): Promise<any> {
    try {
      const prompt = `Analyze this doctor's question using MedPsychKH CASC Communication standards.

**Context:**
Patient: "${patientContext}"
Doctor: "${doctorMessage}"
Specialty: ${this.caseData.specialty}
Patient's emotional state: ${this.caseData.patient_profile.emotional_state}

**Assess against MedPsychKH criteria:**
1. Formulaic phrases (e.g., "How does that make you feel?" repeatedly)
2. Picking up on emotional cues (patient mentions distress, does doctor respond?)
3. Questioning style (open vs closed, appropriate vs inappropriate)
4. Robotic delivery vs genuine conversation

Return JSON:
{
  "empathy_level": "high|medium|low",
  "tone": "brief description",
  "communication_score": 1-10,
  "concerns": ["specific issues"],
  "positive_aspects": ["techniques used"],
  "formulaic_detected": boolean,
  "question_type": "open|closed|mixed",
  "responds_to_cues": boolean,
  "validation_provided": boolean
}`;

      const response = await chatWithJSON([{ role: 'user', content: prompt }], {}, 0.3);

      return {
        empathy_level: response.empathy_level || 'medium',
        tone: response.tone || 'neutral',
        communication_score: response.communication_score || 7,
        concerns: response.concerns || [],
        positive_aspects: response.positive_aspects || [],
        formulaic_detected: response.formulaic_detected || false,
        question_type: response.question_type || 'mixed',
        responds_to_cues: response.responds_to_cues !== false,
        validation_provided: response.validation_provided !== false,
      };
    } catch (error) {
      console.error('❌ Tone analysis error:', error);
      return {
        empathy_level: 'medium',
        tone: 'neutral',
        communication_score: 7,
        concerns: [],
        positive_aspects: [],
        formulaic_detected: false,
        question_type: 'mixed',
        responds_to_cues: true,
        validation_provided: true,
      };
    }
  }

  /**
   * Generate evaluation using ONLY explicit MedPsychKH PDF criteria
   */
  async generateEvaluation(
    conversation: any[],
    elapsedTime: number,
    communicationAnalysis?: any
  ): Promise<any> {
    try {
      const doctorMessages = conversation
        .filter((msg) => msg.role === 'doctor')
        .map((msg) => msg.content);

      const stationType = this.caseData.station_type || 'history';

      // Get RAG context
      const ragContext = await searchRelevantContext(
        `${this.caseData.diagnosis} CASC ${this.caseData.specialty}`,
        this.caseData.case_id,
        3
      );

      const contextText = ragContext.map((ctx) => ctx.content).join('\n\n');

      const commMetrics = communicationAnalysis ? `
**Communication Analysis:**
- Average Empathy: ${communicationAnalysis.average_empathy}
- Average Score: ${communicationAnalysis.average_tone_score}/10
- Questions Asked: ${communicationAnalysis.total_questions}
- Formulaic Count: ${communicationAnalysis.formulaic_count || 0}
- Common Issues: ${communicationAnalysis.common_issues?.join(', ') || 'None'}
` : '';

      const prompt = `You are a STRICT CASC examiner using the official MedPsychKH Communication and Marking Scheme 2025.

**STATION: ${stationType.toUpperCase()}**
Diagnosis: ${this.caseData.diagnosis}
Specialty: ${this.caseData.specialty}
Patient: ${this.caseData.patient_profile.name}, ${this.caseData.patient_profile.age}
Emotional State: ${this.caseData.patient_profile.emotional_state}
Time: ${Math.round(elapsedTime / 60)} min / 7 min

**Key Points Expected:**
${this.caseData.key_examination_points.join('\n')}

**Full Conversation:**
${conversation.map((msg) => 
  `${msg.role === 'doctor' ? '👨‍⚕️ Doctor' : '🤒 ' + this.caseData.patient_profile.name}: ${msg.content}`
).join('\n')}

${commMetrics}

**Clinical Context:**
${contextText || 'Standard CASC principles'}

═══════════════════════════════════════════════════════════
OFFICIAL MedPsychKH 2025 MARKING CRITERIA (DIRECT FROM PDF)
═══════════════════════════════════════════════════════════

**MOST FREQUENT FAILURE REASONS (PDF Page - Communication Red Flags):**

1. **"The Formulaic Consultation Trap"** (The #1 reason candidates fail)
   - Repetitive phrases: "How does that make you feel?"
   - Questions as a "list" rather than conversation
   - Pre-prepared responses that don't match patient's answers
   - Robotic delivery without genuine connection

2. **"Poor listening skills. Poor use and response to cues"** (Most frequent failure)
   - Not picking up on verbal cues (hesitations, tone changes, word choices)
   - Not picking up on emotional cues (distress signals, withdrawal)
   - Not picking up on content cues (hints about other problems)

3. **"Poor questioning style"** (Extremely common failure)
   - The 90% closed question trap
   - Inappropriate or unprofessional questions

**COMMUNICATION RED FLAGS - What Leads to Failure (PDF Explicit List):**

"Listening and Responsiveness:
- Not picking up on emotional cues
- Failing to respond to patient's concerns
- Continuing with agenda when patient is distressed
- Not adapting to patient's communication style"

"Language and Tone Issues:
- Sounding patronizing or robotic"

"Structure and Flow:
- Jumping between topics without transitions
- Not signposting what you're doing"

═══════════════════════════════════════════════════════════
GLOBAL JUDGEMENT CRITERIA (PDF DEFINITIONS - EXACT QUOTES)
═══════════════════════════════════════════════════════════

**Pass:**
"The candidate demonstrates a clear level of competence expected of a newly appointed ST4, using a clinical approach that, while not always the best, is reasonably systematic, clinically justifiable, and well communicated. All essential areas of skill identified in the construct are covered."

**Borderline Pass:**
"The candidate shows an adequate level of competence expected of a newly appointed ST4, using a clinical approach which is at times unsystematic or inconsistent with practice at the ST4 level. Communication is mostly appropriate. The candidate covers most of the essential skill areas in the construct, but some desirable ones may be omitted."

**Borderline Fail:**
"The candidate fails to demonstrate an adequate level of competence. Their clinical approach is at times unsystematic or inconsistent with practice at the ST4 level. Communication may be appropriate, but the candidate does not adequately cover essential issues or makes too many omissions of less important factors."

**KEY DISTINCTION:** Borderline Fail requires "Communication MAY be appropriate"

**Fail:**
"The candidate fails to demonstrate competence, with a clinical approach that shows frequent omissions and lacks focus."

**KEY CRITERIA:** "Frequent omissions" AND "lacks focus"

**Severe Fail:**
"The candidate fails to demonstrate competence, with a clinical approach that is incompatible with accepted practice. Their performance may show inadequate reasoning and/or technical incompetence, alongside a marked lack of respect, attention, or empathy for the patient."

═══════════════════════════════════════════════════════════
DOMAIN WEIGHTS (PDF Table - ${stationType.toUpperCase()} Station)
═══════════════════════════════════════════════════════════

${this.getWeightsDescription(stationType)}

═══════════════════════════════════════════════════════════
YOUR TASK
═══════════════════════════════════════════════════════════

**STEP 1: Check for the THREE most frequent failures:**
1. Did the candidate fall into "The Formulaic Consultation Trap"? (robotic, repetitive phrases, questions as list)
2. Did the candidate demonstrate "Poor listening skills, poor response to cues"? (missed emotional cues, didn't respond to patient's distress)
3. Did the candidate show "Poor questioning style"? (inappropriate questions, all closed questions)

**STEP 2: Check Communication Red Flags:**
- Not picking up on emotional cues? (patient mentions anxiety/distress, doctor ignores)
- Failing to respond to patient's concerns?
- Robotic delivery?
- Jumping between topics without transitions?

**STEP 3: Assess "Frequent Omissions" and "Lacks Focus":**
- Were essential topics omitted? (safety assessment, key symptoms, depth of exploration)
- Was approach disorganized or unfocused?

**STEP 4: Determine Global Judgement:**
- If communication is NOT appropriate (formulaic, poor cues, robotic) → Cannot be Borderline Fail → Must be FAIL or worse
- If "frequent omissions" present → FAIL criterion met
- If "lacks focus" present → FAIL criterion met

**STEP 5: Score Domains:**
- PDF states: "Most candidates land in borderline because they focus on technical aspects rather than communication"
- Borderline candidates typically score around 3/5 (60%)
- If candidate is WORSE than borderline (hits multiple failure criteria) → scores should be BELOW 3/5
- Be honest: If performance was poor, give LOW scores (1-2 range)
- If performance hits #1 failure reason (formulaic trap) → communication score should be LOW
- If performance hits #2 failure reason (poor cues) → communication score should be LOW

═══════════════════════════════════════════════════════════
RETURN FORMAT
═══════════════════════════════════════════════════════════

Return JSON:
{
  "part_1_examiner_feedback": {
    "global_judgement": "Excellent Pass|Pass|Borderline Pass|Borderline Fail|Fail|Severe Fail",
    "critique": {
      "response_to_cues": "Did candidate pick up on emotional cues? Give specific examples from conversation",
      "questioning_style": "Was questioning appropriate and professional? Quote examples",
      "technical_proficiency": "Was approach systematic and fluent?",
      "formulaic_trap": "Did candidate fall into formulaic trap? Give examples"
    },
    "better_ways": [
      "Specific example: Instead of [quote from conversation], candidate should have said [better phrase]"
    ]
  },
  "part_2_guide": {
    "step_1_alignment": {
      "professionalism": "What was needed for this case",
      "communication": "Key communication skills needed",
      "clinical_assessment": "What should have been assessed",
      "clinical_management": "Safety and management priorities"
    },
    "step_2_ideal_structure": ["Opening & rapport", "Core assessment", "Safety", "Summary"],
    "step_3_exemplar_responses": ["Example of excellent phrasing for this case"],
    "step_4_illustrated_examples": ["Candidate: ... → Patient: ... → Follow-up: ..."],
    "step_5_common_mistakes": ["Mistake in this consultation → How to correct"],
    "step_6_red_flags": ["Specific red flags from PDF that apply"],
    "step_7_checklist": ["Essential items that should be covered"]
  },
  "domains": {
    "professionalism": {
      "score": 1-5 (BE HONEST: if unprofessional, score LOW),
      "percentage": <score/5*100>,
      "feedback": "Specific feedback",
      "strengths": [],
      "weaknesses": [],
      "examples": ["Quote from conversation"]
    },
    "consultation_management": {
      "score": 1-5 (BE HONEST: if disorganized, score LOW),
      "percentage": <score/5*100>,
      "feedback": "Specific feedback",
      "strengths": [],
      "weaknesses": [],
      "examples": []
    },
    "communication_skills": {
      "score": 1-5 (CRITICAL: If hit #1 or #2 failure reason, score LOW. Borderline = 3/5, worse = 1-2/5),
      "percentage": <score/5*100>,
      "feedback": "Reference the THREE most frequent failures",
      "strengths": [],
      "weaknesses": ["Must note if: formulaic trap, poor cues, poor questioning"],
      "examples": ["Quote specific failures"],
      "sub_domains": {
        "personalisation_and_respect": {"score": 1-5, "feedback": "..."},
        "recognising_cues": {"score": 1-5, "feedback": "Did they recognize cues? Be specific"},
        "empathy": {"score": 1-5, "feedback": "Did they validate emotions?"},
        "clear_information": {"score": 1-5, "feedback": "..."}
      },
      "formulaic_concerns": ["List any formulaic phrases"],
      "listening_quality": "excellent|good|adequate|poor (poor if missed multiple cues)",
      "question_style_balance": "description of question types"
    },
    "clinical_assessment": {
      "score": 1-5 (BE HONEST: if frequent omissions, score LOW),
      "percentage": <score/5*100>,
      "feedback": "Compare coverage against key examination points",
      "strengths": [],
      "weaknesses": ["Note omissions"],
      "examples": []
    },
    "clinical_management": {
      "score": 1-5 (BE HONEST: if no safety assessment, score LOW),
      "percentage": <score/5*100>,
      "feedback": "Was safety addressed?",
      "strengths": [],
      "weaknesses": ["Note if safety missing"],
      "examples": []
    }
  },
  "global_judgement": "MUST match part_1 - Use PDF definitions exactly",
  "global_justification": "Explain using PDF criteria: 'Candidate demonstrated [list failures from PDF]. This meets PDF definition of [grade] which states...'",
  "emotional_intelligence": {
    "overall_rating": "excellent|good|fair|poor",
    "tone_consistency": "...",
    "empathy_highlights": [],
    "empathy_concerns": ["Note if failed to validate"],
    "communication_style": "genuine|adequate|formulaic|robotic",
    "patient_comfort_level": "high|adequate|low"
  },
  "safety_concerns": ["List if safety not assessed"],
  "formulaic_trap_detected": boolean,
  "overall_comments": "Honest assessment of performance",
  "key_strengths": [],
  "critical_improvements": ["Based on failures identified"],
  "recommendations": []
}

**CRITICAL REMINDERS:**
1. Use ONLY the PDF criteria listed above
2. If candidate hits #1, #2, or #3 most frequent failures → score accordingly LOW
3. Borderline candidates score ~3/5 (60%) → worse performances score 1-2/5
4. "Frequent omissions" + "lacks focus" = FAIL per PDF definition
5. If communication NOT appropriate = cannot be Borderline Fail
6. Be HONEST - don't inflate scores
7. Quote specific examples from conversation`;

      const response = await chatWithJSON([{ role: 'user', content: prompt }], {}, 0.2);

      // Calculate scores
      const totalDomainScore = Object.values(response.domains).reduce(
        (sum: number, domain: any) => sum + (domain.score || 0),
        0
      );

      const weightedPercentage = this.calculateWeightedScore(response.domains, stationType);
      const passFail = this.determinePassFail(response.global_judgement, weightedPercentage);

      return {
        ...response,
        communication_analysis: communicationAnalysis || {},
        total_domain_score: totalDomainScore,
        weighted_percentage: weightedPercentage,
        pass_fail: passFail,
        confidence_level: 'High',
        station_type: stationType,
        case_id: this.caseData.case_id,
        specialty: this.caseData.specialty,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Evaluation error:', error);
      return this.getFallbackEvaluation(communicationAnalysis);
    }
  }

  private getWeightsDescription(stationType: string): string {
    const weights: any = {
      history: 'Clinical Assessment ~50%, Communication ~20%, Consultation Management ~20%, Professionalism ~10%',
      management: 'Clinical Management ~50%, Communication ~20%, Professionalism ~10%, Consultation ~10%, Assessment ~10%',
      examination: 'Clinical Assessment ~60%, Communication ~20%, Consultation ~10%, Professionalism ~10%',
      breaking_bad_news: 'Communication ~45%, Clinical Management ~30%, Professionalism ~15%, Consultation ~10%',
    };
    return weights[stationType] || weights.history;
  }

  private calculateWeightedScore(domains: any, stationType: string): number {
    const weights: any = {
      history: { professionalism: 10, consultation_management: 20, communication_skills: 20, clinical_assessment: 50, clinical_management: 0 },
      management: { professionalism: 10, consultation_management: 10, communication_skills: 20, clinical_assessment: 10, clinical_management: 50 },
      examination: { professionalism: 10, consultation_management: 10, communication_skills: 20, clinical_assessment: 60, clinical_management: 0 },
      breaking_bad_news: { professionalism: 15, consultation_management: 10, communication_skills: 45, clinical_assessment: 0, clinical_management: 30 },
    };

    const w = weights[stationType] || weights.history;
    let total = 0;
    Object.keys(w).forEach((domain) => {
      const percentage = domains[domain]?.percentage || 0;
      total += (percentage * w[domain]) / 100;
    });
    return Math.round(total);
  }

  private determinePassFail(globalJudgement: string, weightedPercentage: number): 'PASS' | 'FAIL' {
    if (globalJudgement === 'Severe Fail' || globalJudgement === 'Fail') return 'FAIL';
    if (globalJudgement === 'Borderline Fail') return weightedPercentage >= 60 ? 'PASS' : 'FAIL';
    return 'PASS';
  }

  private getFallbackEvaluation(communicationAnalysis: any) {
    const fallbackDomain = {
      score: 3,
      percentage: 60,
      feedback: 'Unable to complete evaluation',
      strengths: [],
      weaknesses: ['Evaluation incomplete'],
      examples: [],
    };

    return {
      part_1_examiner_feedback: {
        global_judgement: 'Borderline Pass',
        critique: {
          response_to_cues: 'Unable to assess',
          questioning_style: 'Unable to assess',
          technical_proficiency: 'Unable to assess',
          formulaic_trap: 'Unable to assess'
        },
        better_ways: []
      },
      part_2_guide: {
        step_1_alignment: {},
        step_2_ideal_structure: [],
        step_3_exemplar_responses: [],
        step_4_illustrated_examples: [],
        step_5_common_mistakes: [],
        step_6_red_flags: [],
        step_7_checklist: []
      },
      domains: {
        professionalism: fallbackDomain,
        consultation_management: fallbackDomain,
        communication_skills: {
          ...fallbackDomain,
          sub_domains: {
            personalisation_and_respect: { score: 3, feedback: 'Unable to assess' },
            recognising_cues: { score: 3, feedback: 'Unable to assess' },
            empathy: { score: 3, feedback: 'Unable to assess' },
            clear_information: { score: 3, feedback: 'Unable to assess' },
          },
          formulaic_concerns: [],
          listening_quality: 'adequate',
          question_style_balance: 'mixed',
        },
        clinical_assessment: fallbackDomain,
        clinical_management: fallbackDomain,
      },
      global_judgement: 'Borderline Pass',
      global_justification: 'Evaluation incomplete',
      emotional_intelligence: {
        overall_rating: 'fair',
        tone_consistency: 'adequate',
        empathy_highlights: [],
        empathy_concerns: [],
        communication_style: 'standard',
        patient_comfort_level: 'adequate',
      },
      communication_analysis: communicationAnalysis || {},
      safety_concerns: [],
      formulaic_trap_detected: false,
      overall_comments: 'Evaluation could not be completed.',
      key_strengths: [],
      critical_improvements: [],
      recommendations: [],
      total_domain_score: 15,
      weighted_percentage: 60,
      pass_fail: 'PASS',
      confidence_level: 'Low',
      station_type: 'history',
      specialty: 'Unknown',
      timestamp: new Date().toISOString(),
    };
  }
}




















































