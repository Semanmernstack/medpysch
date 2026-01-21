// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';

// import { PatientAgent } from '@/app/lib/ai/patient-agent';


// import { medicalCases } from '@/app/lib/data/medical-cases';
// import { ExamSession, Message } from '@/app/lib/types';

// // In-memory session storage (use Redis in production)
// const activeSessions = new Map<string, ExamSession>();

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { case_id, specialty, difficulty } = body;

//     // Find case
//     let selectedCase = medicalCases.find((c) => c.case_id === case_id);

//     if (!selectedCase && specialty) {
//       const filteredCases = medicalCases.filter(
//         (c) => c.specialty === specialty
//       );
//       selectedCase =
//         filteredCases[Math.floor(Math.random() * filteredCases.length)];
//     }

//     if (!selectedCase) {
//       selectedCase = medicalCases[0];
//     }

//     // Create session
//     const sessionId = uuidv4();
//     const patientAgent = new PatientAgent(selectedCase);

//     // Get initial patient statement
//     const initialMessage = await patientAgent.getInitialStatement();

//     const initialMsg: Message = {
//       id: uuidv4(),
//       role: 'patient',
//       content: initialMessage,
//       timestamp: new Date().toISOString(),
//     };

//     const session: ExamSession = {
//       session_id: sessionId,
//       case_id: selectedCase.case_id,
//       case_data: selectedCase,
//       conversation: [initialMsg],
//       start_time: new Date().toISOString(),
//       status: 'active',
//     };

//     activeSessions.set(sessionId, session);

//     return NextResponse.json({
//       session_id: sessionId,
//       case_id: selectedCase.case_id,
//       specialty: selectedCase.specialty,
//       difficulty: selectedCase.difficulty,
//       patient_profile: selectedCase.patient_profile,
//       initial_message: initialMessage,
//       time_limit_seconds: 420,
//       status: 'started',
//     });
//   } catch (error: any) {
//     console.error('Start exam error:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to start exam' },
//       { status: 500 }
//     );
//   }
// }










// export  map { activeSessions };
// 
// import { NextResponse } from 'next/server';
// import { v4 as uuidv4 } from 'uuid';
// import { medicalCases } from '@/app/lib/data/medical-cases';
// import { PatientAgent } from '@/app/lib/ai/patient-agent';
// import { createSession } from '@/app/lib/session-manager';

// export const dynamic = 'force-dynamic';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { case_id } = body;

//     // Find the case
//     const caseData = medicalCases.find((c) => c.case_id === case_id);

//     if (!caseData) {
//       return NextResponse.json(
//         { error: 'Case not found' },
//         { status: 404 }
//       );
//     }

//     // Create session
//     const sessionId = uuidv4();
//     const patientAgent = new PatientAgent(caseData);
//     const initialMessage = await patientAgent.getInitialStatement();

//     const session = {
//       session_id: sessionId,
//       case_id: caseData.case_id,
//       case_data: caseData,
//       specialty: caseData.specialty,
//       patient_profile: caseData.patient_profile,
//       initial_message: initialMessage,
//       time_limit_seconds: 420, // 7 minutes
//       start_time: new Date().toISOString(),
//       conversation: [],
//       status: 'active',
//     };

//     // Store in Redis (replaces Map)
//     await createSession(sessionId, session);

//     return NextResponse.json(session);
//   } catch (error: any) {
//     console.error('Error starting exam:', error);
//     return NextResponse.json(
//       { error: error.message || 'Failed to start exam' },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { medicalCases } from '@/app/lib/data/medical-cases';
import { PatientAgent } from '@/app/lib/ai/patient-agent';
import { createSession } from '@/app/lib/session-manager';


export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { case_id } = body;

    // Find the case
    const caseData = medicalCases.find((c) => c.case_id === case_id);

    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }

    // Create session
    const sessionId = uuidv4();
    const patientAgent = new PatientAgent(caseData);
    const initialMessage = await patientAgent.getInitialStatement();

    const session = {
      session_id: sessionId,
      case_id: caseData.case_id,
      case_data: caseData,
      specialty: caseData.specialty,
      patient_profile: caseData.patient_profile,
      initial_message: initialMessage,
      time_limit_seconds: 420, // 7 minutes
      start_time: new Date().toISOString(),
      conversation: [],
      status: 'active',
    };

    // Store in Redis (replaces Map)
    await createSession(sessionId, session);

    return NextResponse.json(session);
  } catch (error: any) {
    console.error('Error starting exam:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to start exam' },
      { status: 500 }
    );
  }
}