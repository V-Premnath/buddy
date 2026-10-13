import React from 'react';
import { Volume2, VolumeX, ShieldAlert, Award, Flame, Users } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeaderProps {
  currentCardIndex: number;
  totalCards: number;
  activeScreen: 'arena' | 'verdict' | 'ustad';
  onSelectScreen: (screen: 'arena' | 'verdict' | 'ustad') => void;
  onTriggerVegTroll: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCardIndex,
  totalCards,
  activeScreen,
  onSelectScreen,
  onTriggerVegTroll,
  isMuted,
  onToggleMute,
}) => {
  const progressPercent = Math.min(100, Math.round((currentCardIndex / totalCards) * 100));

  return (
    <header className="sticky top-0 z-40 bg-[#161616]/95 backdrop-blur-md border-b border-[#2C2C2C] px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Wax Seal Badge & Title */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            {/* Wax Seal Badge */}
            <div className="relative group cursor-pointer" onClick={() => sound.playClink()}>
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B0000] via-[#A52A2A] to-[#5C0606] border-2 border-[#D4AF37] shadow-[0_0_12px_rgba(139,0,0,0.6)] flex flex-col items-center justify-center p-1 transform rotate-[-4deg] group-hover:rotate-0 transition-transform">
                <span className="text-[7px] font-bold tracking-widest text-[#FFF8DC] uppercase leading-none">
                  SEALED
                </span>
                <span className="font-bebas text-lg leading-none text-[#FFD700] tracking-wider">
                  #42
                </span>
                <span className="text-[6px] tracking-tight text-[#FFE4B5] leading-none uppercase">
                  DUM
                </span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1A1A1A] border border-[#D4AF37] flex items-center justify-center">
                <Flame className="w-2.5 h-2.5 text-[#FF9933]" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bebas text-xl sm:text-2xl tracking-wider text-white flex items-center gap-1.5">
                  THE BIRYANI WAR ROOM
                </h1>
                <span className="hidden sm:inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#272727] text-amber-400 border border-[#3E3E3E]">
                  PANCHAYAT #42
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                Tactical consensus engine for dispute-free biryani consumption
              </p>
            </div>
          </div>

          {/* Sound & Haptic toggle for mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onToggleMute}
              className="p-2 rounded-lg bg-[#242424] text-zinc-300 hover:text-white border border-[#333333] transition-colors"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-[#202020] p-1 rounded-xl border border-[#2E2E2E] w-full md:w-auto justify-center overflow-x-auto">
          <button
            onClick={() => {
              sound.playClink();
              onSelectScreen('arena');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeScreen === 'arena'
                ? 'bg-[#FF9933] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            VOTING ARENA
          </button>

          <button
            onClick={() => {
              sound.playClink();
              onSelectScreen('verdict');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeScreen === 'verdict'
                ? 'bg-[#FF9933] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            THE VERDICT
          </button>

          <button
            onClick={() => {
              sound.playSizzle();
              onSelectScreen('ustad');
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeScreen === 'ustad'
                ? 'bg-[#FF9933] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-[#2A2A2A]'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            USTAD'S HEARTH
          </button>

          {/* VEG FILTER BUTTON (The Troll 404 Trigger) */}
          <button
            onClick={onTriggerVegTroll}
            className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-400/90 hover:text-emerald-300 hover:bg-emerald-950/40 border border-emerald-900/40 whitespace-nowrap transition-colors flex items-center gap-1 group"
            title="Search for Veg Biryani"
          >
            <span className="text-[11px]">🌿</span>
            <span className="group-hover:line-through">Veg Biryani</span>
          </button>
        </nav>

        {/* Right: Battle Progress Bar & Sound Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-[11px] font-mono text-zinc-300">
              <span className="text-amber-400 font-semibold">{currentCardIndex} / {totalCards}</span>
              <span className="text-zinc-500">DEGH EVALUATED</span>
            </div>
            {/* Progress Bar */}
            <div className="w-32 bg-[#222222] h-2 rounded-full overflow-hidden mt-1 border border-[#333333]">
              <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-[#FF9933] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button
            onClick={onToggleMute}
            className="p-2 rounded-lg bg-[#242424] text-zinc-300 hover:text-white border border-[#333333] transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Mini Progress Bar */}
      <div className="w-full bg-[#222222] h-1 rounded-full overflow-hidden mt-2 md:hidden">
        <div
          className="h-full bg-[#FF9933] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
