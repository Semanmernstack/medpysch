'use client';

interface PatientAvatarProps {
  emotionalState: string;
}

export function PatientAvatar({ emotionalState }: PatientAvatarProps) {
  const getAvatarEmoji = () => {
    const state = emotionalState.toLowerCase();
    if (state.includes('sad') || state.includes('low') || state.includes('depressed')) {
      return '😔';
    }
    if (state.includes('anxious') || state.includes('worried') || state.includes('panic')) {
      return '😰';
    }
    if (state.includes('pain') || state.includes('distress')) {
      return '😣';
    }
    if (state.includes('confused')) {
      return '😕';
    }
    return '🙂';
  };

  return (
    <div className="flex-shrink-0">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg">
        {getAvatarEmoji()}
      </div>
    </div>
  );
}