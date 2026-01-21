'use client';

import { useState, useEffect } from 'react';
import { Stethoscope, Brain, Heart, AlertCircle } from 'lucide-react';

interface CaseSelectorProps {
  onCaseSelected: (data: any) => void;
}

export function CaseSelector({ onCaseSelected }: CaseSelectorProps) {
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      const response = await fetch('/api/cases');
      const data = await response.json();
      setCases(data.cases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartExam = async (caseId: string) => {
    setStarting(true);
    setSelectedCase(caseId);

    try {
      const response = await fetch('/api/exam/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ case_id: caseId }),
      });

      const data = await response.json();
      onCaseSelected(data);
    } catch (error) {
      console.error('Error starting exam:', error);
      alert('Failed to start exam. Please try again.');
      setStarting(false);
      setSelectedCase(null);
    }
  };

  const getSpecialtyIcon = (specialty: string) => {
    if (specialty.includes('Psychiatry')) return <Brain className="w-6 h-6" />;
    if (specialty.includes('Cardio')) return <Heart className="w-6 h-6" />;
    if (specialty.includes('Emergency')) return <AlertCircle className="w-6 h-6" />;
    return <Stethoscope className="w-6 h-6" />;
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Beginner') return 'bg-green-100 text-green-800';
    if (difficulty === 'Intermediate') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Select a Medical Case
        </h2>
        <p className="text-gray-600 mb-6">
          Choose a case to begin your examination. The AI patient will present
          their complaint first.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((case_) => (
            <div
              key={case_.case_id}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getSpecialtyIcon(case_.specialty)}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {case_.case_id}
                    </h3>
                    <p className="text-sm text-gray-600">{case_.specialty}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(
                    case_.difficulty
                  )}`}
                >
                  {case_.difficulty}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">Patient:</span>{' '}
                  {case_.patient_name}, {case_.patient_age} years
                </p>
                <p className="text-sm text-gray-600">
                  {case_.presenting_complaint}
                </p>
              </div>

              <button
                onClick={() => handleStartExam(case_.case_id)}
                disabled={starting && selectedCase === case_.case_id}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {starting && selectedCase === case_.case_id
                  ? 'Starting...'
                  : 'Start Examination'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}