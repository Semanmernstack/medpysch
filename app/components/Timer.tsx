// 'use client';

// interface TimerProps {
//   timeRemaining: number;
//   isTimeout: boolean;
// }

// export function Timer({ timeRemaining, isTimeout }: TimerProps) {
//   const minutes = Math.floor(timeRemaining / 60);
//   const seconds = timeRemaining % 60;

//   const getTimerColor = () => {
//     if (isTimeout) return 'bg-red-500';
//     if (timeRemaining < 60) return 'bg-orange-500';
//     if (timeRemaining < 120) return 'bg-yellow-500';
//     return 'bg-green-500';
//   };

//   return (
//     <div className="text-right">
//       <div className="text-sm text-indigo-200 mb-1">Time Remaining</div>
//       <div
//         className={`${getTimerColor()} text-white px-4 py-2 rounded-lg font-mono text-2xl font-bold shadow-lg`}
//       >
//         {minutes}:{seconds.toString().padStart(2, '0')}
//       </div>
//       {isTimeout && <div className="text-xs text-red-200 mt-1">Time's up!</div>}
//     </div>
//   );
// }
'use client';

interface TimerProps {
  timeRemaining: number;
  isTimeout: boolean;
}

export function Timer({ timeRemaining, isTimeout }: TimerProps) {
  // Round to nearest second to avoid decimals
  const totalSeconds = Math.floor(timeRemaining);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const getTimerColor = () => {
    if (isTimeout) return 'bg-red-500';
    if (totalSeconds < 60) return 'bg-orange-500';
    if (totalSeconds < 120) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="text-right">
      <div className="text-sm text-indigo-200 mb-1">Time Remaining</div>
      <div
        className={`${getTimerColor()} text-white px-4 py-2 rounded-lg font-mono text-2xl font-bold shadow-lg`}
      >
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      {isTimeout && <div className="text-xs text-red-200 mt-1">Time's up!</div>}
    </div>
  );
}