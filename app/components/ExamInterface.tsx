

// // 
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { Timer } from './Timer';
// import { PatientAvatar } from './PatientAvatar';
// import { Message } from '../lib/types';
// import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

// import { SpeechToText } from '../lib/voice/speech-to-text';
// import { TextToSpeech } from '../lib/voice/text-to-speech';

// interface ExamInterfaceProps {
//   sessionData: any;
//   onExamComplete: (evaluation: any) => void;
// }

// export function ExamInterface({ sessionData, onExamComplete }: ExamInterfaceProps) {
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

//   // Initialize voice services
//   useEffect(() => {
//     speechToTextRef.current = new SpeechToText();
//     textToSpeechRef.current = new TextToSpeech();

//     // Speak initial patient message
//     if (useTTS && textToSpeechRef.current?.isSupported()) {
//       setTimeout(() => {
//         const emotionalState = sessionData.patient_profile?.emotional_state || 'calm';
//         textToSpeechRef.current?.speakWithEmotion(
//           sessionData.initial_message || 'Hello doctor...',
//           emotionalState
//         );
//       }, 500);
//     }

//     return () => {
//       textToSpeechRef.current?.stop();
//       speechToTextRef.current?.stopListening();
//     };
//   }, []);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Text-to-speech for patient responses
//   useEffect(() => {
//     if (useTTS && textToSpeechRef.current?.isSupported()) {
//       const lastMessage = messages[messages.length - 1];
//       if (lastMessage.role === 'patient' && lastMessage.id !== '1') {
//         const emotionalState = sessionData.patient_profile?.emotional_state || 'calm';
//         textToSpeechRef.current.speakWithEmotion(
//           lastMessage.content,
//           emotionalState
//         );
//       }
//     }
//   }, [messages, useTTS]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeRemaining <= 0) {
//       setIsTimeout(true);
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeRemaining((prev: any) => Math.max(0, prev - 1));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeRemaining]);

//   // Voice input handlers
//   const handleStartListening = () => {
//     if (!speechToTextRef.current?.isSupported()) {
//       alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
//       return;
//     }

//     setIsListening(true);
//     setCurrentTranscript('');

//     speechToTextRef.current.startListening(
//       (transcript) => {
//         setCurrentTranscript(transcript);
//         setIsListening(false);
//         // Auto-send after getting transcript
//         setTimeout(() => {
//           handleSendMessage(transcript);
//         }, 500);
//       },
//       () => {
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

//       // NO TONE FEEDBACK SHOWN TO USER - data is collected silently in backend

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
//     setIsEnding(true);

//     try {
//       const response = await fetch('/api/exam/end', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ session_id: sessionData.session_id }),
//       });

//       const data = await response.json();
      
//       if (data.evaluation) {
//         onExamComplete(data.evaluation);
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
//                 <strong>Your voice:</strong> "{currentTranscript}"
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
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
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
//                   Click "End Examination" to see your results.
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
//                     {isListening ? '🎤 Listening... Speak now' : '🎤 Click microphone to speak'}
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     {isListening
//                       ? 'Your voice is being recorded'
//                       : 'Press the button and speak naturally to the patient'}
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* NO ToneIndicator component here - feedback hidden during exam */}
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
  userId: string; // ← ADDED
  onExamComplete: (evaluation: Evaluation, progress?: CASCProgress) => void; // ← UPDATED
}

export function ExamInterface({ sessionData, userId, onExamComplete }: ExamInterfaceProps) {
  // Safety check - ensure session data is valid
  if (!sessionData?.patient_profile) {
    return (
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-semibold">❌ Session data not loaded</p>
          <p className="text-red-700 text-sm mt-2">Please start a new examination.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
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

  // Initialize voice services
  useEffect(() => {
    speechToTextRef.current = new SpeechToText();
    textToSpeechRef.current = new TextToSpeech();

    // Speak initial patient message
    if (useTTS && textToSpeechRef.current?.isSupported()) {
      setTimeout(() => {
        const emotionalState = sessionData.patient_profile?.emotional_state || 'calm';
        textToSpeechRef.current?.speakWithEmotion(
          sessionData.initial_message || 'Hello doctor...',
          emotionalState
        );
      }, 500);
    }

    return () => {
      textToSpeechRef.current?.stop();
      speechToTextRef.current?.stopListening();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Text-to-speech for patient responses
  useEffect(() => {
    if (useTTS && textToSpeechRef.current?.isSupported()) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'patient' && lastMessage.id !== '1') {
        const emotionalState = sessionData.patient_profile?.emotional_state || 'calm';
        textToSpeechRef.current.speakWithEmotion(
          lastMessage.content,
          emotionalState
        );
      }
    }
  }, [messages, useTTS]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0) {
      setIsTimeout(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev: number) => Math.max(0, Math.floor(prev - 1)));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Voice input handlers
  const handleStartListening = () => {
    if (!speechToTextRef.current?.isSupported()) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    setIsListening(true);
    setCurrentTranscript('');

    speechToTextRef.current.startListening(
      (transcript) => {
        setCurrentTranscript(transcript);
        setIsListening(false);
        // Auto-send after getting transcript
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 500);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  const handleStopListening = () => {
    speechToTextRef.current?.stopListening();
    setIsListening(false);
  };

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isSending || isTimeout) return;

    setCurrentTranscript('');
    setIsSending(true);

    // Stop any ongoing speech
    textToSpeechRef.current?.stop();

    // Add doctor's message
    const newDoctorMessage: Message = {
      id: Date.now().toString(),
      role: 'doctor',
      content: messageText,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newDoctorMessage]);

    try {
      // Send to backend
      const response = await fetch('/api/exam/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionData.session_id,
          message: messageText,
        }),
      });

      const data = await response.json();

      if (data.status === 'timeout') {
        setIsTimeout(true);
        return;
      }

      // Check for errors
      if (data.error) {
        console.error('API Error:', data.error);
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'patient',
          content: "I apologize, I'm having trouble responding right now.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      // NO TONE FEEDBACK SHOWN TO USER - data is collected silently in backend

      // Add patient's response
      const patientMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'patient',
        content: data.response || "I'm not sure how to respond...",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, patientMessage]);

      // Update remaining time
      if (data.remaining_seconds !== undefined) {
        setTimeRemaining(data.remaining_seconds);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'patient',
        content: "I apologize, I'm having trouble responding right now.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsSending(false);
    }
  };

  const handleEndExam = async () => {
    if (!window.confirm('Are you sure you want to end the examination?')) {
      return;
    }

    textToSpeechRef.current?.stop();
    speechToTextRef.current?.stopListening();
    setIsEnding(true);

    try {
      const response = await fetch('/api/exam/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          session_id: sessionData.session_id,
          user_id: userId // ← ADDED: Pass userId to track progress
        }),
      });

      const data = await response.json();
      
      if (data.evaluation) {
        // Pass both evaluation and CASC progress (if available)
        onExamComplete(data.evaluation, data.casc_progress);
      } else {
        throw new Error('No evaluation received');
      }
    } catch (error) {
      console.error('Error ending exam:', error);
      alert('Failed to end exam. Please try again.');
      setIsEnding(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <PatientAvatar emotionalState={sessionData.patient_profile?.emotional_state || 'calm'} />
                <div>
                  <h2 className="text-2xl font-bold mb-1">🎤 Voice Examination in Progress</h2>
                  <p className="text-indigo-100">
                    {sessionData.specialty || 'Medical'} • Case {sessionData.case_id || 'N/A'}
                  </p>
                  <p className="text-sm text-indigo-200 mt-1">
                    Patient: {sessionData.patient_profile?.name || 'Patient'},{' '}
                    {sessionData.patient_profile?.age || 'N/A'} years old
                  </p>
                </div>
              </div>
              <Timer timeRemaining={timeRemaining} isTimeout={isTimeout} />
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gray-50 px-6 py-3 border-b flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setUseTTS(!useTTS)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                {useTTS ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-sm">Voice {useTTS ? 'On' : 'Off'}</span>
              </button>

              {isListening && (
                <div className="flex items-center gap-2 text-red-600 animate-pulse">
                  <div className="w-2 h-2 bg-red-600 rounded-full" />
                  <span className="text-sm font-medium">Listening...</span>
                </div>
              )}
            </div>

            <button
              onClick={handleEndExam}
              disabled={isEnding}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 font-medium"
            >
              {isEnding ? 'Ending...' : 'End Examination'}
            </button>
          </div>

          {/* Transcript Display */}
          {currentTranscript && (
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
              <p className="text-sm text-blue-800">
                <strong>Your voice:</strong> "{currentTranscript}"
              </p>
            </div>
          )}

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'doctor' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-4 ${
                    message.role === 'doctor'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-900 shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {message.role === 'doctor' 
                        ? '👨‍⚕️ You' 
                        : '🤒 ' + (sessionData.patient_profile?.name || 'Patient')}
                    </span>
                    <span className="text-xs opacity-70">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="bg-white rounded-lg p-4 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    <span className="ml-2 text-sm text-gray-600">Patient is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Area */}
          <div className="border-t p-6 bg-white">
            {isTimeout ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                <p className="text-yellow-800 font-semibold">⏰ Time limit reached!</p>
                <p className="text-yellow-700 text-sm mt-1">
                  Click "End Examination" to see your results.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                {/* Large Microphone Button */}
                <button
                  onClick={isListening ? handleStopListening : handleStartListening}
                  disabled={isSending || isTimeout}
                  className={`w-24 h-24 rounded-full transition-all flex items-center justify-center shadow-lg ${
                    isListening
                      ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                      : 'bg-green-600 hover:bg-green-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isListening ? (
                    <MicOff className="w-12 h-12 text-white" />
                  ) : (
                    <Mic className="w-12 h-12 text-white" />
                  )}
                </button>

                {/* Instruction */}
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    {isListening ? '🎤 Listening... Speak now' : '🎤 Click microphone to speak'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {isListening
                      ? 'Your voice is being recorded'
                      : 'Press the button and speak naturally to the patient'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NO ToneIndicator component here - feedback hidden during exam */}
    </>
  );
}