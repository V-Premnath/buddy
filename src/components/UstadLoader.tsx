import React, { useState, useEffect } from 'react';
import { LOADING_ROASTS } from '../data/mockBiryanis';
import { Flame, Sparkles, ChefHat } from 'lucide-react';
import { sound } from '../utils/audio';

interface UstadLoaderProps {
  onComplete: () => void;
  isSimulated?: boolean;
}

export const UstadLoader: React.FC<UstadLoaderProps> = ({ onComplete, isSimulated = true }) => {
  const [progress, setProgress] = useState(10);
  const [currentMessage, setCurrentMessage] = useState(LOADING_ROASTS[0].message);

  useEffect(() => {
    sound.playSizzle();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }

        // Check roast message milestones
        if (next >= 90) {
          setCurrentMessage(LOADING_ROASTS[3].message);
        } else if (next >= 70) {
          setCurrentMessage(LOADING_ROASTS[2].message);
        } else if (next >= 40) {
          setCurrentMessage(LOADING_ROASTS[1].message);
        } else if (next >= 10) {
          setCurrentMessage(LOADING_ROASTS[0].message);
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Fan speed accelerates as progress increases
  const fanRotationRate = progress > 70 ? '0.2s' : progress > 40 ? '0.35s' : '0.6s';

  return (
    <div className="fixed inset-0 z-50 bg-[#120F0D] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Background steam overlay that expands with progress */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-orange-950/20 to-transparent pointer-events-none transition-opacity duration-500"
        style={{ opacity: 0.3 + (progress / 100) * 0.7 }}
      />

      {/* Floating steam particles based on progress */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: Math.min(18, Math.floor(progress / 5)) }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full blur-xl animate-steam"
            style={{
              width: `${40 + (i % 5) * 20}px`,
              height: `${60 + (i % 4) * 30}px`,
              left: `${15 + (i * 12) % 70}%`,
              bottom: `${20 + (i * 7) % 40}%`,
              animationDuration: `${2 + (i % 3) * 0.8}s`,
              animationDelay: `${(i * 0.25)}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
        {/* CARTOON USTAD CHEF ILLUSTRATION */}
        <div className="relative w-64 h-64 mb-4">
          <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-2xl">
            <defs>
              {/* Coal Fire Glow */}
              <radialGradient id="coalGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF4500" />
                <stop offset="60%" stopColor="#B22222" />
                <stop offset="100%" stopColor="#1A0A05" />
              </radialGradient>
              {/* Lungi Plaid Gradient */}
              <linearGradient id="lungiPlaid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
            </defs>

            {/* Glowing Coal Fire Pit & Charcoal embers */}
            <ellipse cx="120" cy="210" rx="65" ry="16" fill="url(#coalGlow)" filter="drop-shadow(0 0 15px #FF4500)" />
            
            {/* Glowing Coals */}
            <circle cx="105" cy="208" r="8" fill="#FFCC00" className="animate-ping" style={{ animationDuration: '1.2s' }} />
            <circle cx="135" cy="212" r="7" fill="#FF4500" className="animate-pulse" />
            <circle cx="120" cy="205" r="9" fill="#FFA500" />
            <circle cx="85" cy="214" r="6" fill="#CC2200" />
            <circle cx="150" cy="210" r="6" fill="#FF6600" />

            {/* Giant Degh Vessel on Fire */}
            <path
              d="M 65 170 C 65 200, 175 200, 175 170 L 170 145 C 170 142, 70 142, 70 145 Z"
              fill="#8B4513"
              stroke="#4A2508"
              strokeWidth="3"
            />
            {/* Degh Brass Rim & Flour Seal */}
            <ellipse cx="120" cy="145" rx="52" ry="10" fill="#D97706" stroke="#5D2E04" strokeWidth="2" />
            <ellipse cx="120" cy="144" rx="46" ry="7" fill="#FEF3C7" opacity="0.9" />

            {/* Steam rising right out of Degh seal */}
            <path
              d="M 110 135 Q 105 105 115 80"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
            />
            <path
              d="M 130 135 Q 135 110 128 85"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
            />

            {/* USTAD BODY */}
            {/* Blue Checked Lungi */}
            <path
              d="M 40 165 C 38 190, 68 220, 90 220 L 98 175 Z"
              fill="url(#lungiPlaid)"
              stroke="#172554"
              strokeWidth="2"
            />
            {/* White Vest / Banyan */}
            <path
              d="M 42 120 C 40 145, 45 168, 70 168 C 88 168, 92 145, 88 120 Z"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="2"
            />

            {/* Ustad Head */}
            <circle cx="65" cy="85" r="22" fill="#D97706" stroke="#92400E" strokeWidth="2" />
            
            {/* Royal Chef Turban / Pagdi */}
            <path
              d="M 42 80 C 40 55, 90 55, 88 80 Z"
              fill="#FF9933"
              stroke="#C2410C"
              strokeWidth="2"
            />
            <ellipse cx="65" cy="62" rx="16" ry="8" fill="#FDE047" />

            {/* Thick Curly Khansama Mustache */}
            <path
              d="M 50 94 Q 65 100 80 94 Q 85 91 80 88 Q 65 92 50 88 Z"
              fill="#1F2937"
            />
            {/* Eyes & Smirk */}
            <circle cx="58" cy="82" r="2.5" fill="#111827" />
            <circle cx="72" cy="82" r="2.5" fill="#111827" />
            <path d="M 60 76 Q 65 72 70 76" stroke="#78350F" strokeWidth="1.5" fill="none" />

            {/* Frantically Fanning Arm & Woven Hand-Fan (Pankha) */}
            <g
              style={{
                transformOrigin: '78px 125px',
                animation: `fan-wave ${fanRotationRate} infinite alternate ease-in-out`
              }}
            >
              <line x1="78" y1="125" x2="108" y2="160" stroke="#D97706" strokeWidth="7" strokeLinecap="round" />
              {/* Hand Fan (Taad Ka Pankha) */}
              <path
                d="M 108 160 L 140 180 L 148 155 L 120 145 Z"
                fill="#F59E0B"
                stroke="#B45309"
                strokeWidth="2"
              />
              <path d="M 112 160 L 144 175" stroke="#78350F" strokeWidth="1.5" />
              <path d="M 116 155 L 140 165" stroke="#78350F" strokeWidth="1.5" />
            </g>
          </svg>

          {/* Embedded keyframe for fan waving */}
          <style>{`
            @keyframes fan-wave {
              0% { transform: rotate(-18deg); }
              100% { transform: rotate(26deg); }
            }
          `}</style>
        </div>

        {/* Dynamic Progress Percentage */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bebas text-5xl text-white tracking-widest tabular-nums">
            {progress}%
          </span>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-bold">
            DUM BREWING IN PROGRESS
          </span>
        </div>

        {/* Tactical Progress Bar */}
        <div className="w-full bg-[#201915] h-3.5 rounded-full p-0.5 border border-amber-900/60 shadow-inner overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-[#FF9933] to-yellow-400 rounded-full transition-all duration-100 shadow-lg shadow-amber-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* DYNAMIC ROAST MESSAGE BOX */}
        <div className="bg-[#211713] border-2 border-[#FF9933]/50 rounded-2xl p-4 shadow-xl w-full min-h-[78px] flex items-center justify-center">
          <p className="text-base sm:text-lg font-serif italic text-amber-200 tracking-wide font-medium">
            "{currentMessage}"
          </p>
        </div>

        {/* Action Skip or Let Brew */}
        <button
          onClick={onComplete}
          className="mt-6 text-xs text-zinc-400 hover:text-white underline underline-offset-4 tracking-wider transition-colors"
        >
          Skip Ustad Animation & View Current Standings →
        </button>
      </div>
    </div>
  );
};
