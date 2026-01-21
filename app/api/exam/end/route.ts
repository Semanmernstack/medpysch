
// import { NextResponse } from 'next/server';
// import { getSession, updateSession, deleteSession } from '@/app/lib/session-manager';
// import { ExaminerAgent } from '@/app/lib/ai/examiner-agent';

// export const dynamic = 'force-dynamic';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { session_id } = body;

//     console.log('🏁 Ending exam for session:', session_id);

//     // Get session from Redis
//     const session = await getSession(session_id);

//     if (!session) {
//       return NextResponse.json(
//         { error: 'Session not found' },
//         { status: 404 }
//       );
//     }

//     // Calculate elapsed time
//     const startTime = new Date(session.start_time).getTime();
//     const endTime = new Date().getTime();
//     const elapsedSeconds = (endTime - startTime) / 1000;

//     console.log('⏱️ Exam duration:', Math.round(elapsedSeconds / 60), 'minutes');

//     // Calculate cumulative communication metrics from tone_history
//     const communicationAnalysis = calculateCommunicationMetrics(session.tone_history || []);
//     console.log('📊 Communication analysis:', communicationAnalysis);

//     // Generate evaluation (pass communication analysis to examiner)
//     console.log('📝 Generating evaluation...');
//     const examiner = new ExaminerAgent(session.case_data);
//     const evaluation = await examiner.generateEvaluation(
//       session.conversation,
//       elapsedSeconds,
//       communicationAnalysis ,
//     );

//     console.log('✅ Evaluation complete');

//     // Mark session as completed
//     session.status = 'completed';
//     session.end_time = new Date().toISOString();
//     session.evaluation = evaluation;

//     // Update session in Redis (or delete it)
//     await updateSession(session_id, session);
    
//     // Optionally delete session after completion
//     // await deleteSession(session_id);

//     return NextResponse.json({
//       evaluation,
//       elapsed_seconds: elapsedSeconds,
//       conversation: session.conversation,
//     });
//   } catch (error: any) {
//     console.error('❌ Error ending exam:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to end exam' },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * Calculate cumulative communication metrics from tone history
//  */
// function calculateCommunicationMetrics(toneHistory: any[]) {
//   if (!toneHistory || toneHistory.length === 0) {
//     return {
//       average_empathy: 'medium',
//       average_tone_score: 7,
//       total_questions: 0,
//       common_issues: [],
//       strengths: [],
//     };
//   }

//   // Calculate average empathy
//   const empathyLevels = toneHistory.map(t => t.empathy_level || 'medium');
//   const empathyCounts: any = {};
//   empathyLevels.forEach(level => {
//     empathyCounts[level] = (empathyCounts[level] || 0) + 1;
//   });
//   const mostCommonEmpathy = Object.keys(empathyCounts).reduce((a, b) => 
//     empathyCounts[a] > empathyCounts[b] ? a : b
//   );

//   // Calculate average communication score
//   const commScores = toneHistory
//     .map(t => t.communication_score)
//     .filter(score => typeof score === 'number');
//   const avgCommScore = commScores.length > 0
//     ? Math.round(commScores.reduce((a, b) => a + b, 0) / commScores.length)
//     : 7;

//   // Collect all concerns/issues
//   const allConcerns: string[] = [];
//   toneHistory.forEach(t => {
//     if (t.concerns && Array.isArray(t.concerns)) {
//       allConcerns.push(...t.concerns);
//     }
//   });

//   // Find most common issues (appearing 2+ times)
//   const concernCounts: any = {};
//   allConcerns.forEach(concern => {
//     concernCounts[concern] = (concernCounts[concern] || 0) + 1;
//   });
//   const commonIssues = Object.entries(concernCounts)
//     .filter(([_, count]) => (count as number) >= 2)
//     .map(([concern, _]) => concern)
//     .slice(0, 3);

//   // Identify strengths
//   const strengths: string[] = [];
//   const highEmpathyCount = empathyLevels.filter(e => e === 'high').length;
//   const totalQuestions = toneHistory.length;
  
//   if (highEmpathyCount / totalQuestions > 0.6) {
//     strengths.push('Consistently demonstrated high empathy');
//   }
//   if (avgCommScore >= 8) {
//     strengths.push('Excellent overall communication score');
//   }
//   if (commonIssues.length === 0) {
//     strengths.push('No repeated communication concerns');
//   }

//   // Collect positive aspects mentioned
//   const allPositives: string[] = [];
//   toneHistory.forEach(t => {
//     if (t.positive_aspects && Array.isArray(t.positive_aspects)) {
//       allPositives.push(...t.positive_aspects);
//     }
//   });
//   if (allPositives.length > totalQuestions * 0.5) {
//     strengths.push('Demonstrated many positive communication techniques');
//   }

//   return {
//     average_empathy: mostCommonEmpathy,
//     average_tone_score: avgCommScore,
//     total_questions: totalQuestions,
//     common_issues: commonIssues,
//     strengths,
//   };
// }
import { NextResponse } from 'next/server';
import { getSession, updateSession, addStationResult } from '@/app/lib/session-manager';
import { ExaminerAgent } from '@/app/lib/ai/examiner-agent';
import type { StationResult } from '@/app/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, user_id } = body;

    console.log('🏁 Ending exam for session:', session_id);

    const session = await getSession(session_id);
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Calculate elapsed time
    const startTime = new Date(session.start_time).getTime();
    const endTime = new Date().getTime();
    const elapsedSeconds = (endTime - startTime) / 1000;

    console.log('⏱️ Exam duration:', Math.round(elapsedSeconds / 60), 'minutes');

    // Calculate cumulative communication metrics
    const communicationAnalysis = calculateCommunicationMetrics(session.tone_history || []);
    console.log('📊 Communication analysis:', communicationAnalysis);

    // Generate CASC evaluation
    console.log('📝 Generating CASC evaluation...');
    const examiner = new ExaminerAgent(session.case_data);
    const evaluation = await examiner.generateEvaluation(
      session.conversation,
      elapsedSeconds,
      communicationAnalysis
    );

    console.log('✅ Evaluation complete:', evaluation.global_judgement);

    // Mark session as completed
    session.status = 'completed';
    session.end_time = new Date().toISOString();
    session.evaluation = evaluation;
    await updateSession(session_id, session);

    // Add to CASC progress tracking (if user_id provided)
    if (user_id) {
      const stationResult: StationResult = {
        station_number: 0, // Will be auto-assigned based on progress
        session_number: session.case_data.session_number || 1,
        case_id: session.case_id,
        specialty: session.case_data.specialty,
        station_type: session.case_data.station_type,
        global_judgement: evaluation.global_judgement,
        pass_fail: evaluation.pass_fail,
        weighted_percentage: evaluation.weighted_percentage,
        completed_at: new Date().toISOString(),
        evaluation,
      };

      try {
        const progress = await addStationResult(user_id, stationResult);
        console.log(`✅ Progress updated: ${progress.stations_completed.length}/16 stations`);
        
        return NextResponse.json({
          evaluation,
          elapsed_seconds: elapsedSeconds,
          conversation: session.conversation,
          casc_progress: progress, // Include progress in response
        });
      } catch (progressError) {
        console.error('⚠️ Failed to update progress:', progressError);
        // Continue without progress tracking
      }
    }

    return NextResponse.json({
      evaluation,
      elapsed_seconds: elapsedSeconds,
      conversation: session.conversation,
    });
  } catch (error: any) {
    console.error('❌ Error ending exam:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Calculate cumulative communication metrics from tone history
 */
function calculateCommunicationMetrics(toneHistory: any[]) {
  if (!toneHistory || toneHistory.length === 0) {
    return {
      average_empathy: 'medium',
      average_tone_score: 7,
      total_questions: 0,
      common_issues: [],
      strengths: [],
      formulaic_count: 0,
      open_questions: 0,
      closed_questions: 0,
    };
  }

  // Average empathy
  const empathyLevels = toneHistory.map(t => t.empathy_level || 'medium');
  const empathyCounts: any = {};
  empathyLevels.forEach(level => {
    empathyCounts[level] = (empathyCounts[level] || 0) + 1;
  });
  const mostCommonEmpathy = Object.keys(empathyCounts).reduce((a, b) => 
    empathyCounts[a] > empathyCounts[b] ? a : b
  );

  // Average communication score
  const scores = toneHistory
    .map(t => t.communication_score)
    .filter(s => typeof s === 'number');
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 7;

  // Common issues
  const allConcerns: string[] = [];
  toneHistory.forEach(t => {
    if (t.concerns && Array.isArray(t.concerns)) {
      allConcerns.push(...t.concerns);
    }
  });

  const concernCounts: any = {};
  allConcerns.forEach(concern => {
    concernCounts[concern] = (concernCounts[concern] || 0) + 1;
  });
  const commonIssues = Object.entries(concernCounts)
    .filter(([_, count]) => (count as number) >= 2)
    .map(([concern, _]) => concern)
    .slice(0, 3);

  // Count formulaic, open/closed questions
  const formulaicCount = toneHistory.filter(t => t.formulaic_detected === true).length;
  const openCount = toneHistory.filter(t => t.question_type === 'open').length;
  const closedCount = toneHistory.filter(t => t.question_type === 'closed').length;

  // Strengths
  const strengths: string[] = [];
  const totalQuestions = toneHistory.length;
  const highEmpathyCount = empathyLevels.filter(e => e === 'high').length;
  
  if (highEmpathyCount / totalQuestions > 0.6) {
    strengths.push('Consistently high empathy');
  }
  if (avgScore >= 8) {
    strengths.push('Excellent communication score');
  }
  if (formulaicCount === 0) {
    strengths.push('Avoided formulaic responses');
  }
  if (openCount > closedCount) {
    strengths.push('Good use of open questions');
  }
  if (commonIssues.length === 0) {
    strengths.push('No repeated concerns');
  }

  const respondedToCues = toneHistory.filter(t => t.responds_to_cues === true).length;
  if (respondedToCues / totalQuestions > 0.7) {
    strengths.push('Good cue recognition');
  }

  return {
    average_empathy: mostCommonEmpathy,
    average_tone_score: avgScore,
    total_questions: totalQuestions,
    common_issues: commonIssues,
    strengths,
    formulaic_count: formulaicCount,
    open_questions: openCount,
    closed_questions: closedCount,
  };
}