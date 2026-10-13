import React, { useState, useEffect } from 'react';
import { UNDERGROUND_GEMS } from '../data/mockBiryanis';
import { UndergroundSpot } from '../types/biryani';
import { Terminal, Shield, MapPin, Eye, Lock, ArrowLeft, Radio, AlertOctagon } from 'lucide-react';
import { sound, triggerHaptic } from '../utils/audio';

interface UndergroundModeProps {
  onExit: () => void;
  onShowToast: (title: string, message: string, type: 'slang' | 'alert' | 'dum' | 'reject' | 'troll') => void;
}

export const UndergroundMode: React.FC<UndergroundModeProps> = ({ onExit, onShowToast }) => {
  const [selectedSpot, setSelectedSpot] = useState<UndergroundSpot>(UNDERGROUND_GEMS[0]);
  const [typedText, setTypedText] = useState('');
  const fullText = selectedSpot.aiJustification;

  // Typewriter effect when spot changes
  useEffect(() => {
    sound.playGlitch();
    setTypedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [selectedSpot, fullText]);

  const handleCopyIntel = (spot: UndergroundSpot) => {
    sound.playGlitch();
    navigator.clipboard?.writeText(
      `[CONFIDENTIAL DEGH INTEL] Target: ${spot.alias} | Coordinates: ${spot.landmarks} | Password: ${spot.passwordPhrase}`
    );
    onShowToast('ENCRYPTED INTEL COPIED', 'Burn after reading. Tell no one.', 'alert');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A0A] text-[#00FF66] font-mono select-none overflow-y-auto crt-overlay animate-flicker">
      {/* Top Terminal Bar */}
      <div className="sticky top-0 z-40 bg-black/90 border-b border-[#00FF66]/30 px-4 sm:px-6 py-3 flex items-center justify-between backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-[#00FF66] animate-pulse" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-[#00FF66]">
                [DEEP-WEB DEGH OPERATIVE]
              </span>
              <span className="text-[10px] bg-[#00FF66]/20 text-[#00FF66] px-2 py-0.5 rounded border border-[#00FF66]/40">
                ENCRYPTED P2P
              </span>
            </div>
            <p className="text-[10px] text-[#00FF66]/70 hidden sm:block">
              Neural Ghee-to-Rice Ratio Intelligence Engine // Dark-Bawarchi Protocol
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playGlitch();
            onExit();
          }}
          className="px-3.5 py-1.5 rounded-lg border border-[#00FF66] bg-[#00FF66]/10 hover:bg-[#00FF66] hover:text-black text-[#00FF66] text-xs font-bold transition-all flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          EJECT TO WAR ROOM
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        {/* Banner Slang Notice */}
        <div className="border border-[#00FF66]/40 bg-[#00FF66]/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(0,255,102,0.1)]">
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-[#00FF66] animate-spin" />
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#00FF66]/70 block">
                CLASSIFIED DESI WISDOM
              </span>
              <p className="text-sm font-bold text-[#00FF66]">
                "Asli maal idhar hai, baaki sab moh-maya hai."
              </p>
            </div>
          </div>
          <span className="text-xs text-[#00FF66]/80 bg-black/60 px-3 py-1 rounded border border-[#00FF66]/30">
            NO ADS · NO SWIGGY · JUST PURE GHEE
          </span>
        </div>

        {/* Spot Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {UNDERGROUND_GEMS.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setSelectedSpot(spot)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedSpot.id === spot.id
                  ? 'border-[#00FF66] bg-[#00FF66]/15 shadow-[0_0_15px_rgba(0,255,102,0.25)]'
                  : 'border-[#00FF66]/20 bg-black/50 hover:border-[#00FF66]/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#00FF66]/60">{spot.codeName}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00FF66]/20 border border-[#00FF66]/40">
                  {spot.dangerLevel}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#00FF66] mt-1 truncate">
                {spot.alias}
              </h4>
              <div className="flex items-center gap-2 mt-2 text-[11px] text-[#00FF66]/80">
                <span>Ghee: {spot.neuralGheeRatio}%</span>
                <span>·</span>
                <span>{spot.batchTiming.split('·')[0]}</span>
              </div>
            </button>
          ))}
        </div>

        {/* ACTIVE OPERATIVE DOSSIER */}
        <div className="border-2 border-[#00FF66]/50 rounded-2xl bg-black/80 p-5 sm:p-7 shadow-[0_0_30px_rgba(0,255,102,0.15)] space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#00FF66]/30 gap-3">
            <div>
              <span className="text-xs text-[#00FF66]/70 uppercase tracking-widest block">
                DOSSIER FILE: {selectedSpot.codeName}
              </span>
              <h3 className="text-2xl font-bold text-[#00FF66] tracking-tight mt-0.5">
                {selectedSpot.alias}
              </h3>
            </div>
            <button
              onClick={() => handleCopyIntel(selectedSpot)}
              className="px-3.5 py-1.5 rounded-lg border border-[#00FF66] bg-[#00FF66]/10 hover:bg-[#00FF66] hover:text-black text-xs font-bold transition-all"
            >
              COPY STEALTH DISPATCH
            </button>
          </div>

          {/* Coordinates Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Coordinates / Map Pin */}
            <div className="border border-[#00FF66]/30 bg-[#00FF66]/5 p-4 rounded-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase mb-2">
                <MapPin className="w-4 h-4 text-[#00FF66]" />
                <span>TACTICAL COORDINATES</span>
              </div>
              <p className="text-sm text-[#00FF66] font-bold">
                {selectedSpot.coordinates}
              </p>
              <div className="mt-3 p-2.5 bg-black/80 rounded border border-[#00FF66]/20">
                <span className="text-[10px] text-[#00FF66]/60 uppercase block">Landmark Instructions:</span>
                <p className="text-xs font-bold text-white mt-0.5">
                  "{selectedSpot.landmarks}"
                </p>
              </div>
            </div>

            {/* AI Justification (Typewriter Effect) */}
            <div className="border border-[#00FF66]/30 bg-[#00FF66]/5 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase mb-2">
                  <Shield className="w-4 h-4 text-[#00FF66]" />
                  <span>NEURAL NETWORK JUSTIFICATION</span>
                </div>
                <div className="min-h-[60px] text-xs leading-relaxed text-[#00FF66]">
                  {typedText}
                  <span className="inline-block w-2 h-3 bg-[#00FF66] ml-1 animate-pulse" />
                </div>
              </div>
              <div className="mt-2 text-[10px] text-[#00FF66]/60 border-t border-[#00FF66]/20 pt-2">
                Spectrometry: 99.4% Pure Clarified Butter · Zero Food Coloring
              </div>
            </div>
          </div>

          {/* Tactical Specs Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-black/60 rounded-xl border border-[#00FF66]/20">
              <span className="text-[10px] text-[#00FF66]/60 uppercase block">Boti Tenderness Index</span>
              <span className="font-bold text-white mt-1 block">{selectedSpot.botiTenderness}</span>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-[#00FF66]/20">
              <span className="text-[10px] text-[#00FF66]/60 uppercase block">Window of Operation</span>
              <span className="font-bold text-[#00FF66] mt-1 block">{selectedSpot.batchTiming}</span>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-[#00FF66]/20">
              <span className="text-[10px] text-[#00FF66]/60 uppercase block">Verbal Handshake Phrase</span>
              <span className="font-bold text-amber-300 mt-1 block">{selectedSpot.passwordPhrase}</span>
            </div>
          </div>

          {/* Warning disclaimer */}
          <div className="p-3 bg-red-950/30 border border-red-500/40 rounded-xl flex items-center gap-3 text-red-300 text-xs">
            <AlertOctagon className="w-5 h-5 text-red-400 shrink-0" />
            <span>
              <strong>Operative Rule #1:</strong> Do not post these coordinates on Instagram or food reels. The moment influencers show up, the dum quality drops by 60%. Protect the Khansama.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
