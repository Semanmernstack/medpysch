
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { Timer } from './Timer';
// import { PatientAvatar } from './PatientAvatar';
// import { Message, Evaluation, CASCProgress } from '../lib/types';
// import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// import { SpeechToText } from '../lib/voice/speech-to-text';
// import { TextToSpeech } from '../lib/voice/text-to-speech';

// interface ExamInterfaceProps {
//   sessionData: any;
//   userId: string;
//   onExamComplete: (evaluation: Evaluation, progress?: CASCProgress) => void;
// }

// export function ExamInterface({ sessionData, userId, onExamComplete }: ExamInterfaceProps) {
//   // Safety check - ensure session data is valid
//   if (!sessionData?.patient_profile) {
//     return (
//       <div className="max-w-5xl mx-auto p-8">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
//           <p className="text-red-800 font-semibold">❌ Session data not loaded</p>
//           <p className="text-red-700 text-sm mt-2">Please start a new examination.</p>
//           <button
//             onClick={() => window.location.href = '/'}
//             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Return to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       role: 'patient',
//       content: sessionData.initial_message || 'Hello doctor...',
//       timestamp: new Date().toISOString(),
//     },
//   ]);
//   const [isSending, setIsSending] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useState(sessionData.time_limit_seconds || 420);
//   const [isTimeout, setIsTimeout] = useState(false);
//   const [useTTS, setUseTTS] = useState(true);
//   const [isEnding, setIsEnding] = useState(false);

//   // Voice-specific states
//   const [isListening, setIsListening] = useState(false);
//   const [currentTranscript, setCurrentTranscript] = useState('');

//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const speechToTextRef = useRef<SpeechToText | null>(null);
//   const textToSpeechRef = useRef<TextToSpeech | null>(null);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const hasSpokenInitialMessage = useRef(false); // ✅ NEW: Track if initial message was spoken

//   // Initialize voice services
//   useEffect(() => {
//     speechToTextRef.current = new SpeechToText();
//     textToSpeechRef.current = new TextToSpeech();

//     // ✅ Speak initial patient message ONLY ONCE
//     if (useTTS && textToSpeechRef.current?.isSupported() && !hasSpokenInitialMessage.current) {
//       hasSpokenInitialMessage.current = true; // ✅ Mark as spoken
      
//       setTimeout(() => {
//         const emotionalState = sessionData.patient_profile?.emotional_state || 'calm';
//         const patientProfile = {
//           age: sessionData.patient_profile?.age || 30,
//           gender: sessionData.patient_profile?.gender || 'female',
//           name: sessionData.patient_profile?.name || 'Patient'
//         };
        
//         textToSpeechRef.current?.speakWithEmotion(
//           sessionData.initial_message || 'Hello doctor...',
//           emotionalState,
//           patientProfile
//         );
//       }, 500);
//     }

//     return () => {
//       textToSpeechRef.current?.stop();
//       speechToTextRef.current?.stopListening();
//       if (timerRef.current) clearInterval(timerRef.current);
//     };
//   }, []); // ✅ Empty dependency array - run only once

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // ✅ Text-to-speech for NEW patient responses only (not initial message)
//   useEffect(() => {
//     if (useTTS && textToSpeechRef.current?.isSupported()) {
//       const lastMessage = messages[messages.length - 1];
      
//       // ✅ Skip initial message (id '1') to prevent echo
//       if (lastMessage.role === 'patient' && lastMessage.id !== '1') {
//         const emotionalState = sessionData.patient_profile?.emotional_state || 'calm';
        
//         // Pass patient profile for proper voice selection
//         const patientProfile = {
//           age: sessionData.patient_profile?.age || 30,
//           gender: sessionData.patient_profile?.gender || 'female',
//           name: sessionData.patient_profile?.name || 'Patient'
//         };
        
//         textToSpeechRef.current.speakWithEmotion(
//           lastMessage.content,
//           emotionalState,
//           patientProfile
//         );
//       }
//     }
//   }, [messages, useTTS]); // ✅ Removed sessionData.patient_profile from dependencies

//   // Timer countdown
//   useEffect(() => {
//     if (timeRemaining <= 0) {
//       setIsTimeout(true);
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//       return;
//     }

//     timerRef.current = setInterval(() => {
//       setTimeRemaining((prev: number) => {
//         const newTime = Math.max(0, prev - 1);
//         if (newTime <= 0) {
//           setIsTimeout(true);
//           if (timerRef.current) {
//             clearInterval(timerRef.current);
//             timerRef.current = null;
//           }
//         }
//         return newTime;
//       });
//     }, 1000);

//     return () => {
//       if (timerRef.current) {
//         clearInterval(timerRef.current);
//         timerRef.current = null;
//       }
//     };
//   }, [timeRemaining]);

//   // Voice input handlers with AUTOMATIC send
//   const handleStartListening = () => {
//     if (!speechToTextRef.current?.isSupported()) {
//       alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
//       return;
//     }

//     setIsListening(true);
//     setCurrentTranscript('');

//     speechToTextRef.current.startListening(
//       (transcript) => {
//         // This callback is triggered when silence timer (1500ms) completes
//         setCurrentTranscript(transcript);
//         setIsListening(false);
        
//         // Auto-send after getting final transcript
//         if (transcript.trim()) {
//           handleSendMessage(transcript);
//         }
//       },
//       () => {
//         // Called when listening ends
//         setIsListening(false);
//       }
//     );
//   };

//   const handleStopListening = () => {
//     speechToTextRef.current?.stopListening();
//     setIsListening(false);
//   };

//   const handleSendMessage = async (messageText: string) => {
//     if (!messageText.trim() || isSending || isTimeout) return;

//     setCurrentTranscript('');
//     setIsSending(true);

//     // Stop any ongoing speech
//     textToSpeechRef.current?.stop();

//     // Add doctor's message
//     const newDoctorMessage: Message = {
//       id: Date.now().toString(),
//       role: 'doctor',
//       content: messageText,
//       timestamp: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, newDoctorMessage]);

//     try {
//       // Send to backend
//       const response = await fetch('/api/exam/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           session_id: sessionData.session_id,
//           message: messageText,
//         }),
//       });

//       const data = await response.json();

//       if (data.status === 'timeout') {
//         setIsTimeout(true);
//         return;
//       }

//       // Check for errors
//       if (data.error) {
//         console.error('API Error:', data.error);
//         const errorMessage: Message = {
//           id: (Date.now() + 1).toString(),
//           role: 'patient',
//           content: "I apologize, I'm having trouble responding right now.",
//           timestamp: new Date().toISOString(),
//         };
//         setMessages((prev) => [...prev, errorMessage]);
//         return;
//       }

//       // Add patient's response
//       const patientMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: 'patient',
//         content: data.response || "I'm not sure how to respond...",
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, patientMessage]);

//       // Update remaining time
//       if (data.remaining_seconds !== undefined) {
//         setTimeRemaining(data.remaining_seconds);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         role: 'patient',
//         content: "I apologize, I'm having trouble responding right now.",
//         timestamp: new Date().toISOString(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleEndExam = async () => {
//     if (!window.confirm('Are you sure you want to end the examination?')) {
//       return;
//     }

//     textToSpeechRef.current?.stop();
//     speechToTextRef.current?.stopListening();
//     if (timerRef.current) {
//       clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//     setIsEnding(true);

//     try {
//       const response = await fetch('/api/exam/end', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           session_id: sessionData.session_id,
//           user_id: userId
//         }),
//       });

//       const data = await response.json();
      
//       if (data.evaluation) {
//         onExamComplete(data.evaluation, data.casc_progress);
//       } else {
//         throw new Error('No evaluation received');
//       }
//     } catch (error) {
//       console.error('Error ending exam:', error);
//       alert('Failed to end exam. Please try again.');
//       setIsEnding(false);
//     }
//   };

//   return (
//     <>
//       <div className="max-w-5xl mx-auto">
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
//             <div className="flex justify-between items-start">
//               <div className="flex items-center gap-4">
//                 <PatientAvatar emotionalState={sessionData.patient_profile?.emotional_state || 'calm'} />
//                 <div>
//                   <h2 className="text-2xl font-bold mb-1">🎤 Voice Examination in Progress</h2>
//                   <p className="text-indigo-100">
//                     {sessionData.specialty || 'Medical'} • Case {sessionData.case_id || 'N/A'}
//                   </p>
//                   <p className="text-sm text-indigo-200 mt-1">
//                     Patient: {sessionData.patient_profile?.name || 'Patient'},{' '}
//                     {sessionData.patient_profile?.age || 'N/A'} years old
//                   </p>
//                 </div>
//               </div>
//               <Timer timeRemaining={timeRemaining} isTimeout={isTimeout} />
//             </div>
//           </div>

//           {/* Controls */}
//           <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setUseTTS(!useTTS)}
//                 className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//               >
//                 {useTTS ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
//                 <span className="text-sm">Voice {useTTS ? 'On' : 'Off'}</span>
//               </button>

//               {isListening && (
//                 <div className="flex items-center gap-2 text-red-600 animate-pulse">
//                   <div className="w-2 h-2 bg-red-600 rounded-full" />
//                   <span className="text-sm font-medium">Listening...</span>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={handleEndExam}
//               disabled={isEnding}
//               className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 font-medium"
//             >
//               {isEnding ? 'Ending...' : 'End Examination'}
//             </button>
//           </div>

//           {/* Transcript Display */}
//           {currentTranscript && (
//             <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
//               <p className="text-sm text-blue-800">
//                 <strong>Your voice:</strong> &quot;{currentTranscript}&quot;
//               </p>
//             </div>
//           )}

//           {/* Messages */}
//           <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${message.role === 'doctor' ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[75%] rounded-lg p-4 ${
//                     message.role === 'doctor'
//                       ? 'bg-indigo-600 text-white'
//                       : 'bg-white text-gray-900 shadow-md'
//                   }`}
//                 >
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="font-semibold text-sm">
//                       {message.role === 'doctor' 
//                         ? '👨‍⚕️ You' 
//                         : '🤒 ' + (sessionData.patient_profile?.name || 'Patient')}
//                     </span>
//                     <span className="text-xs opacity-70">
//                       {new Date(message.timestamp).toLocaleTimeString()}
//                     </span>
//                   </div>
//                   <p className="whitespace-pre-wrap">{message.content}</p>
//                 </div>
//               </div>
//             ))}

//             {isSending && (
//               <div className="flex justify-start">
//                 <div className="bg-white rounded-lg p-4 shadow-md">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
//                     <span className="ml-2 text-sm text-gray-600">Patient is thinking...</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Voice Input Area */}
//           <div className="border-t p-6 bg-white">
//             {isTimeout ? (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//                 <p className="text-yellow-800 font-semibold">⏰ Time limit reached!</p>
//                 <p className="text-yellow-700 text-sm mt-1">
//                   Click &quot;End Examination&quot; to see your results.
//                 </p>
//               </div>
//             ) : (
//               <div className="flex flex-col items-center gap-4">
//                 {/* Large Microphone Button */}
//                 <button
//                   onClick={isListening ? handleStopListening : handleStartListening}
//                   disabled={isSending || isTimeout}
//                   className={`w-24 h-24 rounded-full transition-all flex items-center justify-center shadow-lg ${
//                     isListening
//                       ? 'bg-red-600 hover:bg-red-700 animate-pulse'
//                       : 'bg-green-600 hover:bg-green-700'
//                   } disabled:opacity-50 disabled:cursor-not-allowed`}
//                 >
//                   {isListening ? (
//                     <MicOff className="w-12 h-12 text-white" />
//                   ) : (
//                     <Mic className="w-12 h-12 text-white" />
//                   )}
//                 </button>

//                 {/* Instruction */}
//                 <div className="text-center">
//                   <p className="text-lg font-semibold text-gray-800">
//                     {isListening ? '🎤 Listening... Speak naturally' : '🎤 Click microphone to speak'}
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {isListening
//                       ? 'Your message will send automatically after 1.5 seconds of silence'
//                       : 'Press the button and speak naturally to the patient'}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
'use client';

import { useState, useEffect, useRef } from 'react';
import { Timer } from './Timer';
import { PatientAvatar } from './PatientAvatar';
import { Message, Evaluation, CASCProgress } from '../lib/types';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

import { SpeechToText } from '../lib/voice/speech-to-text';
import { TextToSpeech } from '../lib/voice/text-to-speech';

interface ExamInterfaceProps {
  sessionData: any;
  userId: string;
  onExamComplete: (evaluation: Evaluation, progress?: CASCProgress) => void;
}

export function ExamInterface({ sessionData, userId, onExamComplete }: ExamInterfaceProps) {
  // Safety check
  if (!sessionData?.patient_profile) {
    return (
      <div className="max-w-5xl mx-auto p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 font-semibold">❌ Session data not loaded</p>
          <button onClick={() => window.location.href = '/'} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'patient',
      content: sessionData.initial_message || 'Hello doctor...',
      timestamp: new Date().toISOString(),
    },
  ]);
  
  const [isSending, setIsSending] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(sessionData.time_limit_seconds || 420);
  const [isTimeout, setIsTimeout] = useState(false);
  const [useTTS, setUseTTS] = useState(true);
  const [isEnding, setIsEnding] = useState(false);

  // Voice-specific states
  const [isListening, setIsListening] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechToTextRef = useRef<SpeechToText | null>(null);
  const textToSpeechRef = useRef<TextToSpeech | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const hasSpokenInitialMessage = useRef(false);

  useEffect(() => {
    speechToTextRef.current = new SpeechToText();
    textToSpeechRef.current = new TextToSpeech();

    if (useTTS && textToSpeechRef.current?.isSupported() && !hasSpokenInitialMessage.current) {
      hasSpokenInitialMessage.current = true;
      setTimeout(() => {
        textToSpeechRef.current?.speakWithEmotion(
          sessionData.initial_message || 'Hello doctor...',
          sessionData.patient_profile?.emotional_state || 'calm',
          sessionData.patient_profile
        );
      }, 500);
    }

    return () => {
      textToSpeechRef.current?.stop();
      speechToTextRef.current?.stopListening();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentTranscript]);

  useEffect(() => {
    if (useTTS && textToSpeechRef.current?.isSupported()) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'patient' && lastMessage.id !== '1') {
        textToSpeechRef.current.speakWithEmotion(
          lastMessage.content,
          sessionData.patient_profile?.emotional_state || 'calm',
          sessionData.patient_profile
        );
      }
    }
  }, [messages, useTTS]);

  // Timer logic
  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsTimeout(true);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev: any) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [timeRemaining]);

  // --- UPDATED VOICE HANDLERS (OPTION B: MANUAL TOGGLE) ---
  
  const handleToggleListening = () => {
    if (isListening) {
      // STOP SPEAKING
      speechToTextRef.current?.stopListening();
      setIsListening(false);
      
      // Send the accumulated text immediately
      if (currentTranscript.trim()) {
        handleSendMessage(currentTranscript.trim());
        setCurrentTranscript('');
      }
    } else {
      // START SPEAKING
      if (!speechToTextRef.current?.isSupported()) {
        alert('Speech recognition not supported in this browser.');
        return;
      }
      
      textToSpeechRef.current?.stop(); // Stop patient if they are talking
      setIsListening(true);
      setCurrentTranscript('');
      
      speechToTextRef.current.startListening((transcript) => {
        // Updates the state live so it appears in the chat UI
        setCurrentTranscript(transcript);
      });
    }
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isSending || isTimeout) return;

    setIsSending(true);
    const newDoctorMessage: Message = {
      id: Date.now().toString(),
      role: 'doctor',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newDoctorMessage]);

    try {
      const response = await fetch('/api/exam/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionData.session_id,
          message: messageText,
        }),
      });
      const data = await response.json();
      
      if (data.response) {
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'patient',
          content: data.response,
          timestamp: new Date().toISOString(),
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleEndExam = async () => {
    if (!window.confirm('End examination?')) return;
    setIsEnding(true);
    try {
      const response = await fetch('/api/exam/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionData.session_id, user_id: userId }),
      });
      const data = await response.json();
      if (data.evaluation) onExamComplete(data.evaluation, data.casc_progress);
    } catch (error) {
      setIsEnding(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
              <PatientAvatar emotionalState={sessionData.patient_profile?.emotional_state || 'calm'} />
              <div>
                <h2 className="text-2xl font-bold mb-1">🎤 Voice Examination</h2>
                <p className="text-sm text-indigo-100">Patient: {sessionData.patient_profile?.name}</p>
              </div>
            </div>
            <Timer timeRemaining={timeRemaining} isTimeout={isTimeout} />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
          <button onClick={() => setUseTTS(!useTTS)} className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-white">
            {useTTS ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-sm">Voice {useTTS ? 'On' : 'Off'}</span>
          </button>
          <button onClick={handleEndExam} disabled={isEnding} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            {isEnding ? 'Ending...' : 'End Examination'}
          </button>
        </div>

        {/* Message Area */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'doctor' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-lg p-4 ${message.role === 'doctor' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 shadow-md'}`}>
                <p className="text-xs opacity-70 mb-1 font-bold">{message.role === 'doctor' ? 'You' : sessionData.patient_profile?.name}</p>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {/* LIVE PREVIEW BUBBLE (Appears while you are speaking) */}
          {isListening && currentTranscript && (
            <div className="flex justify-end">
              <div className="max-w-[75%] rounded-lg p-4 bg-indigo-100 text-indigo-900 border-2 border-dashed border-indigo-300 animate-pulse">
                <p className="text-xs font-bold mb-1 text-indigo-600">Speaking...</p>
                <p>{currentTranscript}</p>
              </div>
            </div>
          )}

          {isSending && <div className="text-gray-500 text-sm animate-pulse">Patient is thinking...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Mic Control Area */}
        <div className="border-t p-8 bg-white">
          {!isTimeout ? (
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleToggleListening}
                disabled={isSending}
                className={`w-24 h-24 rounded-full transition-all flex items-center justify-center shadow-2xl ${
                  isListening ? 'bg-red-600 ring-8 ring-red-100 scale-110' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isListening ? <MicOff className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />}
              </button>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-800">
                  {isListening ? 'Tap STOP to Send' : 'Tap MIC to Speak'}
                </p>
                <p className="text-sm text-gray-500">
                  {isListening ? 'I am recording your voice now...' : 'Start your consultation when ready.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-red-600 font-bold">Exam Time Expired</div>
          )}
        </div>
      </div>
    </div>
  );
}
