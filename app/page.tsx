// 'use client';

// import { useState } from 'react';




// import { CaseSelector } from './components/CaseSelector';
// import { ExamInterface } from './components/ExamInterface';
// import { Results } from './components/Results';
// import { Evaluation } from './lib/types';

// export default function Home() {
//   const [stage, setStage] = useState<'select' | 'exam' | 'results'>('select');
//   const [sessionData, setSessionData] = useState<any>(null);
//   const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

//   const handleCaseSelected = (data: any) => {
//     setSessionData(data);
//     setStage('exam');
//   };

//   const handleExamComplete = (evalData: Evaluation) => {
//     setEvaluation(evalData);
//     setStage('results');
//   };

//   const handleRestart = () => {
//     setStage('select');
//     setSessionData(null);
//     setEvaluation(null);
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             🏥 Medical Examination AI
//           </h1>
//           <p className="text-gray-600">
//             Practice clinical examinations with AI patients & real-time feedback
//           </p>
//         </div>

//         {/* Main Content */}
//         {stage === 'select' && (
//           <CaseSelector onCaseSelected={handleCaseSelected} />
//         )}

//         {stage === 'exam' && sessionData && (
//           <ExamInterface
//             sessionData={sessionData}
//             onExamComplete={handleExamComplete}
//           />
//         )}

//         {stage === 'results' && evaluation && (
//           <Results evaluation={evaluation} onRestart={handleRestart} />
//         )}
//       </div>
//     </main>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { CaseSelector } from './components/CaseSelector';
import { ReadingTime } from './components/ReadingTime';
import { ExamInterface } from './components/ExamInterface';
import { Results } from './components/Results';
import type { Evaluation, CASCProgress } from './lib/types';
import { READING_TIME } from './lib/types';

export default function Home() {
  const [stage, setStage] = useState<'select' | 'reading' | 'exam' | 'results' | 'progress'>('select');
  const [sessionData, setSessionData] = useState<any>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [cascProgress, setCascProgress] = useState<CASCProgress | null>(null);
  const [userId] = useState<string>(() => {
    // Get or create anonymous user ID
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('casc_user_id');
      if (!id) {
        id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('casc_user_id', id);
      }
      return id;
    }
    return 'anonymous';
  });

  // Load CASC progress on mount
  useEffect(() => {
    loadCASCProgress();
  }, []);

  const loadCASCProgress = async () => {
    try {
      const response = await fetch(`/api/casc/progress?user_id=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setCascProgress(data.progress);
      }
    } catch (error) {
      console.error('Failed to load CASC progress:', error);
    }
  };

  const handleCaseSelected = (data: any) => {
    setSessionData(data);
    // Determine reading time based on session number
    const readingTime = data.case_data.session_number === 1 
      ? READING_TIME.session_1 
      : READING_TIME.session_2;
    
    // Add reading time to session data
    setSessionData({ ...data, reading_time_seconds: readingTime });
    setStage('reading');
  };

  const handleReadingComplete = () => {
    setStage('exam');
  };

  const handleExamComplete = (evalData: Evaluation, progress?: CASCProgress) => {
    // ← REMOVED 'async' - this fixes the type error
    setEvaluation(evalData);
    if (progress) {
      setCascProgress(progress);
    }
    setStage('results');
  };

  const handleRestart = () => {
    setStage('select');
    setSessionData(null);
    setEvaluation(null);
    loadCASCProgress(); // Refresh progress
  };

  const handleViewProgress = () => {
    setStage('progress');
  };

  const handleBackFromProgress = () => {
    setStage('results');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏥 CASC Examination Simulator
          </h1>
          <p className="text-gray-600">
            Official RCPsych CASC-aligned practice with AI patients
          </p>
          
          {/* CASC Progress Indicator */}
          {cascProgress && stage !== 'progress' && (
            <div className="mt-4 inline-block">
              <button
                onClick={handleViewProgress}
                className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-indigo-300 transition text-sm"
              >
                📊 Progress: {cascProgress.stations_completed.length}/16 stations
                {' • '}
                {cascProgress.stations_passed} passed
                {cascProgress.severe_fails > 0 && ` • ${cascProgress.severe_fails} severe fail(s)`}
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        {stage === 'select' && (
          <CaseSelector onCaseSelected={handleCaseSelected} />
        )}

        {stage === 'reading' && sessionData && (
          <ReadingTime
            sessionData={sessionData}
            readingTimeSeconds={sessionData.reading_time_seconds || 240}
            onReadingComplete={handleReadingComplete}
          />
        )}

        {stage === 'exam' && sessionData && (
          <ExamInterface
            sessionData={sessionData}
            userId={userId}
            onExamComplete={handleExamComplete}
          />
        )}

        {stage === 'results' && evaluation && (
          <Results
            evaluation={evaluation}
            cascProgress={cascProgress}
            onRestart={handleRestart}
            onViewProgress={cascProgress ? handleViewProgress : undefined}
          />
        )}

        {stage === 'progress' && cascProgress && (
          <CASCProgressDashboard
            progress={cascProgress}
            onBack={handleBackFromProgress}
            onRestart={handleRestart}
          />
        )}
      </div>
    </main>
  );
}

// CASC Progress Dashboard Component
function CASCProgressDashboard({ 
  progress, 
  onBack, 
  onRestart 
}: { 
  progress: CASCProgress; 
  onBack: () => void;
  onRestart: () => void;
}) {
  const getStatusColor = () => {
    switch (progress.overall_status) {
      case 'passed': return 'bg-green-100 text-green-800 border-green-300';
      case 'failed': return 'bg-red-100 text-red-800 border-red-300';
      case 'review_required': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getJudgementColor = (judgement: string) => {
    if (judgement.includes('Pass')) return 'bg-green-100 text-green-800';
    if (judgement.includes('Fail')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900">CASC Progress Dashboard</h2>
            <button
              onClick={onBack}
              className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
            >
              ← Back
            </button>
          </div>
          
          {/* Overall Status */}
          <div className={`inline-block px-6 py-3 rounded-lg border-2 font-semibold text-lg ${getStatusColor()}`}>
            Status: {progress.overall_status.replace('_', ' ').toUpperCase()}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-700">{progress.stations_completed.length}/16</div>
            <div className="text-sm text-gray-600">Stations Completed</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-700">{progress.stations_passed}</div>
            <div className="text-sm text-gray-600">Passed</div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-red-700">{progress.stations_failed}</div>
            <div className="text-sm text-gray-600">Failed</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-orange-700">{progress.severe_fails}</div>
            <div className="text-sm text-gray-600">Severe Fails</div>
          </div>
        </div>

        {/* Specialties Covered */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-3">Specialties Covered</h3>
          <div className="flex flex-wrap gap-2">
            {progress.specialties_covered.map((specialty, idx) => (
              <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Station Results Table */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-900 mb-3">Station Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">#</th>
                  <th className="border p-2 text-left">Specialty</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Global Judgement</th>
                  <th className="border p-2 text-left">Score</th>
                  <th className="border p-2 text-left">Result</th>
                  <th className="border p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {progress.stations_completed.map((station, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-2">{idx + 1}</td>
                    <td className="border p-2">{station.specialty}</td>
                    <td className="border p-2 capitalize">{station.station_type.replace('_', ' ')}</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-xs ${getJudgementColor(station.global_judgement)}`}>
                        {station.global_judgement}
                      </span>
                    </td>
                    <td className="border p-2 font-semibold">{station.weighted_percentage}%</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        station.pass_fail === 'PASS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {station.pass_fail}
                      </span>
                    </td>
                    <td className="border p-2 text-sm text-gray-600">
                      {new Date(station.completed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final Result */}
        {progress.stations_completed.length >= 16 && (
          <div className={`p-6 rounded-lg border-2 ${getStatusColor()}`}>
            <h3 className="text-2xl font-bold mb-2">Final CASC Result</h3>
            <p className="text-lg">
              {progress.overall_status === 'passed' && 
                `🎉 Congratulations! You passed the CASC with ${progress.stations_passed}/16 stations.`}
              {progress.overall_status === 'failed' && 
                `Unfortunately, you did not pass this time. You passed ${progress.stations_passed}/16 stations (required: 12).`}
              {progress.overall_status === 'review_required' && 
                `⚠️ Review Required: You have ${progress.severe_fails} severe fail(s). Your performance will be reviewed.`}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={onRestart}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
          >
            Continue Practicing
          </button>
        </div>
      </div>
    </div>
  );
}