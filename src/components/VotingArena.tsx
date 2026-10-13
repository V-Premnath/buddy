import React, { useState, useRef } from 'react';
import { BiryaniPlace } from '../types/biryani';
import {
  Flame,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Skull,
  CheckCircle2,
  UtensilsCrossed,
  ShieldAlert,
  Info
} from 'lucide-react';
import { sound, triggerHaptic } from '../utils/audio';

interface VotingArenaProps {
  places: BiryaniPlace[];
  onVote: (placeId: string, direction: 'dum' | 'reject') => void;
  onShowToast: (title: string, message: string, type: 'slang' | 'alert' | 'dum' | 'reject' | 'troll') => void;
  onNavigateToVerdict: () => void;
}

export const VotingArena: React.FC<VotingArenaProps> = ({
  places,
  onVote,
  onShowToast,
  onNavigateToVerdict,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [history, setHistory] = useState<number[]>([]);
  const startPos = useRef({ x: 0, y: 0 });

  const currentPlace = places[currentIndex];
  const nextPlace = places[currentIndex + 1];

  const handleSwipe = (direction: 'dum' | 'reject') => {
    if (!currentPlace) return;

    if (direction === 'dum') {
      sound.playClink();
      triggerHaptic('dum');

      // Slang trigger check for distance >= 10km
      if (currentPlace.distanceKm >= 10) {
        onShowToast(
          'Abbe, 15km?',
          'Agli Eid tak pahunchega kya? Biryani will get colder than ice cream!',
          'slang'
        );
      } else if (currentPlace.isSpicy) {
        onShowToast(
          'SPICE HAZARD ACCEPTED!',
          'Mirchi lagi toh main kya karoon? Keep two glasses of chhaas on standby.',
          'alert'
        );
      } else {
        onShowToast(
          'DUM IT STAMPED!',
          `"${currentPlace.name}" added to Panchayat high-priority shortlist.`,
          'dum'
        );
      }
    } else {
      sound.playReject();
      triggerHaptic('reject');
      onShowToast(
        'REJECTED WITH DISDAIN',
        `"${currentPlace.name}" thrown into the discard bin. No mercy in Panchayat #42.`,
        'reject'
      );
    }

    onVote(currentPlace.id, direction);
    setHistory(prev => [...prev, currentIndex]);
    setDragOffset({ x: 0, y: 0 });
    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastIndex = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));
    setCurrentIndex(lastIndex);
    sound.playClink();
    onShowToast('VOTE RECALLED', 'Panchayat vote reversed for deliberation.', 'alert');
  };

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy * 0.3 });
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset.x > 90) {
      handleSwipe('dum');
    } else if (dragOffset.x < -90) {
      handleSwipe('reject');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  if (!currentPlace) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-xl shadow-amber-600/30 mb-4 animate-bounce">
          <UtensilsCrossed className="w-10 h-10 text-black" />
        </div>
        <h2 className="font-bebas text-4xl text-white tracking-wider">
          ALL DEGH ROUNDS COMPLETED!
        </h2>
        <p className="text-zinc-400 max-w-md text-sm mt-2">
          The Panchayat has finished initial swiping deliberations. Top 3 clay handis have been assembled on the podium.
        </p>
        <button
          onClick={() => {
            sound.playClink();
            onNavigateToVerdict();
          }}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#FF9933] to-amber-500 text-black font-bold font-bebas text-xl tracking-wider rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-black" />
          REVEAL BIRYANI VERDICT & RANKINGS
        </button>
      </div>
    );
  }

  // Calculate rotation and stamp opacity from dragOffset
  const rotateDeg = dragOffset.x * 0.08;
  const dumStampOpacity = Math.min(1, Math.max(0, dragOffset.x / 70));
  const rejectStampOpacity = Math.min(1, Math.max(0, -dragOffset.x / 70));

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 select-none relative">
      {/* Background card preview for stack depth */}
      {nextPlace && (
        <div
          className="absolute w-full max-w-sm sm:max-w-md h-[490px] sm:h-[530px] rounded-3xl bg-[#1C1C1C] border border-[#2D2D2D] opacity-40 scale-95 translate-y-4 pointer-events-none transition-transform"
        />
      )}

      {/* Primary Active Card */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotateDeg}deg)`,
          transition: isDragging ? 'none' : 'transform 0.25s ease-out'
        }}
        className={`relative w-full max-w-sm sm:max-w-md h-[490px] sm:h-[530px] rounded-3xl bg-gradient-to-b ${currentPlace.cardColor.gradient} border-2 ${currentPlace.cardColor.border} shadow-2xl overflow-hidden flex flex-col cursor-grab active:cursor-grabbing z-20 ${
          currentPlace.isSpicy ? 'animate-heat-haze' : ''
        }`}
      >
        {/* Heat Haze Flame Overlay if Spicy */}
        {currentPlace.isSpicy && (
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-orange-950/20 to-transparent pointer-events-none z-10">
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md shadow-red-600/30">
              <Flame className="w-3.5 h-3.5 animate-bounce text-yellow-300" />
              HEAT HAZARD LVL {currentPlace.spiceLevel}
            </div>
          </div>
        )}

        {/* STAMP OVERLAYS */}
        {/* Green "DUM IT" Stamp */}
        <div
          style={{ opacity: dumStampOpacity }}
          className="absolute top-8 left-6 z-30 pointer-events-none transform -rotate-12 border-4 border-emerald-400 bg-emerald-950/80 text-emerald-300 px-4 py-2 rounded-xl shadow-2xl font-bebas text-3xl tracking-widest flex items-center gap-2"
        >
          <CheckCircle2 className="w-7 h-7 text-emerald-400" />
          DUM IT!
        </div>

        {/* Red "REJECTED" Stamp */}
        <div
          style={{ opacity: rejectStampOpacity }}
          className="absolute top-8 right-6 z-30 pointer-events-none transform rotate-12 border-4 border-rose-500 bg-rose-950/80 text-rose-300 px-4 py-2 rounded-xl shadow-2xl font-bebas text-3xl tracking-widest flex items-center gap-2"
        >
          <Skull className="w-7 h-7 text-rose-400" />
          REJECTED
        </div>

        {/* Card Header & Visual Badge */}
        <div className="p-5 sm:p-6 pb-2 relative z-20">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold px-2.5 py-0.5 rounded bg-black/50 border border-amber-500/30">
              {currentPlace.style}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">{currentPlace.distanceKm} km</span>
              <span className="text-zinc-500">·</span>
              <Clock className="w-3 h-3 text-zinc-400" />
              <span>{currentPlace.etaMins}m</span>
            </div>
          </div>

          <h2 className="font-bebas text-2xl sm:text-3xl text-white tracking-wide mt-3 leading-tight">
            {currentPlace.name}
          </h2>
          <p className="text-xs text-amber-200/90 leading-snug mt-1 line-clamp-2">
            {currentPlace.tagline}
          </p>
        </div>

        {/* Card Body & Tactical Biryani Metrics */}
        <div className="flex-1 px-5 sm:px-6 py-2 flex flex-col justify-around relative z-20">
          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-black/45 p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-400 block uppercase font-mono">Meat Specification</span>
              <span className="font-semibold text-white mt-0.5 block truncate">
                {currentPlace.meat}
              </span>
            </div>
            <div className="bg-black/45 p-2.5 rounded-xl border border-white/5">
              <span className="text-[10px] text-zinc-400 block uppercase font-mono">Rice Grain Type</span>
              <span className="font-semibold text-amber-300 mt-0.5 block truncate">
                {currentPlace.rice}
              </span>
            </div>
          </div>

          {/* Tactical Landmine Warning (Elaichi Count) */}
          <div className="bg-[#21160F] border border-amber-600/30 rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-950 flex items-center justify-center text-amber-400 text-xs font-bold border border-amber-800">
                🌿
              </div>
              <div>
                <span className="text-[10px] text-amber-400 uppercase font-mono font-bold block">
                  ELAICHI LANDMINE SENSOR
                </span>
                <span className="text-xs text-zinc-300">
                  {currentPlace.elaichiCount} Hidden Green Cardamoms Detected
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">
              {currentPlace.elaichiCount > 5 ? '⚠️ HIGH DANGER' : 'LOW RISK'}
            </span>
          </div>

          {/* Distance / Cold Warning if >10km */}
          {currentPlace.distanceKm > 10 && (
            <div className="bg-red-950/60 border border-red-700/60 rounded-xl p-2 flex items-center gap-2 text-red-300 text-xs">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>
                <strong>Warning:</strong> 15km distance! Rice will arrive colder than Arctic permafrost.
              </span>
            </div>
          )}

          {/* Snippet from Haters' Corner */}
          <div className="border border-red-500/40 bg-red-950/30 rounded-xl p-2.5">
            <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-wider block">
              ⚠️ PREVIEW: REALITY CHECK
            </span>
            <p className="text-[11px] text-zinc-300 italic mt-0.5 line-clamp-2">
              "{currentPlace.realityCheck.quote}"
            </p>
          </div>
        </div>

        {/* Card Footer: Location info & price */}
        <div className="p-4 bg-black/60 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 relative z-20">
          <span className="truncate max-w-[200px]">{currentPlace.cityLocation}</span>
          <span className="font-mono text-amber-400 font-bold">₹{currentPlace.priceForTwo} for 2</span>
        </div>
      </div>

      {/* Tactical Bottom Action Controls */}
      <div className="flex items-center gap-4 mt-6 z-30">
        {/* Undo Button */}
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="w-12 h-12 rounded-full bg-[#242424] border border-[#3A3A3A] text-zinc-400 hover:text-white hover:bg-[#303030] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg transition-all active:scale-90"
          title="Recall Last Vote"
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* REJECT Button (Swipe Left) */}
        <button
          onClick={() => handleSwipe('reject')}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-rose-700 text-white flex flex-col items-center justify-center shadow-xl shadow-red-700/30 hover:scale-105 active:scale-95 transition-all group border-2 border-red-400"
          title="Reject (Swipe Left)"
        >
          <ThumbsDown className="w-6 h-6 group-hover:-rotate-12 transition-transform" />
          <span className="text-[9px] font-bold uppercase tracking-wider font-bebas mt-0.5">
            REJECT
          </span>
        </button>

        {/* DUM IT Button (Swipe Right) */}
        <button
          onClick={() => handleSwipe('dum')}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-black flex flex-col items-center justify-center shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all group border-2 border-emerald-300"
          title="Dum It (Swipe Right)"
        >
          <ThumbsUp className="w-6 h-6 text-black group-hover:rotate-12 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-wider font-bebas mt-0.5">
            DUM IT
          </span>
        </button>

        {/* Quick Verdict Link */}
        <button
          onClick={() => {
            sound.playClink();
            onNavigateToVerdict();
          }}
          className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-black flex items-center justify-center shadow-lg transition-all active:scale-90"
          title="Jump to Verdict Podium"
        >
          <Sparkles className="w-5 h-5" />
        </button>
      </div>

      <p className="text-[11px] text-zinc-500 mt-2 text-center">
        Tip: Drag or flick card left/right, or tap buttons above. Metallic ladle *clink* confirmed.
      </p>
    </div>
  );
};
