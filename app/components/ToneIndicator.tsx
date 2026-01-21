'use client';

interface ToneAnalysis {
  empathy_level: 'high' | 'medium' | 'low';
  tone: string;
  communication_score: number;
  concerns: string[];
}

interface ToneIndicatorProps {
  toneAnalysis: ToneAnalysis | null;
  isVisible: boolean;
}

export function ToneIndicator({ toneAnalysis, isVisible }: ToneIndicatorProps) {
  if (!isVisible || !toneAnalysis) return null;

  const getEmpathyColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 border-green-500 text-green-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low':
        return 'bg-red-100 border-red-500 text-red-800';
      default:
        return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getCommScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const empathyEmoji = {
    high: '💚',
    medium: '💛',
    low: '❤️‍🩹',
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-indigo-200 p-4 w-80">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-gray-700">Examiner Monitoring</span>
          </div>
          <span className="text-xs text-gray-500">Live</span>
        </div>

        {/* Empathy Level */}
        <div className={`rounded-lg p-3 border-2 mb-3 ${getEmpathyColor(toneAnalysis.empathy_level)}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold uppercase tracking-wide">Empathy</span>
            <span className="text-2xl">{empathyEmoji[toneAnalysis.empathy_level]}</span>
          </div>
          <div className="text-lg font-bold capitalize">{toneAnalysis.empathy_level}</div>
        </div>

        {/* Communication Score */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-700">Communication</span>
            <span className={`text-2xl font-bold ${getCommScoreColor(toneAnalysis.communication_score)}`}>
              {toneAnalysis.communication_score}/10
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                toneAnalysis.communication_score >= 8
                  ? 'bg-green-500'
                  : toneAnalysis.communication_score >= 6
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${toneAnalysis.communication_score * 10}%` }}
            />
          </div>
        </div>

        {/* Tone Description */}
        <div className="bg-indigo-50 rounded-lg p-3 mb-3">
          <div className="text-xs font-semibold text-indigo-900 mb-1">Detected Tone:</div>
          <div className="text-sm text-indigo-800 italic">"{toneAnalysis.tone}"</div>
        </div>

        {/* Concerns */}
        {toneAnalysis.concerns && toneAnalysis.concerns.length > 0 ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-600">⚠️</span>
              <span className="text-xs font-semibold text-red-900">Concerns:</span>
            </div>
            <ul className="space-y-1">
              {toneAnalysis.concerns.map((concern, idx) => (
                <li key={idx} className="text-xs text-red-800">
                  • {concern}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
            <span className="text-xs text-green-800">✓ Good communication</span>
          </div>
        )}

        {/* Footer */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">This feedback is visible only to you</p>
        </div>
      </div>
    </div>
  );
}