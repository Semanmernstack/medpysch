
// 'use client';

// import { CheckCircle, XCircle, TrendingUp, Award, AlertTriangle, BarChart } from 'lucide-react';
// import type { Evaluation, CASCProgress } from '../lib/types';

// interface ResultsProps {
//   evaluation: Evaluation;
//   cascProgress?: CASCProgress | null;
//   onRestart: () => void;
//   onViewProgress?: () => void;
// }

// export function Results({ evaluation, cascProgress, onRestart, onViewProgress }: ResultsProps) {
//   const isPassed = evaluation.pass_fail === 'PASS';
  
//   // Get global judgement color
//   const getGlobalColor = () => {
//     switch (evaluation.global_judgement) {
//       case 'Excellent Pass':
//       case 'Pass':
//         return 'bg-green-500 text-white';
//       case 'Borderline Pass':
//         return 'bg-yellow-500 text-white';
//       case 'Borderline Fail':
//         return 'bg-orange-500 text-white';
//       case 'Fail':
//       case 'Severe Fail':
//         return 'bg-red-500 text-white';
//       default:
//         return 'bg-gray-500 text-white';
//     }
//   };

//   const getDomainColor = (score: number) => {
//     const percentage = (score / 5) * 100;
//     if (percentage >= 80) return 'text-green-600 bg-green-50';
//     if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
//     return 'text-red-600 bg-red-50';
//   };

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="bg-white rounded-xl shadow-xl p-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             {isPassed ? (
//               <CheckCircle className="w-20 h-20 text-green-500" />
//             ) : (
//               <XCircle className="w-20 h-20 text-red-500" />
//             )}
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">CASC Station Complete!</h2>
//           <p className="text-gray-600">Official RCPsych-aligned evaluation</p>
//         </div>

//         {/* CASC Progress Banner */}
//         {cascProgress && (
//           <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <BarChart className="w-6 h-6 text-indigo-600" />
//                 <div>
//                   <p className="font-semibold text-indigo-900">
//                     CASC Progress: {cascProgress.stations_completed.length}/16 Stations
//                   </p>
//                   <p className="text-sm text-indigo-700">
//                     {cascProgress.stations_passed} Passed • {cascProgress.stations_failed} Failed
//                     {cascProgress.severe_fails > 0 && ` • ${cascProgress.severe_fails} Severe Fail`}
//                   </p>
//                 </div>
//               </div>
//               {onViewProgress && (
//                 <button
//                   onClick={onViewProgress}
//                   className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
//                 >
//                   View Full Progress
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Global Judgement - PRIMARY RESULT */}
//         <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
//           <div className="text-center">
//             <div className="text-lg text-gray-600 mb-2">Global Judgement</div>
//             <div className={`inline-block px-8 py-3 rounded-full font-bold text-2xl mb-4 ${getGlobalColor()}`}>
//               {evaluation.global_judgement}
//             </div>
//             <p className="text-gray-700 mb-4 max-w-2xl mx-auto">{evaluation.global_justification}</p>
            
//             <div className="grid md:grid-cols-3 gap-4 mt-4">
//               <div>
//                 <div className="text-sm text-gray-600">Domain Score</div>
//                 <div className="text-3xl font-bold text-indigo-600">
//                   {evaluation.total_domain_score}/25
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-600">Weighted Score</div>
//                 <div className="text-3xl font-bold text-indigo-600">
//                   {evaluation.weighted_percentage}%
//                 </div>
//               </div>
//               <div>
//                 <div className="text-sm text-gray-600">Result</div>
//                 <div className={`text-3xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
//                   {evaluation.pass_fail}
//                 </div>
//               </div>
//             </div>
            
//             <div className="mt-4 text-sm text-gray-600">
//               Station: <span className="font-semibold capitalize">{evaluation.station_type.replace('_', ' ')}</span>
//               {' • '}
//               Specialty: <span className="font-semibold">{evaluation.specialty}</span>
//               {' • '}
//               Confidence: <span className="font-semibold">{evaluation.confidence_level}</span>
//             </div>
//           </div>
//         </div>

//         {/* Safety Concerns - CRITICAL */}
//         {evaluation.safety_concerns && evaluation.safety_concerns.length > 0 && (
//           <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
//             <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
//               <AlertTriangle className="w-6 h-6" />
//               Critical Safety Concerns
//             </h3>
//             <ul className="space-y-2">
//               {evaluation.safety_concerns.map((concern, idx) => (
//                 <li key={idx} className="flex items-start gap-2 text-red-800">
//                   <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
//                   <span className="font-semibold">{concern}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Formulaic Trap Warning */}
//         {evaluation.formulaic_trap_detected && (
//           <div className="mb-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
//             <p className="text-orange-900 font-semibold">
//               ⚠️ Formulaic/Robotic Consultation Detected
//             </p>
//             <p className="text-orange-800 text-sm mt-1">
//               Consultation appeared scripted. Focus on genuine, adaptive responses.
//             </p>
//           </div>
//         )}

//         {/* CASC 5-Domain Scores (1-5 scale) */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Award className="w-6 h-6" />
//             CASC Domain Scores (1-5 Scale)
//           </h3>
//           <div className="space-y-4">
//             {Object.entries(evaluation.domains).map(([domainKey, domain]: [string, any]) => (
//               <div key={domainKey} className="border rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <h4 className="font-semibold text-gray-900 capitalize">
//                     {domainKey.replace(/_/g, ' ')}
//                   </h4>
//                   <div className="flex items-center gap-3">
//                     <span className={`px-3 py-1 rounded-full font-bold ${getDomainColor(domain.score)}`}>
//                       {domain.score}/5
//                     </span>
//                     <span className="text-sm text-gray-600">({domain.percentage}%)</span>
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-700 mb-3 italic">{domain.feedback}</p>

//                 {/* Communication Sub-domains */}
//                 {domainKey === 'communication_skills' && domain.sub_domains && (
//                   <div className="bg-blue-50 rounded-lg p-4 mb-3">
//                     <p className="text-sm font-semibold text-blue-900 mb-2">Communication Sub-Domains:</p>
//                     <div className="grid md:grid-cols-2 gap-3">
//                       {Object.entries(domain.sub_domains).map(([subKey, subDomain]: [string, any]) => (
//                         <div key={subKey} className="flex items-center justify-between">
//                           <span className="text-sm text-gray-700 capitalize">
//                             {subKey.replace(/_/g, ' ')}
//                           </span>
//                           <span className={`px-2 py-1 rounded text-xs font-bold ${getDomainColor(subDomain.score)}`}>
//                             {subDomain.score}/5
//                           </span>
//                         </div>
//                       ))}
//                     </div>
                    
//                     {domain.formulaic_concerns && domain.formulaic_concerns.length > 0 && (
//                       <div className="mt-3 bg-orange-50 border border-orange-200 rounded p-2">
//                         <p className="text-xs font-semibold text-orange-900 mb-1">Formulaic phrases:</p>
//                         <ul className="text-xs text-orange-800 ml-4">
//                           {domain.formulaic_concerns.map((concern: string, idx: number) => (
//                             <li key={idx}>• {concern}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
                    
//                     <div className="mt-2 grid md:grid-cols-2 gap-2 text-xs">
//                       <div>
//                         <span className="font-semibold">Listening: </span>
//                         <span className="capitalize">{domain.listening_quality}</span>
//                       </div>
//                       <div>
//                         <span className="font-semibold">Questions: </span>
//                         <span>{domain.question_style_balance}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {domain.strengths && domain.strengths.length > 0 && (
//                   <div className="mb-2">
//                     <p className="text-sm font-medium text-green-700 mb-1">✓ Strengths:</p>
//                     <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                       {domain.strengths.map((strength: string, idx: number) => (
//                         <li key={idx}>• {strength}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 {domain.weaknesses && domain.weaknesses.length > 0 && (
//                   <div>
//                     <p className="text-sm font-medium text-red-700 mb-1">⚠ Areas for Improvement:</p>
//                     <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                       {domain.weaknesses.map((weakness: string, idx: number) => (
//                         <li key={idx}>• {weakness}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Communication Analysis */}
//         {evaluation.communication_analysis && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Communication Analysis</h3>
//             <div className="bg-blue-50 rounded-lg p-6">
//               <div className="grid md:grid-cols-3 gap-4 mb-4">
//                 <div className="text-center">
//                   <p className="text-sm text-gray-600 mb-1">Average Empathy</p>
//                   <p className="text-2xl font-bold text-blue-700 capitalize">
//                     {evaluation.communication_analysis.average_empathy}
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-sm text-gray-600 mb-1">Average Score</p>
//                   <p className="text-2xl font-bold text-blue-700">
//                     {evaluation.communication_analysis.average_tone_score}/10
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <p className="text-sm text-gray-600 mb-1">Questions Asked</p>
//                   <p className="text-2xl font-bold text-blue-700">
//                     {evaluation.communication_analysis.total_questions}
//                   </p>
//                 </div>
//               </div>

//               {evaluation.communication_analysis.common_issues && 
//                evaluation.communication_analysis.common_issues.length > 0 && (
//                 <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
//                   <p className="text-sm font-semibold text-orange-900 mb-2">⚠️ Common Issues:</p>
//                   <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                     {evaluation.communication_analysis.common_issues.map((issue: string, idx: number) => (
//                       <li key={idx}>• {issue}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}

//               {evaluation.communication_analysis.strengths && 
//                evaluation.communication_analysis.strengths.length > 0 && (
//                 <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
//                   <p className="text-sm font-semibold text-green-900 mb-2">✓ Strengths:</p>
//                   <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                     {evaluation.communication_analysis.strengths.map((strength: string, idx: number) => (
//                       <li key={idx}>• {strength}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Emotional Intelligence */}
//         {evaluation.emotional_intelligence && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Emotional Intelligence</h3>
//             <div className="bg-purple-50 rounded-lg p-4">
//               <div className="grid md:grid-cols-2 gap-4 mb-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Overall Rating:</p>
//                   <p className="text-lg font-semibold text-purple-700 capitalize">
//                     {evaluation.emotional_intelligence.overall_rating}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Communication Style:</p>
//                   <p className="text-lg font-semibold text-purple-700">
//                     {evaluation.emotional_intelligence.communication_style}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Tone Consistency:</p>
//                   <p className="text-lg font-semibold text-purple-700 capitalize">
//                     {evaluation.emotional_intelligence.tone_consistency}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-700">Patient Comfort:</p>
//                   <p className="text-lg font-semibold text-purple-700 capitalize">
//                     {evaluation.emotional_intelligence.patient_comfort_level}
//                   </p>
//                 </div>
//               </div>

//               {evaluation.emotional_intelligence.empathy_highlights &&
//                 evaluation.emotional_intelligence.empathy_highlights.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-sm font-medium text-green-700 mb-2">Empathy Highlights:</p>
//                     <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                       {evaluation.emotional_intelligence.empathy_highlights.map((highlight, idx) => (
//                         <li key={idx}>✓ {highlight}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//               {evaluation.emotional_intelligence.empathy_concerns &&
//                 evaluation.emotional_intelligence.empathy_concerns.length > 0 && (
//                   <div className="mt-4">
//                     <p className="text-sm font-medium text-red-700 mb-2">Empathy Concerns:</p>
//                     <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                       {evaluation.emotional_intelligence.empathy_concerns.map((concern, idx) => (
//                         <li key={idx}>⚠ {concern}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//             </div>
//           </div>
//         )}

//         {/* Key Strengths */}
//         {evaluation.key_strengths && evaluation.key_strengths.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//               <TrendingUp className="w-6 h-6 text-green-600" />
//               Key Strengths
//             </h3>
//             <div className="bg-green-50 rounded-lg p-4">
//               <ul className="space-y-2">
//                 {evaluation.key_strengths.map((strength, idx) => (
//                   <li key={idx} className="flex items-start gap-2 text-gray-700">
//                     <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
//                     <span>{strength}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Critical Improvements */}
//         {evaluation.critical_improvements && evaluation.critical_improvements.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Critical Improvements</h3>
//             <div className="bg-orange-50 rounded-lg p-4">
//               <ul className="space-y-2">
//                 {evaluation.critical_improvements.map((improvement, idx) => (
//                   <li key={idx} className="flex items-start gap-2 text-gray-700">
//                     <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
//                     <span>{improvement}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Examiner Comments */}
//         {evaluation.overall_comments && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Examiner Comments</h3>
//             <div className="bg-gray-50 rounded-lg p-4">
//               <p className="text-gray-700 whitespace-pre-wrap">{evaluation.overall_comments}</p>
//             </div>
//           </div>
//         )}

//         {/* Recommendations */}
//         {evaluation.recommendations && evaluation.recommendations.length > 0 && (
//           <div className="mb-8">
//             <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Recommendations</h3>
//             <div className="bg-blue-50 rounded-lg p-4">
//               <ul className="space-y-2">
//                 {evaluation.recommendations.map((recommendation, idx) => (
//                   <li key={idx} className="text-gray-700">
//                     {idx + 1}. {recommendation}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-4 justify-center">
//           <button
//             onClick={onRestart}
//             className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
//           >
//             Start New Station
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, TrendingUp, Award, AlertTriangle, BarChart, Download, Share2, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

// Updated type definitions based on the examiner agent output
interface DomainScore {
  score: number;
  percentage: number;
  feedback: string;
  strengths?: string[];
  weaknesses?: string[];
  examples?: string[];
  sub_domains?: {
    [key: string]: {
      score: number;
    };
  };
  listening_quality?: string;
  question_style_balance?: string;
  formulaic_concerns?: string[];
}

interface QuestionCoaching {
  your_question: string;
  assessment: 'GOOD' | 'OK' | 'POOR';
  feedback: string;
  better_version?: string;
  excellent_version?: string;
  marking_reference: string;
}

interface CueObservation {
  cue: string;
  response: string;
  impact: string;
  marking_reference: string;
}

interface CommunicationAnalysis {
  total_questions: number;
  average_empathy: string;
  average_tone_score: number;
  formulaic_count: number;
}

interface EmotionalIntelligence {
  overall_rating: string;
  communication_style: string;
  tone_consistency: string;
  patient_comfort_level: string;
  empathy_highlights?: string[];
  empathy_concerns?: string[];
}

interface Part1ExaminerFeedback {
  better_ways?: Array<{
    your_response?: string;
    what_was_good?: string;
  } | string>;
  critique?: {
    response_to_cues?: string;
    questioning_style?: string;
    formulaic_trap?: string;
  };
}

interface Part2Guide {
  step_1_alignment?: any;
  step_2_ideal_structure?: string[];
  step_3_exemplar_responses?: string[];
  step_5_common_mistakes?: string[];
  step_7_checklist?: string[];
}

interface Evaluation {
  global_judgement: 'Excellent Pass' | 'Pass' | 'Borderline Pass' | 'Borderline Fail' | 'Fail' | 'Severe Fail';
  global_justification: string;
  pass_fail: 'PASS' | 'FAIL';
  total_domain_score: number;
  weighted_percentage: number;
  domains: {
    professionalism: DomainScore;
    consultation_management: DomainScore;
    communication_skills: DomainScore;
    clinical_assessment: DomainScore;
    clinical_management: DomainScore;
  };
  cue_observations?: CueObservation[];
  question_coaching?: QuestionCoaching[];
  part_1_examiner_feedback?: Part1ExaminerFeedback;
  communication_analysis?: CommunicationAnalysis;
  emotional_intelligence?: EmotionalIntelligence;
  formulaic_trap_detected?: boolean;
  safety_concerns?: string[];
  key_strengths?: string[];
  critical_improvements?: string[];
  recommendations?: string[];
  overall_comments?: string;
  part_2_guide?: Part2Guide;
  station_type: string;
  specialty: string;
  evaluated_at: string;
}

interface CASCProgress {
  stations_completed: any[];
  stations_passed: number;
  stations_failed: number;
  severe_fails: number;
}

interface ResultsProps {
  evaluation: Evaluation;
  cascProgress?: CASCProgress | null;
  onRestart: () => void;
  onViewProgress?: () => void;
}

export function Results({ evaluation, cascProgress, onRestart, onViewProgress }: ResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'behavioral' | 'detailed'>('overview');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const isPassed = evaluation.pass_fail === 'PASS';
  
  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Get global judgement color
  const getGlobalColor = () => {
    switch (evaluation.global_judgement) {
      case 'Excellent Pass':
      case 'Pass':
        return 'bg-green-500 text-white';
      case 'Borderline Pass':
        return 'bg-yellow-500 text-white';
      case 'Borderline Fail':
        return 'bg-orange-500 text-white';
      case 'Fail':
      case 'Severe Fail':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getDomainColor = (score: number) => {
    const percentage = (score / 5) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleDownloadReport = () => {
    window.print();
  };

  const handleShareReport = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Report link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header with Actions */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">CASC Station Complete!</h2>
              <p className="text-indigo-100">MedPsychKH 2025 Official Marking Scheme</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition"
                title="Download Report"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Download</span>
              </button>
              <button
                onClick={handleShareReport}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition"
                title="Share Report"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden md:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Global Judgement Banner */}
          <div className="text-center">
            <div className={`inline-block px-8 py-3 rounded-full font-bold text-2xl mb-4 ${getGlobalColor()}`}>
              {evaluation.global_judgement}
            </div>
          </div>
        </div>

        {/* CASC Progress Banner */}
        {cascProgress && (
          <div className="bg-indigo-50 border-b border-indigo-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BarChart className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="font-semibold text-indigo-900">
                    CASC Progress: {cascProgress.stations_completed.length}/16 Stations
                  </p>
                  <p className="text-sm text-indigo-700">
                    {cascProgress.stations_passed} Passed • {cascProgress.stations_failed} Failed
                    {cascProgress.severe_fails > 0 && ` • ${cascProgress.severe_fails} Severe Fail`}
                  </p>
                </div>
              </div>
              {onViewProgress && (
                <button
                  onClick={onViewProgress}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium transition"
                >
                  View Full Progress
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-4 font-medium transition border-b-2 ${
                activeTab === 'overview'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('behavioral')}
              className={`py-4 px-4 font-medium transition border-b-2 ${
                activeTab === 'behavioral'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Behavioral Analysis
            </button>
            <button
              onClick={() => setActiveTab('detailed')}
              className={`py-4 px-4 font-medium transition border-b-2 ${
                activeTab === 'detailed'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Detailed Feedback
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Domain Score</div>
                  <div className="text-4xl font-bold text-indigo-600">
                    {evaluation.total_domain_score}/25
                  </div>
                  <div className="text-xs text-gray-500 mt-1">5 domains × 5 points</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center">
                  <div className="text-sm text-gray-600 mb-2">Weighted Score</div>
                  <div className="text-4xl font-bold text-purple-600">
                    {evaluation.weighted_percentage}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Station-weighted calculation</div>
                </div>
                <div className={`rounded-lg p-6 text-center ${
                  isPassed ? 'bg-gradient-to-br from-green-50 to-emerald-50' : 'bg-gradient-to-br from-red-50 to-orange-50'
                }`}>
                  <div className="text-sm text-gray-600 mb-2">Result</div>
                  <div className={`text-4xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                    {evaluation.pass_fail}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {evaluation.station_type.replace(/_/g, ' ')} • {evaluation.specialty}
                  </div>
                </div>
              </div>

              {/* Global Justification */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Examiner's Overall Assessment</h3>
                <p className="text-gray-700 leading-relaxed">{evaluation.global_justification}</p>
              </div>

              {/* Safety Concerns - CRITICAL */}
              {evaluation.safety_concerns && evaluation.safety_concerns.length > 0 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6" />
                    Critical Safety Concerns
                  </h3>
                  <ul className="space-y-2">
                    {evaluation.safety_concerns.map((concern, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-red-800">
                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold">{concern}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Formulaic Trap Warning */}
              {evaluation.formulaic_trap_detected && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-900 font-semibold">
                    ⚠️ Formulaic/Robotic Consultation Detected
                  </p>
                  <p className="text-orange-800 text-sm mt-1">
                    Most common failure (PDF Page 13): Consultation appeared scripted. Focus on genuine, adaptive responses using your own words.
                  </p>
                </div>
              )}

              {/* Quick Strengths & Improvements */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Strengths */}
                {evaluation.key_strengths && evaluation.key_strengths.length > 0 && (
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Key Strengths
                    </h3>
                    <ul className="space-y-2">
                      {evaluation.key_strengths.slice(0, 3).map((strength, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Critical Improvements */}
                {evaluation.critical_improvements && evaluation.critical_improvements.length > 0 && (
                  <div className="bg-orange-50 rounded-lg p-6">
                    <h3 className="font-bold text-orange-900 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Priority Improvements
                    </h3>
                    <ul className="space-y-2">
                      {evaluation.critical_improvements.slice(0, 3).map((improvement, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700 text-sm">
                          <XCircle className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Performance by Category Chart */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Performance by Category</h3>
                <div className="space-y-4">
                  {Object.entries(evaluation.domains).map(([domainKey, domain]) => (
                    <div key={domainKey}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 capitalize">
                          {domainKey.replace(/_/g, ' ')}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {domain.score}/5 ({domain.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            domain.percentage >= 80
                              ? 'bg-green-500'
                              : domain.percentage >= 60
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${domain.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Behavioral Analysis Tab */}
          {activeTab === 'behavioral' && (
            <div className="space-y-6">
              {/* Communication Analysis */}
              {evaluation.communication_analysis && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Communication Patterns</h3>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Average Empathy</p>
                      <p className="text-2xl font-bold text-blue-700 capitalize">
                        {evaluation.communication_analysis.average_empathy}
                      </p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Tone Score</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {evaluation.communication_analysis.average_tone_score}/10
                      </p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Questions Asked</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {evaluation.communication_analysis.total_questions}
                      </p>
                    </div>
                    <div className="text-center bg-white rounded-lg p-4">
                      <p className="text-sm text-gray-600 mb-1">Formulaic Count</p>
                      <p className={`text-2xl font-bold ${
                        evaluation.communication_analysis.formulaic_count > 2 ? 'text-red-700' : 'text-blue-700'
                      }`}>
                        {evaluation.communication_analysis.formulaic_count || 0}
                      </p>
                    </div>
                  </div>

                  {/* Part 1 Examiner Feedback */}
                  {evaluation.part_1_examiner_feedback && (
                    <div className="space-y-4">
                      {/* What Worked Well */}
                      {evaluation.part_1_examiner_feedback.better_ways && 
                       evaluation.part_1_examiner_feedback.better_ways.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">✓ What Worked Well</h4>
                          <ul className="space-y-2">
                            {evaluation.part_1_examiner_feedback.better_ways.map((item, idx) => (
                              <li key={idx} className="text-sm text-gray-700 bg-white rounded p-3">
                                {typeof item === 'string' ? item : (
                                  <div>
                                    <p className="font-medium">{item.your_response}</p>
                                    <p className="text-green-700 mt-1">{item.what_was_good}</p>
                                  </div>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* How to Improve */}
                      {evaluation.part_1_examiner_feedback.critique && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">→ How to Improve</h4>
                          <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                            {evaluation.part_1_examiner_feedback.critique.response_to_cues && (
                              <p><strong>Cue Response:</strong> {evaluation.part_1_examiner_feedback.critique.response_to_cues}</p>
                            )}
                            {evaluation.part_1_examiner_feedback.critique.questioning_style && (
                              <p><strong>Questioning:</strong> {evaluation.part_1_examiner_feedback.critique.questioning_style}</p>
                            )}
                            {evaluation.part_1_examiner_feedback.critique.formulaic_trap && (
                              <p><strong>Formulaic Trap:</strong> {evaluation.part_1_examiner_feedback.critique.formulaic_trap}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Cue Observations */}
                  {evaluation.cue_observations && evaluation.cue_observations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 mb-3">🔍 Cue Observations (PDF Page 14)</h4>
                      <div className="space-y-3">
                        {evaluation.cue_observations.map((cue, idx) => (
                          <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-amber-900 mb-1">
                              💡 Cue Given: {cue.cue}
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                              Your Response: "{cue.response}"
                            </p>
                            <p className="text-sm text-purple-700">
                              <strong>Impact:</strong> {cue.impact}
                            </p>
                            <p className="text-xs text-gray-600 mt-2">
                              Reference: {cue.marking_reference}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Emotional Intelligence */}
              {evaluation.emotional_intelligence && (
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Emotional Intelligence</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700">Overall Rating:</p>
                      <p className="text-lg font-semibold text-purple-700 capitalize">
                        {evaluation.emotional_intelligence.overall_rating}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700">Communication Style:</p>
                      <p className="text-lg font-semibold text-purple-700">
                        {evaluation.emotional_intelligence.communication_style}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700">Tone Consistency:</p>
                      <p className="text-lg font-semibold text-purple-700 capitalize">
                        {evaluation.emotional_intelligence.tone_consistency}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700">Patient Comfort:</p>
                      <p className="text-lg font-semibold text-purple-700 capitalize">
                        {evaluation.emotional_intelligence.patient_comfort_level}
                      </p>
                    </div>
                  </div>

                  {evaluation.emotional_intelligence.empathy_highlights &&
                    evaluation.emotional_intelligence.empathy_highlights.length > 0 && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-green-700 mb-2">Empathy Highlights:</p>
                        <ul className="text-sm text-gray-700 ml-4 space-y-1">
                          {evaluation.emotional_intelligence.empathy_highlights.map((highlight, idx) => (
                            <li key={idx}>✓ {highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {evaluation.emotional_intelligence.empathy_concerns &&
                    evaluation.emotional_intelligence.empathy_concerns.length > 0 && (
                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-red-700 mb-2">Empathy Concerns:</p>
                        <ul className="text-sm text-gray-700 ml-4 space-y-1">
                          {evaluation.emotional_intelligence.empathy_concerns.map((concern, idx) => (
                            <li key={idx}>⚠ {concern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              {/* Question Coaching */}
              {evaluation.question_coaching && evaluation.question_coaching.length > 0 && (
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Question Coaching (PDF Page 15)</h3>
                  <div className="space-y-4">
                    {evaluation.question_coaching.map((coaching, idx) => (
                      <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2">
                        <p className="text-sm font-medium text-gray-900 mb-2">
                          Your Question: "{coaching.your_question}"
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            coaching.assessment === 'GOOD'
                              ? 'bg-green-100 text-green-800'
                              : coaching.assessment === 'OK'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {coaching.assessment}
                          </span>
                          <span className="text-xs text-gray-600">{coaching.feedback}</span>
                        </div>
                        {coaching.better_version && (
                          <div className="bg-blue-50 rounded p-3 mt-2">
                            <p className="text-xs font-medium text-blue-900 mb-1">Better Version:</p>
                            <p className="text-sm text-blue-800">"{coaching.better_version}"</p>
                          </div>
                        )}
                        {coaching.excellent_version && (
                          <div className="bg-green-50 rounded p-3 mt-2">
                            <p className="text-xs font-medium text-green-900 mb-1">Excellent Version:</p>
                            <p className="text-sm text-green-800">"{coaching.excellent_version}"</p>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">{coaching.marking_reference}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Detailed Feedback Tab */}
          {activeTab === 'detailed' && (
            <div className="space-y-6">
              {/* CASC Domain Scores */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  CASC Domain Scores (1-5 Scale)
                </h3>
                <div className="space-y-4">
                  {Object.entries(evaluation.domains).map(([domainKey, domain]) => (
                    <div key={domainKey} className="border rounded-lg overflow-hidden">
                      {/* Domain Header - Clickable */}
                      <button
                        onClick={() => toggleSection(domainKey)}
                        className="w-full bg-gray-50 p-4 flex items-center justify-between hover:bg-gray-100 transition"
                      >
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-900 capitalize">
                            {domainKey.replace(/_/g, ' ')}
                          </h4>
                          <span className={`px-3 py-1 rounded-full font-bold ${getDomainColor(domain.score)}`}>
                            {domain.score}/5
                          </span>
                          <span className="text-sm text-gray-600">({domain.percentage}%)</span>
                        </div>
                        {expandedSections.has(domainKey) ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>

                      {/* Domain Details - Collapsible */}
                      {expandedSections.has(domainKey) && (
                        <div className="p-4 bg-white">
                          <p className="text-sm text-gray-700 mb-3 italic">{domain.feedback}</p>

                          {/* Communication Sub-domains */}
                          {domainKey === 'communication_skills' && domain.sub_domains && (
                            <div className="bg-blue-50 rounded-lg p-4 mb-3">
                              <p className="text-sm font-semibold text-blue-900 mb-2">Communication Sub-Domains (PDF Page 10):</p>
                              <div className="grid md:grid-cols-2 gap-3">
                                {Object.entries(domain.sub_domains).map(([subKey, subDomain]) => (
                                  <div key={subKey} className="flex items-center justify-between bg-white rounded p-2">
                                    <span className="text-sm text-gray-700 capitalize">
                                      {subKey.replace(/_/g, ' ')}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${getDomainColor(subDomain.score)}`}>
                                      {subDomain.score}/5
                                    </span>
                                  </div>
                                ))}
                              </div>
                              
                              {domain.formulaic_concerns && domain.formulaic_concerns.length > 0 && (
                                <div className="mt-3 bg-orange-50 border border-orange-200 rounded p-2">
                                  <p className="text-xs font-semibold text-orange-900 mb-1">Formulaic phrases detected:</p>
                                  <ul className="text-xs text-orange-800 ml-4">
                                    {domain.formulaic_concerns.map((concern, idx) => (
                                      <li key={idx}>• {concern}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {(domain.listening_quality || domain.question_style_balance) && (
                                <div className="mt-2 grid md:grid-cols-2 gap-2 text-xs">
                                  {domain.listening_quality && (
                                    <div>
                                      <span className="font-semibold">Listening: </span>
                                      <span className="capitalize">{domain.listening_quality}</span>
                                    </div>
                                  )}
                                  {domain.question_style_balance && (
                                    <div>
                                      <span className="font-semibold">Questions: </span>
                                      <span>{domain.question_style_balance}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {domain.strengths && domain.strengths.length > 0 && (
                            <div className="mb-2">
                              <p className="text-sm font-medium text-green-700 mb-1">✓ Strengths:</p>
                              <ul className="text-sm text-gray-700 ml-4 space-y-1">
                                {domain.strengths.map((strength, idx) => (
                                  <li key={idx}>• {strength}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {domain.weaknesses && domain.weaknesses.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-red-700 mb-1">⚠ Areas for Improvement:</p>
                              <ul className="text-sm text-gray-700 ml-4 space-y-1">
                                {domain.weaknesses.map((weakness, idx) => (
                                  <li key={idx}>• {weakness}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {domain.examples && domain.examples.length > 0 && (
                            <div className="mt-3 bg-gray-50 rounded p-3">
                              <p className="text-xs font-semibold text-gray-700 mb-1">Examples from your consultation:</p>
                              <ul className="text-xs text-gray-600 ml-4 space-y-1">
                                {domain.examples.map((example, idx) => (
                                  <li key={idx}>"{example}"</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 2 Learning Guide */}
              {evaluation.part_2_guide && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                    Learning Guide
                  </h3>

                  {/* Step-by-step sections */}
                  {evaluation.part_2_guide.step_1_alignment && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('alignment')}
                        className="w-full text-left font-semibold text-indigo-900 mb-2 flex items-center gap-2"
                      >
                        {expandedSections.has('alignment') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        1. Domain Alignment
                      </button>
                      {expandedSections.has('alignment') && (
                        <div className="bg-white rounded p-4 text-sm text-gray-700">
                          <pre className="whitespace-pre-wrap">{JSON.stringify(evaluation.part_2_guide.step_1_alignment, null, 2)}</pre>
                        </div>
                      )}
                    </div>
                  )}

                  {evaluation.part_2_guide.step_2_ideal_structure && evaluation.part_2_guide.step_2_ideal_structure.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('structure')}
                        className="w-full text-left font-semibold text-indigo-900 mb-2 flex items-center gap-2"
                      >
                        {expandedSections.has('structure') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        2. Ideal Structure
                      </button>
                      {expandedSections.has('structure') && (
                        <ul className="bg-white rounded p-4 text-sm text-gray-700 space-y-1">
                          {evaluation.part_2_guide.step_2_ideal_structure.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {evaluation.part_2_guide.step_3_exemplar_responses && evaluation.part_2_guide.step_3_exemplar_responses.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('exemplar')}
                        className="w-full text-left font-semibold text-indigo-900 mb-2 flex items-center gap-2"
                      >
                        {expandedSections.has('exemplar') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        3. Exemplar Responses
                      </button>
                      {expandedSections.has('exemplar') && (
                        <ul className="bg-white rounded p-4 text-sm text-gray-700 space-y-2">
                          {evaluation.part_2_guide.step_3_exemplar_responses.map((item, idx) => (
                            <li key={idx} className="border-l-2 border-green-500 pl-3">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {evaluation.part_2_guide.step_5_common_mistakes && evaluation.part_2_guide.step_5_common_mistakes.length > 0 && (
                    <div className="mb-4">
                      <button
                        onClick={() => toggleSection('mistakes')}
                        className="w-full text-left font-semibold text-indigo-900 mb-2 flex items-center gap-2"
                      >
                        {expandedSections.has('mistakes') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        5. Common Mistakes
                      </button>
                      {expandedSections.has('mistakes') && (
                        <ul className="bg-white rounded p-4 text-sm text-gray-700 space-y-2">
                          {evaluation.part_2_guide.step_5_common_mistakes.map((item, idx) => (
                            <li key={idx} className="border-l-2 border-red-500 pl-3">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {evaluation.part_2_guide.step_7_checklist && evaluation.part_2_guide.step_7_checklist.length > 0 && (
                    <div>
                      <button
                        onClick={() => toggleSection('checklist')}
                        className="w-full text-left font-semibold text-indigo-900 mb-2 flex items-center gap-2"
                      >
                        {expandedSections.has('checklist') ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        7. Essential Checklist
                      </button>
                      {expandedSections.has('checklist') && (
                        <ul className="bg-white rounded p-4 text-sm text-gray-700 space-y-1">
                          {evaluation.part_2_guide.step_7_checklist.map((item, idx) => (
                            <li key={idx}>☑ {item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Examiner Comments */}
              {evaluation.overall_comments && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Examiner Comments</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{evaluation.overall_comments}</p>
                </div>
              )}

              {/* Recommendations */}
              {evaluation.recommendations && evaluation.recommendations.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Recommendations</h3>
                  <ol className="space-y-3">
                    {evaluation.recommendations.map((recommendation, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 flex-1">{recommendation}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t bg-gray-50 p-6">
          <div className="flex gap-4 justify-center">
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg"
            >
              Start New Station
            </button>
            {onViewProgress && (
              <button
                onClick={onViewProgress}
                className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold shadow-lg"
              >
                View All Progress
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
