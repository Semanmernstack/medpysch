// // Core Types
// export interface MedicalCase {
//   case_id: string;
//   specialty: string;
//   difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
//   diagnosis: string;
//   patient_profile: PatientProfile;
//   history_of_presenting_complaint: string;
//   past_medical_history: string;
//   medications: string[];
//   social_history: string;
//   family_history: string;
//   examination_findings: Record<string, any>;
//   investigations: Record<string, any>;
//   key_examination_points: string[];
//   expected_management: string[];
// }

// export interface PatientProfile {
//   name: string;
//   age: number;
//   gender: string;
//   occupation: string;
//   presenting_complaint: string;
//   emotional_state: string;
//   communication_style: string;
// }

// export interface Message {
//   id: string;
//   role: 'patient' | 'doctor';
//   content: string;
//   timestamp: string;
//   tone_analysis?: ToneAnalysis;
// }

// export interface ToneAnalysis {
//   empathy_level: 'high' | 'medium' | 'low';
//   tone: string;
//   communication_score: number;
//   concerns: string[];
//   positive_aspects: string[];
// }

// // 
// export interface ExamSession {
//   session_id: string;
//   case_id: string;
//   case_data: MedicalCase;
//   conversation: Message[];
//   tone_history?: ToneAnalysis[]; // ← ADD THIS
//   start_time: string;
//   status: 'active' | 'completed' | 'timeout';
// }

// export interface Evaluation {
//   domains: {
//     history_taking: DomainScore;
//     examination_skills: DomainScore;
//     clinical_reasoning: DomainScore;
//     communication_and_empathy: CommunicationScore;
//     management_planning: DomainScore;
//   };
//   emotional_intelligence: EmotionalIntelligence;
//   communication_analysis?: {  // ← ADD THIS BLOCK
//     average_empathy: string;
//     average_tone_score: number;
//     total_questions: number;
//     common_issues: string[];
//     strengths: string[];
//   };
//   total_score: number;
//   max_score: number;
//   percentage: number;
//   pass_fail: 'PASS' | 'FAIL';
//   confidence_level: string;
//   overall_comments: string;
//   key_strengths: string[];
//   critical_improvements: string[];
//   recommendations: string[];
// }

// export interface DomainScore {
//   score: number;
//   strengths: string[];
//   weaknesses: string[];
//   examples: string[];
// }

// export interface CommunicationScore extends DomainScore {
//   tone_assessment: {
//     overall_tone: string;
//     consistency: string;
//     appropriateness: string;
//   };
//   empathy_demonstrated: {
//     empathy_level: string;
//     acknowledged_emotions: boolean;
//     validated_concerns: boolean;
//     examples: string[];
//   };
// }

// export interface EmotionalIntelligence {
//   overall_rating: string;
//   tone_consistency: string;
//   empathy_highlights: string[];
//   empathy_concerns: string[];
//   communication_style: string;
//   patient_comfort_level: string;
// }

// export interface RAGContext {
//   content: string;
//   metadata: {
//     case_id: string;
//     specialty: string;
//     source: string;
//   };
//   relevance_score: number;
// }
// export type EmotionalState =
//   | "calm"
//   | "anxious"
//   | "distressed"
//   | "confused"
//   | "reassured"
//   | "angry"
//     |"sad"
//     |"hopeful";
// Core Types
export interface MedicalCase {
  case_id: string;
  specialty: 'Adult Psychiatry' | 'Child & Adolescent' | 'Old Age' | 'Learning Disability' | 'Forensic' | 'Psychotherapy';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  diagnosis: string;
  patient_profile: PatientProfile;
  history_of_presenting_complaint: string;
  past_medical_history: string;
  medications: string[];
  social_history: string;
  family_history: string;
  examination_findings: Record<string, any>;
  investigations: Record<string, any>;
  key_examination_points: string[];
  expected_management: string[];
  station_type: 'history' | 'management' | 'examination' | 'breaking_bad_news';
  session_number: 1 | 2; // Session 1 or Session 2
}

export interface PatientProfile {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  presenting_complaint: string;
  emotional_state: string;
  communication_style: string;
}

export interface Message {
  id: string;
  role: 'patient' | 'doctor';
  content: string;
  timestamp: string;
}

export interface ToneAnalysis {
  empathy_level: 'high' | 'medium' | 'low';
  tone: string;
  communication_score: number;
  concerns: string[];
  positive_aspects: string[];
  formulaic_detected?: boolean;
  question_type?: 'open' | 'closed' | 'mixed';
  responds_to_cues?: boolean;
}

export interface ExamSession {
  session_id: string;
  case_id: string;
  case_data: MedicalCase;
  conversation: Message[];
  tone_history?: ToneAnalysis[];
  start_time: string;
  end_time?: string;
  status: 'reading' | 'active' | 'completed' | 'timeout'; // Added 'reading' state
  reading_time_seconds?: number; // NEW - for reading phase
  evaluation?: Evaluation;
}

// CASC Domain Scores (1-5 scale)
export type DomainScore = 1 | 2 | 3 | 4 | 5;

export type GlobalJudgement = 
  | 'Excellent Pass'
  | 'Pass'
  | 'Borderline Pass'
  | 'Borderline Fail'
  | 'Fail'
  | 'Severe Fail';

export interface DomainEvaluation {
  score: DomainScore; // 1-5 scale
  percentage: number; // Converted for display (20-100%)
  feedback: string;
  strengths: string[];
  weaknesses: string[];
  examples: string[];
}

export interface CommunicationEvaluation extends DomainEvaluation {
  sub_domains: {
    personalisation_and_respect: {
      score: DomainScore;
      feedback: string;
    };
    recognising_cues: {
      score: DomainScore;
      feedback: string;
    };
    empathy: {
      score: DomainScore;
      feedback: string;
    };
    clear_information: {
      score: DomainScore;
      feedback: string;
    };
  };
  formulaic_concerns: string[];
  listening_quality: 'excellent' | 'good' | 'adequate' | 'poor';
  question_style_balance: string;
}

export interface Evaluation {
  // CASC 5-DOMAIN STRUCTURE
   formatted_feedback?: string;
  domains: {
    professionalism: DomainEvaluation;
    consultation_management: DomainEvaluation;
    communication_skills: CommunicationEvaluation;
    clinical_assessment: DomainEvaluation;
    clinical_management: DomainEvaluation;
  };
  
  // GLOBAL JUDGEMENT (6-grade scale)
  global_judgement: GlobalJudgement;
  global_justification: string;
  
  // COMMUNICATION ANALYSIS (cumulative)
  communication_analysis?: {
    average_empathy: string;
    average_tone_score: number;
    total_questions: number;
    common_issues: string[];
    strengths: string[];
    formulaic_count?: number;
    open_questions?: number;
    closed_questions?: number;
  };
  
  // EMOTIONAL INTELLIGENCE
  emotional_intelligence: {
    overall_rating: string;
    tone_consistency: string;
    empathy_highlights: string[];
    empathy_concerns: string[];
    communication_style: string;
    patient_comfort_level: string;
  };
  
  // SCORING
  total_domain_score: number; // Sum of 5 domains (5-25)
  weighted_percentage: number; // Based on station type weights
  pass_fail: 'PASS' | 'FAIL';
  confidence_level: string;
  
  // FEEDBACK
  overall_comments: string;
  key_strengths: string[];
  critical_improvements: string[];
  recommendations: string[];
  
  // SPECIFIC CONCERNS
  safety_concerns: string[];
  formulaic_trap_detected: boolean;
  
  // META
  session_id?: string;
  case_id: string;
  timestamp: string;
  station_type: 'history' | 'management' | 'examination' | 'breaking_bad_news';
  specialty: string;
}

// MULTI-STATION TRACKING (NEW)
export interface StationResult {
  station_number: number; // 1-16
  session_number: 1 | 2;
  case_id: string;
  specialty: string;
  station_type: string;
  global_judgement: GlobalJudgement;
  pass_fail: 'PASS' | 'FAIL';
  weighted_percentage: number;
  completed_at: string;
  evaluation: Evaluation;
}

export interface CASCProgress {
  user_id: string; // or anonymous identifier
  stations_completed: StationResult[];
  stations_passed: number;
  stations_failed: number;
  severe_fails: number;
  specialties_covered: string[];
  overall_status: 'in_progress' | 'passed' | 'failed' | 'review_required';
  started_at: string;
  last_updated: string;
}

export interface RAGContext {
  content: string;
  metadata: {
    case_id: string;
    specialty: string;
    source: string;
  };
  relevance_score: number;
}

export type EmotionalState =
  | "calm"
  | "anxious"
  | "distressed"
  | "confused"
  | "reassured"
  | "angry"
  | "sad"
  | "hopeful";

// DOMAIN WEIGHTS BY STATION TYPE
export const DOMAIN_WEIGHTS = {
  history: {
    professionalism: 10,
    consultation_management: 20,
    communication_skills: 20,
    clinical_assessment: 50,
    clinical_management: 0,
  },
  management: {
    professionalism: 10,
    consultation_management: 10,
    communication_skills: 20,
    clinical_assessment: 10,
    clinical_management: 50,
  },
  examination: {
    professionalism: 10,
    consultation_management: 10,
    communication_skills: 20,
    clinical_assessment: 60,
    clinical_management: 0,
  },
  breaking_bad_news: {
    professionalism: 15,
    consultation_management: 10,
    communication_skills: 45,
    clinical_assessment: 0,
    clinical_management: 30,
  },
};

// READING TIME BY SESSION (in seconds)
// export const READING_TIME = {
//   session_1: 240, // 4 minutes
//   session_2: 90,  // 90 seconds
// };


// // EXAM TIME (in seconds)
// export const EXAM_TIME = 420; // 7 minutes
export const READING_TIME = {
  session_1: 30,  // 30 seconds (changed from 240)
  session_2: 30,  // 30 seconds (changed from 90)
};

// EXAM TIME (in seconds)
export const EXAM_TIME = 420; // 7 minutes (keep this - don't change)