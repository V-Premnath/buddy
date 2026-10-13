import React, { useState, useRef, useEffect } from 'react';
import { sound, triggerHaptic } from '../utils/audio';

interface GheeFingerprintTriggerProps {
  onUnlock: () => void;
}

export const GheeFingerprintTrigger: React.FC<GheeFingerprintTriggerProps> = ({ onUnlock }) => {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (holding) {
      sound.playSizzle();
      const startTime = Date.now();
      const duration = 1200; // 1.2s hold required

      timerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          setHolding(false);
          setProgress(0);
          sound.playGlitch();
          triggerHaptic('dum');
          onUnlock();
        }
      }, 25);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setProgress(0);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [holding, onUnlock]);

  const handlePointerDown = () => {
    setHolding(true);
  };

  const handlePointerUp = () => {
    setHolding(false);
  };

  return (
    <div className="fixed bottom-20 right-4 sm:right-6 z-40 select-none">
      <div className="relative group flex items-center justify-center">
        {/* Progress SVG Ring around fingerprint */}
        <svg className="w-14 h-14 -rotate-90 transform pointer-events-none absolute inset-0">
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="rgba(255, 153, 51, 0.2)"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="#FF9933"
            strokeWidth="3.5"
            strokeDasharray={150.8}
            strokeDashoffset={150.8 - (150.8 * progress) / 100}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-75"
          />
        </svg>

        {/* Ghee-Stained Fingerprint Icon Button */}
        <button
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`w-14 h-14 rounded-full bg-[#1B1612] border-2 ${
            holding ? 'border-amber-400 scale-95' : 'border-amber-600/50 hover:border-amber-400'
          } shadow-xl flex items-center justify-center transition-all cursor-pointer relative overflow-hidden group`}
          title="Secret: Hold to decrypt Underground Gems"
        >
          {/* Ghee oil sheen overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/30 via-yellow-500/20 to-transparent pointer-events-none" />

          {/* Detailed Fingerprint SVG with amber oily glow */}
          <svg
            viewBox="0 0 24 24"
            className={`w-7 h-7 transition-all ${
              holding ? 'text-amber-300 drop-shadow-[0_0_8px_#FF9933]' : 'text-amber-500/90 group-hover:text-amber-400'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Fingerprint whorls */}
            <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 3" />
            <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
            <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
            <path d="M2 12a10 10 0 0 1 18-6" />
            <path d="M2 16h.01" />
            <path d="M21.8 16c.2-2 .131-5.354 0-6" />
            <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
            <path d="M8.65 22c.21-.66.45-1.32.57-2" />
            <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
          </svg>

          {/* Ghee drop marker */}
          <span className="absolute top-1 right-1 text-[8px]">🧈</span>
        </button>

        {/* Hover Hint Bubble */}
        <div className="absolute bottom-16 right-0 whitespace-nowrap bg-black/90 border border-amber-600/40 text-amber-200 text-[10px] px-2.5 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Hold 1s for Secret Underground AI
        </div>
      </div>
    </div>
  );
};
