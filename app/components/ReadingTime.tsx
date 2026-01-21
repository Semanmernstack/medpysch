'use client';

import { useState, useEffect } from 'react';
import { Clock, FileText, User, Stethoscope } from 'lucide-react';

interface ReadingTimeProps {
  sessionData: any;
  readingTimeSeconds: number; // 240 for Session 1, 90 for Session 2
  onReadingComplete: () => void;
}

export function ReadingTime({ sessionData, readingTimeSeconds, onReadingComplete }: ReadingTimeProps) {
  const [timeRemaining, setTimeRemaining] = useState(readingTimeSeconds);

  useEffect(() => {
    if (timeRemaining <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
        }
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isTimeUp = timeRemaining === 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-800 rounded-full mb-4">
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Reading Time</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Review the Case Information
          </h2>
          <p className="text-gray-600">
            You have {Math.floor(readingTimeSeconds / 60)} minute{readingTimeSeconds >= 120 ? 's' : ''} to read the case details
          </p>
        </div>

        {/* Timer */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-4">
            <Clock className={`w-8 h-8 ${isTimeUp ? 'text-red-600' : 'text-blue-600'}`} />
            <div className={`text-5xl font-mono font-bold ${isTimeUp ? 'text-red-600' : 'text-blue-600'}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>
          {isTimeUp && (
            <p className="text-center text-red-600 font-semibold mt-4">
              Reading time complete!
            </p>
          )}
        </div>

        {/* Case Information */}
        <div className="space-y-6 mb-8">
          {/* Station Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              Station Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Station Type:</span>
                <span className="ml-2 font-semibold capitalize">{sessionData.case_data.station_type.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-gray-600">Specialty:</span>
                <span className="ml-2 font-semibold">{sessionData.case_data.specialty}</span>
              </div>
              <div>
                <span className="text-gray-600">Difficulty:</span>
                <span className="ml-2 font-semibold">{sessionData.case_data.difficulty}</span>
              </div>
              <div>
                <span className="text-gray-600">Time Allowed:</span>
                <span className="ml-2 font-semibold">7 minutes</span>
              </div>
            </div>
          </div>

          {/* Patient Profile */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Patient Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-semibold">{sessionData.patient_profile.name}</span>
              </div>
              <div>
                <span className="text-gray-600">Age & Gender:</span>
                <span className="ml-2 font-semibold">{sessionData.patient_profile.age} years, {sessionData.patient_profile.gender}</span>
              </div>
              <div>
                <span className="text-gray-600">Occupation:</span>
                <span className="ml-2 font-semibold">{sessionData.patient_profile.occupation}</span>
              </div>
              <div className="pt-2">
                <span className="text-gray-600">Presenting Complaint:</span>
                <p className="mt-1 text-gray-800">{sessionData.patient_profile.presenting_complaint}</p>
              </div>
            </div>
          </div>

          {/* Task */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="font-bold text-blue-900 mb-2">Your Task:</h3>
            <p className="text-gray-800">
              {sessionData.case_data.station_type === 'history' && 
                'Take a comprehensive psychiatric history, exploring the presenting complaint and relevant background.'}
              {sessionData.case_data.station_type === 'management' && 
                'Discuss management options with the patient, including risks and benefits.'}
              {sessionData.case_data.station_type === 'examination' && 
                'Conduct a focused clinical examination as appropriate for this presentation.'}
              {sessionData.case_data.station_type === 'breaking_bad_news' && 
                'Break difficult news to the patient in a sensitive and supportive manner.'}
            </p>
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            onClick={onReadingComplete}
            disabled={!isTimeUp}
            className={`px-8 py-4 rounded-lg font-semibold text-lg transition ${
              isTimeUp
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isTimeUp ? 'Start Examination' : 'Please complete reading time'}
          </button>
          {!isTimeUp && (
            <p className="text-sm text-gray-500 mt-2">
              The exam will be available when reading time completes
            </p>
          )}
        </div>
      </div>
    </div>
  );
}