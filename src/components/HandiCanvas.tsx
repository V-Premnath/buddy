import React from 'react';

interface HandiProps {
  rank: 1 | 2 | 3;
  wbsScore: number;
  restaurantName: string;
  style: string;
  distanceKm: number;
  isRescueSquad?: boolean;
  onClick?: () => void;
  isHighlighted?: boolean;
}

export const HandiPodiumItem: React.FC<HandiProps> = ({
  rank,
  wbsScore,
  restaurantName,
  style,
  distanceKm,
  isRescueSquad = false,
  onClick,
  isHighlighted = false,
}) => {
  // Rank styling
  const config = {
    1: {
      scale: 'scale-100 md:scale-110',
      podiumHeight: 'h-40 md:h-48',
      metalColor: '#F59E0B',
      metalLabel: 'GOLD HANDI',
      borderColor: 'border-amber-500/80',
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.35)]',
      clayPrimary: '#B45309',
      clayShadow: '#78350F',
      wbsBadge: 'bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 text-black',
      steaming: true
    },
    2: {
      scale: 'scale-90 md:scale-95',
      podiumHeight: 'h-32 md:h-36',
      metalColor: '#94A3B8',
      metalLabel: 'SILVER HANDI',
      borderColor: 'border-slate-400/50',
      glow: 'shadow-[0_0_25px_rgba(148,163,184,0.2)]',
      clayPrimary: '#9A3412',
      clayShadow: '#63200B',
      wbsBadge: 'bg-gradient-to-br from-slate-200 via-slate-400 to-slate-600 text-slate-900',
      steaming: true
    },
    3: {
      scale: 'scale-85 md:scale-90',
      podiumHeight: 'h-24 md:h-28',
      metalColor: '#CD7F32',
      metalLabel: 'BRONZE HANDI',
      borderColor: 'border-amber-700/50',
      glow: 'shadow-[0_0_20px_rgba(205,127,50,0.2)]',
      clayPrimary: '#854D0E',
      clayShadow: '#502D08',
      wbsBadge: 'bg-gradient-to-br from-amber-600 via-yellow-800 to-amber-950 text-amber-100',
      steaming: false
    }
  }[rank];

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 group ${config.scale} ${
        isHighlighted ? 'scale-105 filter drop-shadow-[0_0_20px_rgba(255,153,51,0.6)]' : ''
      }`}
    >
      {/* Rescue Squad Emergency Banner if nearest during starvation */}
      {isRescueSquad && (
        <div className="mb-2 px-2.5 py-1 bg-red-600 text-white text-[11px] font-bold tracking-wider rounded border border-red-400 animate-pulse flex items-center gap-1 shadow-lg shadow-red-600/40">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          RESCUE SQUAD ({distanceKm} km)
        </div>
      )}

      {/* Steam Effect for Gold & Silver Handi */}
      <div className="relative w-44 md:w-52 h-36 md:h-44 flex items-center justify-center">
        {config.steaming && (
          <div className="absolute -top-6 inset-x-0 flex justify-center pointer-events-none z-20">
            <div className="w-1.5 h-10 bg-gradient-to-t from-white/30 via-white/15 to-transparent rounded-full animate-steam blur-[1px]" />
            <div className="w-2 h-12 bg-gradient-to-t from-amber-100/40 via-white/20 to-transparent rounded-full animate-steam-delayed -ml-3 blur-[1px]" />
            <div className="w-1.5 h-8 bg-gradient-to-t from-white/25 via-white/10 to-transparent rounded-full animate-steam-delayed-2 ml-3 blur-[1px]" />
          </div>
        )}

        {/* 3D Illustrated Clay Handi SVG */}
        <svg
          viewBox="0 0 200 170"
          className={`w-full h-full drop-shadow-2xl transition-transform duration-300 group-hover:scale-105`}
        >
          <defs>
            {/* Terracotta Clay Body Gradient */}
            <radialGradient id={`clayGrad-${rank}`} cx="40%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="35%" stopColor={config.clayPrimary} />
              <stop offset="85%" stopColor={config.clayShadow} />
              <stop offset="100%" stopColor="#381507" />
            </radialGradient>

            {/* Brass / Metal Rim Gradient */}
            <linearGradient id={`metalRim-${rank}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A341A" />
              <stop offset="25%" stopColor={config.metalColor} />
              <stop offset="50%" stopColor="#FFF3C4" />
              <stop offset="75%" stopColor={config.metalColor} />
              <stop offset="100%" stopColor="#2E1C0A" />
            </linearGradient>

            {/* Dough Seal (Dum Purdah) Texture */}
            <linearGradient id={`doughSeal-${rank}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Base Drop Shadow */}
            <ellipse id="baseShadow" cx="100" cy="155" rx="55" ry="12" fill="rgba(0,0,0,0.6)" />
          </defs>

          {/* Shadow on Floor */}
          <ellipse cx="100" cy="155" rx="60" ry="10" fill="rgba(0,0,0,0.5)" filter="blur(4px)" />

          {/* Clay Handi Bulbous Body */}
          <path
            d="M 45 68 
               C 22 92, 24 135, 65 150 
               C 85 157, 115 157, 135 150 
               C 176 135, 178 92, 155 68 
               Z"
            fill={`url(#clayGrad-${rank})`}
            stroke="#260D04"
            strokeWidth="2"
          />

          {/* Handi Highlight Sheen */}
          <path
            d="M 50 85 C 38 105, 42 125, 60 140 C 50 128, 46 108, 54 88 Z"
            fill="white"
            fillOpacity="0.12"
          />

          {/* Handi Side Clay Handles */}
          <path
            d="M 34 82 C 22 88, 22 104, 33 110 C 31 103, 31 92, 34 82 Z"
            fill={config.clayShadow}
            stroke="#1D0A03"
            strokeWidth="1.5"
          />
          <path
            d="M 166 82 C 178 88, 178 104, 167 110 C 169 103, 169 92, 166 82 Z"
            fill={config.clayShadow}
            stroke="#1D0A03"
            strokeWidth="1.5"
          />

          {/* Handi Neck & Flange */}
          <ellipse
            cx="100"
            cy="68"
            rx="56"
            ry="11"
            fill={config.clayShadow}
            stroke="#1D0A03"
            strokeWidth="1.5"
          />

          {/* Dum Wheat Flour Seal (Atta Ka Purdah) */}
          <path
            d="M 46 64 C 60 69, 140 69, 154 64 C 158 68, 154 73, 148 74 C 120 78, 80 78, 52 74 C 46 72, 43 67, 46 64 Z"
            fill={`url(#doughSeal-${rank})`}
            stroke="#78350F"
            strokeWidth="1"
          />

          {/* Handi Metal Crown Lid */}
          <ellipse
            cx="100"
            cy="52"
            rx="50"
            ry="9"
            fill={`url(#metalRim-${rank})`}
            stroke="#2E1C0A"
            strokeWidth="1.5"
          />

          {/* Handi Lid Dome */}
          <path
            d="M 52 52 C 55 35, 145 35, 148 52 Z"
            fill={`url(#metalRim-${rank})`}
            stroke="#2E1C0A"
            strokeWidth="1.5"
          />

          {/* Lid Finial / Knob */}
          <ellipse
            cx="100"
            cy="36"
            rx="9"
            ry="5"
            fill={config.metalColor}
            stroke="#2E1C0A"
            strokeWidth="1.2"
          />
          <path
            d="M 97 36 L 97 28 C 97 25, 103 25, 103 28 L 103 36 Z"
            fill={config.metalColor}
            stroke="#1E1205"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="25"
            r="4.5"
            fill="#FFFBEB"
            stroke={config.metalColor}
            strokeWidth="1.5"
          />

          {/* Decorative Engraving on Handi Belly */}
          <path
            d="M 68 112 Q 100 126 132 112"
            fill="none"
            stroke={config.metalColor}
            strokeWidth="1.5"
            strokeDasharray="2,3"
            strokeOpacity="0.75"
          />

          {/* Rank Badge Embossed Center on Handi */}
          <circle
            cx="100"
            cy="114"
            r="15"
            fill={config.metalColor}
            stroke="#1A0A02"
            strokeWidth="2"
          />
          <text
            x="100"
            y="120"
            textAnchor="middle"
            fill="#1A0A02"
            fontSize="14"
            fontWeight="bold"
            fontFamily="Bebas Neue, sans-serif"
          >
            #{rank}
          </text>
        </svg>

        {/* Floating WBS Score Wax Seal (Top-Right of Handi) */}
        <div
          className={`absolute -top-1 -right-2 w-14 h-14 rounded-full ${config.wbsBadge} border-2 border-[#1A1A1A] shadow-xl flex flex-col items-center justify-center p-0.5 text-center transform rotate-6 group-hover:rotate-0 transition-transform`}
        >
          <span className="text-[8px] font-extrabold uppercase tracking-widest leading-none opacity-90">
            WBS
          </span>
          <span className="text-base font-black leading-none font-bebas">
            {wbsScore.toFixed(1)}
          </span>
          <span className="text-[7px] font-bold tracking-tight opacity-75">
            SCORE
          </span>
        </div>
      </div>

      {/* Info Card at Handi Base */}
      <div className="text-center mt-2 px-3 py-1.5 max-w-[200px]">
        <div className="flex items-center justify-center gap-1.5">
          <span
            className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded border uppercase"
            style={{ color: config.metalColor, borderColor: `${config.metalColor}55` }}
          >
            {config.metalLabel}
          </span>
        </div>
        <h3 className="text-sm md:text-base font-bold text-white tracking-tight truncate mt-1">
          {restaurantName}
        </h3>
        <p className="text-xs text-amber-200/80 truncate">{style}</p>
        <div className="flex items-center justify-center gap-2 mt-1 text-[11px] text-zinc-400">
          <span>{distanceKm} km</span>
          <span>·</span>
          <span className="text-amber-400 font-semibold">{wbsScore.toFixed(1)} WBS</span>
        </div>
      </div>

      {/* Podium Block Base */}
      <div
        className={`w-36 md:w-44 ${config.podiumHeight} bg-gradient-to-b from-[#262626] to-[#171717] rounded-t-xl border-t-4 ${config.borderColor} border-x border-[#333333] shadow-inner flex flex-col items-center justify-start pt-3 relative`}
      >
        <span className="font-bebas text-3xl md:text-4xl text-zinc-500/80 tracking-widest">
          RANK {rank}
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/90 mt-1">
          Panchayat Certified
        </span>
      </div>
    </div>
  );
};
