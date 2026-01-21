
'use client';

import { CheckCircle, XCircle, TrendingUp, Award, AlertTriangle, BarChart } from 'lucide-react';
import type { Evaluation, CASCProgress } from '../lib/types';

interface ResultsProps {
  evaluation: Evaluation;
  cascProgress?: CASCProgress | null;
  onRestart: () => void;
  onViewProgress?: () => void;
}

export function Results({ evaluation, cascProgress, onRestart, onViewProgress }: ResultsProps) {
  const isPassed = evaluation.pass_fail === 'PASS';
  
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {isPassed ? (
              <CheckCircle className="w-20 h-20 text-green-500" />
            ) : (
              <XCircle className="w-20 h-20 text-red-500" />
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">CASC Station Complete!</h2>
          <p className="text-gray-600">Official RCPsych-aligned evaluation</p>
        </div>

        {/* CASC Progress Banner */}
        {cascProgress && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8">
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
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium"
                >
                  View Full Progress
                </button>
              )}
            </div>
          </div>
        )}

        {/* Global Judgement - PRIMARY RESULT */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-2">Global Judgement</div>
            <div className={`inline-block px-8 py-3 rounded-full font-bold text-2xl mb-4 ${getGlobalColor()}`}>
              {evaluation.global_judgement}
            </div>
            <p className="text-gray-700 mb-4 max-w-2xl mx-auto">{evaluation.global_justification}</p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <div className="text-sm text-gray-600">Domain Score</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {evaluation.total_domain_score}/25
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Weighted Score</div>
                <div className="text-3xl font-bold text-indigo-600">
                  {evaluation.weighted_percentage}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Result</div>
                <div className={`text-3xl font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
                  {evaluation.pass_fail}
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-600">
              Station: <span className="font-semibold capitalize">{evaluation.station_type.replace('_', ' ')}</span>
              {' • '}
              Specialty: <span className="font-semibold">{evaluation.specialty}</span>
              {' • '}
              Confidence: <span className="font-semibold">{evaluation.confidence_level}</span>
            </div>
          </div>
        </div>

        {/* Safety Concerns - CRITICAL */}
        {evaluation.safety_concerns && evaluation.safety_concerns.length > 0 && (
          <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-lg p-6">
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
          <div className="mb-8 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-900 font-semibold">
              ⚠️ Formulaic/Robotic Consultation Detected
            </p>
            <p className="text-orange-800 text-sm mt-1">
              Consultation appeared scripted. Focus on genuine, adaptive responses.
            </p>
          </div>
        )}

        {/* CASC 5-Domain Scores (1-5 scale) */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Award className="w-6 h-6" />
            CASC Domain Scores (1-5 Scale)
          </h3>
          <div className="space-y-4">
            {Object.entries(evaluation.domains).map(([domainKey, domain]: [string, any]) => (
              <div key={domainKey} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {domainKey.replace(/_/g, ' ')}
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full font-bold ${getDomainColor(domain.score)}`}>
                      {domain.score}/5
                    </span>
                    <span className="text-sm text-gray-600">({domain.percentage}%)</span>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-3 italic">{domain.feedback}</p>

                {/* Communication Sub-domains */}
                {domainKey === 'communication_skills' && domain.sub_domains && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-3">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Communication Sub-Domains:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                      {Object.entries(domain.sub_domains).map(([subKey, subDomain]: [string, any]) => (
                        <div key={subKey} className="flex items-center justify-between">
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
                        <p className="text-xs font-semibold text-orange-900 mb-1">Formulaic phrases:</p>
                        <ul className="text-xs text-orange-800 ml-4">
                          {domain.formulaic_concerns.map((concern: string, idx: number) => (
                            <li key={idx}>• {concern}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-2 grid md:grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-semibold">Listening: </span>
                        <span className="capitalize">{domain.listening_quality}</span>
                      </div>
                      <div>
                        <span className="font-semibold">Questions: </span>
                        <span>{domain.question_style_balance}</span>
                      </div>
                    </div>
                  </div>
                )}

                {domain.strengths && domain.strengths.length > 0 && (
                  <div className="mb-2">
                    <p className="text-sm font-medium text-green-700 mb-1">✓ Strengths:</p>
                    <ul className="text-sm text-gray-700 ml-4 space-y-1">
                      {domain.strengths.map((strength: string, idx: number) => (
                        <li key={idx}>• {strength}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {domain.weaknesses && domain.weaknesses.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-red-700 mb-1">⚠ Areas for Improvement:</p>
                    <ul className="text-sm text-gray-700 ml-4 space-y-1">
                      {domain.weaknesses.map((weakness: string, idx: number) => (
                        <li key={idx}>• {weakness}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Communication Analysis */}
        {evaluation.communication_analysis && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💬 Communication Analysis</h3>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Average Empathy</p>
                  <p className="text-2xl font-bold text-blue-700 capitalize">
                    {evaluation.communication_analysis.average_empathy}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Average Score</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {evaluation.communication_analysis.average_tone_score}/10
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Questions Asked</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {evaluation.communication_analysis.total_questions}
                  </p>
                </div>
              </div>

              {evaluation.communication_analysis.common_issues && 
               evaluation.communication_analysis.common_issues.length > 0 && (
                <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-orange-900 mb-2">⚠️ Common Issues:</p>
                  <ul className="text-sm text-gray-700 ml-4 space-y-1">
                    {evaluation.communication_analysis.common_issues.map((issue: string, idx: number) => (
                      <li key={idx}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {evaluation.communication_analysis.strengths && 
               evaluation.communication_analysis.strengths.length > 0 && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-green-900 mb-2">✓ Strengths:</p>
                  <ul className="text-sm text-gray-700 ml-4 space-y-1">
                    {evaluation.communication_analysis.strengths.map((strength: string, idx: number) => (
                      <li key={idx}>• {strength}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Emotional Intelligence */}
        {evaluation.emotional_intelligence && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Emotional Intelligence</h3>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Overall Rating:</p>
                  <p className="text-lg font-semibold text-purple-700 capitalize">
                    {evaluation.emotional_intelligence.overall_rating}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Communication Style:</p>
                  <p className="text-lg font-semibold text-purple-700">
                    {evaluation.emotional_intelligence.communication_style}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tone Consistency:</p>
                  <p className="text-lg font-semibold text-purple-700 capitalize">
                    {evaluation.emotional_intelligence.tone_consistency}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Patient Comfort:</p>
                  <p className="text-lg font-semibold text-purple-700 capitalize">
                    {evaluation.emotional_intelligence.patient_comfort_level}
                  </p>
                </div>
              </div>

              {evaluation.emotional_intelligence.empathy_highlights &&
                evaluation.emotional_intelligence.empathy_highlights.length > 0 && (
                  <div className="mt-4">
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
                  <div className="mt-4">
                    <p className="text-sm font-medium text-red-700 mb-2">Empathy Concerns:</p>
                    <ul className="text-sm text-gray-700 ml-4 space-y-1">
                      {evaluation.emotional_intelligence.empathy_concerns.map((concern, idx) => (
                        <li key={idx}>⚠ {concern}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Key Strengths */}
        {evaluation.key_strengths && evaluation.key_strengths.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Key Strengths
            </h3>
            <div className="bg-green-50 rounded-lg p-4">
              <ul className="space-y-2">
                {evaluation.key_strengths.map((strength, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Critical Improvements */}
        {evaluation.critical_improvements && evaluation.critical_improvements.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ Critical Improvements</h3>
            <div className="bg-orange-50 rounded-lg p-4">
              <ul className="space-y-2">
                {evaluation.critical_improvements.map((improvement, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <XCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Examiner Comments */}
        {evaluation.overall_comments && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Examiner Comments</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{evaluation.overall_comments}</p>
            </div>
          </div>
        )}

        {/* Recommendations */}
        {evaluation.recommendations && evaluation.recommendations.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Recommendations</h3>
            <div className="bg-blue-50 rounded-lg p-4">
              <ul className="space-y-2">
                {evaluation.recommendations.map((recommendation, idx) => (
                  <li key={idx} className="text-gray-700">
                    {idx + 1}. {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Start New Station
          </button>
        </div>
      </div>
    </div>
  );
}
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

//         {/* ⭐ PRIMARY: NotebookLM Formatted Feedback */}
//         {evaluation.formatted_feedback && (
//           <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">📋 Detailed Examiner Feedback</h3>
//             <div className="prose prose-sm max-w-none">
//               <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
//                 {evaluation.formatted_feedback}
//               </pre>
//             </div>
//           </div>
//         )}

//         {/* Global Judgement Summary */}
//         <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 mb-8">
//           <div className="text-center">
//             <div className="text-lg text-gray-600 mb-2">Global Judgement</div>
//             <div className={`inline-block px-8 py-3 rounded-full font-bold text-2xl mb-4 ${getGlobalColor()}`}>
//               {evaluation.global_judgement}
//             </div>
            
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
//               Station: <span className="font-semibold capitalize">{evaluation.station_type?.replace('_', ' ')}</span>
//               {' • '}
//               Specialty: <span className="font-semibold">{evaluation.specialty}</span>
//               {' • '}
//               Confidence: <span className="font-semibold">{evaluation.confidence_level}</span>
//             </div>
//           </div>
//         </div>

//         {/* CASC 5-Domain Scores (Summary) */}
//         <div className="mb-8">
//           <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//             <Award className="w-6 h-6" />
//             CASC Domain Scores (1-5 Scale)
//           </h3>
//           <div className="grid md:grid-cols-2 gap-4">
//             {Object.entries(evaluation.domains || {}).map(([domainKey, domain]: [string, any]) => (
//               <div key={domainKey} className="border rounded-lg p-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="font-semibold text-gray-900 capitalize">
//                     {domainKey.replace(/_/g, ' ')}
//                   </h4>
//                   <div className="flex items-center gap-2">
//                     <span className={`px-3 py-1 rounded-full font-bold ${getDomainColor(domain.score)}`}>
//                       {domain.score}/5
//                     </span>
//                     <span className="text-sm text-gray-600">({domain.percentage}%)</span>
//                   </div>
//                 </div>
//                 <p className="text-sm text-gray-600 italic">{domain.feedback}</p>
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

//               {evaluation.emotional_intelligence.empathy_concerns &&
//                 evaluation.emotional_intelligence.empathy_concerns.length > 0 && (
//                   <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3">
//                     <p className="text-sm font-medium text-orange-900 mb-2">⚠ Empathy Concerns:</p>
//                     <ul className="text-sm text-gray-700 ml-4 space-y-1">
//                       {evaluation.emotional_intelligence.empathy_concerns.map((concern, idx) => (
//                         <li key={idx}>• {concern}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//             </div>
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex gap-4 justify-center mt-8">
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