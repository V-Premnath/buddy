import React, { useEffect } from 'react';
import { AlertTriangle, X, ShieldX, Frown, Utensils } from 'lucide-react';
import { sound, triggerHaptic } from '../utils/audio';

interface VegTrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKickSuresh: () => void;
}

export const VegTrollModal: React.FC<VegTrollModalProps> = ({
  isOpen,
  onClose,
  onKickSuresh,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playBuzzer();
      triggerHaptic('veg');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative max-w-md w-full bg-gradient-to-b from-[#241515] to-[#140C0C] border-2 border-red-500 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.4)] text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-black/40 hover:bg-black/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 404 Icon & Title */}
        <div className="w-20 h-20 mx-auto rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center mb-4 text-red-400 shadow-lg shadow-red-900/50">
          <ShieldX className="w-10 h-10 animate-bounce" />
        </div>

        <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase bg-red-950 px-3 py-1 rounded-full border border-red-800">
          HTTP 404: SYNTAX BLASPHEMY
        </span>

        <h3 className="font-bebas text-4xl text-white tracking-wider mt-3">
          SEARCH NOT FOUND.
        </h3>

        {/* The Iconic Roast Question */}
        <div className="my-3 py-2 px-3 bg-red-900/20 border border-red-600/40 rounded-xl">
          <p className="text-xl sm:text-2xl font-bebas text-amber-400 tracking-wide">
            Did you mean: <span className="underline decoration-wavy decoration-red-500 text-white">"PULAO"</span>?
          </p>
        </div>

        {/* Description & Suresh Callout */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-5">
          <strong>WARNING:</strong> Requesting "Veg Biryani" in the War Room violates Article 370 of the Biryani Constitution.
          <br />
          <span className="text-red-300 italic block mt-1">
            "Suresh, we know it's you using this device. Go eat peas and paneer rice in silence."
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={() => {
              sound.playClink();
              onClose();
            }}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF9933] text-black font-bebas text-lg tracking-wider font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            I REPENT (RETURN TO REAL BIRYANI)
          </button>

          <button
            onClick={() => {
              sound.playReject();
              onKickSuresh();
              onClose();
            }}
            className="px-4 py-3 rounded-xl bg-red-950 hover:bg-red-900 border border-red-700 text-red-200 text-xs font-bold transition-all"
          >
            Vote to Kick Suresh 🥦
          </button>
        </div>
      </div>
    </div>
  );
};
