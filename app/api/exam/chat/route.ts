

// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { getSession, updateSession } from '@/app/lib/session-manager';
// import { ExaminerAgent } from '@/app/lib/ai/examiner-agent';
// import { PatientAgent } from '@/app/lib/ai/patient-agent';
// import { Message } from '@/app/lib/types';

// export const dynamic = 'force-dynamic';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { session_id, message } = body;

//     // Get session from Redis
//     const session = await getSession(session_id);

//     if (!session) {
//       return NextResponse.json(
//         { error: 'Session not found' },
//         { status: 404 }
//       );
//     }

//     if (session.status !== 'active') {
//       return NextResponse.json(
//         { error: 'Session is not active' },
//         { status: 400 }
//       );
//     }

//     // Check time limit (7 minutes = 420 seconds)
//     const startTime = new Date(session.start_time).getTime();
//     const currentTime = new Date().getTime();
//     const elapsed = (currentTime - startTime) / 1000;

//     if (elapsed > 420) {
//       session.status = 'timeout';
//       await updateSession(session_id, session);
      
//       return NextResponse.json({
//         response: 'Time limit exceeded. Examination has ended.',
//         status: 'timeout',
//         elapsed_seconds: elapsed,
//       });
//     }

//     // Get last patient message for context
//     let patientContext = '';
//     for (let i = session.conversation.length - 1; i >= 0; i--) {
//       if (session.conversation[i].role === 'patient') {
//         patientContext = session.conversation[i].content;
//         break;
//       }
//     }

//     console.log('💬 Doctor said:', message);

//     // Analyze doctor's tone (REAL-TIME)
//     const examiner = new ExaminerAgent(session.case_data);
//     const toneAnalysis = await examiner.analyzeDoctorTone(
//       message,
//       patientContext
//     );

//     // Add doctor's message
//     const doctorMsg: Message = {
//       id: uuidv4(),
//       role: 'doctor',
//       content: message,
//       timestamp: new Date().toISOString(),
//       tone_analysis: toneAnalysis,
//     };
//     session.conversation.push(doctorMsg);

//     // Generate patient response
//     console.log('🤖 Generating patient response...');
//     const patientAgent = new PatientAgent(session.case_data);
//     const patientResponse = await patientAgent.respond(
//       message,
//       session.conversation
//     );

//     // Extract the response text
//     const responseText = typeof patientResponse === 'string' 
//       ? patientResponse 
//       : patientResponse.response;

//     console.log('🤒 Patient says:', responseText);

//     // Add patient response
//     const patientMsg: Message = {
//       id: uuidv4(),
//       role: 'patient',
//       content: responseText,
//       timestamp: new Date().toISOString(),
//     };
//     session.conversation.push(patientMsg);

//     // Update session in Redis
//     await updateSession(session_id, session);

//     return NextResponse.json({
//       response: responseText,
//       status: 'active',
//       elapsed_seconds: elapsed,
//       remaining_seconds: Math.max(0, 420 - elapsed),
//       tone_analysis: {
//         empathy_level: toneAnalysis.empathy_level,
//         tone: toneAnalysis.tone,
//         communication_score: toneAnalysis.communication_score,
//         concerns: toneAnalysis.concerns,
//       },
//     });
//   } catch (error: any) {
//     console.error('❌ Chat error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to process message' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getSession, updateSession } from '@/app/lib/session-manager';
import { ExaminerAgent } from '@/app/lib/ai/examiner-agent';
import { PatientAgent } from '@/app/lib/ai/patient-agent';
import { Message } from '@/app/lib/types';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { session_id, message } = body;

    // Get session from Redis
    const session = await getSession(session_id);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    if (session.status !== 'active') {
      return NextResponse.json(
        { error: 'Session is not active' },
        { status: 400 }
      );
    }

    // Check time limit (7 minutes = 420 seconds)
    const startTime = new Date(session.start_time).getTime();
    const currentTime = new Date().getTime();
    const elapsed = (currentTime - startTime) / 1000;

    if (elapsed > 420) {
      session.status = 'timeout';
      await updateSession(session_id, session);
      
      return NextResponse.json({
        response: 'Time limit exceeded. Examination has ended.',
        status: 'timeout',
        elapsed_seconds: elapsed,
      });
    }

    // Get last patient message for context
    let patientContext = '';
    for (let i = session.conversation.length - 1; i >= 0; i--) {
      if (session.conversation[i].role === 'patient') {
        patientContext = session.conversation[i].content;
        break;
      }
    }

    console.log('💬 Doctor said:', message);

    // Analyze doctor's tone (SILENTLY - not returned to frontend)
    const examiner = new ExaminerAgent(session.case_data);
    const toneAnalysis = await examiner.analyzeDoctorTone(
      message,
      patientContext
    );

    console.log('🎯 Tone analysis (stored silently):', toneAnalysis);

    // Store tone analysis in session history (NEW)
    if (!session.tone_history) {
      session.tone_history = [];
    }
    session.tone_history.push({
      ...toneAnalysis,
      question: message,
      timestamp: new Date().toISOString(),
    });

    // Add doctor's message (WITHOUT tone_analysis in the message)
    const doctorMsg: Message = {
      id: uuidv4(),
      role: 'doctor',
      content: message,
      timestamp: new Date().toISOString(),
      // tone_analysis removed - don't store it in message
    };
    session.conversation.push(doctorMsg);

    // Generate patient response
    console.log('🤖 Generating patient response...');
    const patientAgent = new PatientAgent(session.case_data);
    const patientResponse = await patientAgent.respond(
      message,
      session.conversation
    );

    // Extract the response text
    const responseText = typeof patientResponse === 'string' 
      ? patientResponse 
      : patientResponse.response;

    console.log('🤒 Patient says:', responseText);

    // Add patient response
    const patientMsg: Message = {
      id: uuidv4(),
      role: 'patient',
      content: responseText,
      timestamp: new Date().toISOString(),
    };
    session.conversation.push(patientMsg);

    // Update session in Redis
    await updateSession(session_id, session);

    // Return response WITHOUT tone_analysis (hidden during exam)
    return NextResponse.json({
      response: responseText,
      status: 'active',
      elapsed_seconds: elapsed,
      remaining_seconds: Math.max(0, 420 - elapsed),
      // NO tone_analysis field - feedback completely hidden
    });
  } catch (error: any) {
    console.error('❌ Chat error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to process message' },
      { status: 500 }
    );
  }
}