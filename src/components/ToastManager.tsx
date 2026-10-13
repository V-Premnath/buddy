import React from 'react';
import { ToastItem } from '../types/biryani';
import { AlertCircle, CheckCircle2, Flame, Sparkles, X, Skull } from 'lucide-react';

interface ToastManagerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastManager: React.FC<ToastManagerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-3 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const config = {
          slang: {
            border: 'border-amber-500/80',
            bg: 'bg-[#221812]',
            titleColor: 'text-[#FF9933]',
            icon: <Flame className="w-5 h-5 text-[#FF9933] shrink-0" />
          },
          alert: {
            border: 'border-red-500/80',
            bg: 'bg-[#241313]',
            titleColor: 'text-red-400',
            icon: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          },
          dum: {
            border: 'border-emerald-500/80',
            bg: 'bg-[#12231A]',
            titleColor: 'text-emerald-400',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          },
          reject: {
            border: 'border-rose-600/80',
            bg: 'bg-[#241418]',
            titleColor: 'text-rose-400',
            icon: <Skull className="w-5 h-5 text-rose-400 shrink-0" />
          },
          troll: {
            border: 'border-yellow-500/80',
            bg: 'bg-[#252213]',
            titleColor: 'text-yellow-400',
            icon: <Sparkles className="w-5 h-5 text-yellow-400 shrink-0" />
          }
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto border-2 ${config.border} ${config.bg} rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in slide-in-from-top-4 duration-200`}
          >
            {config.icon}
            <div className="flex-1 min-w-0">
              <h5 className={`font-bebas text-base tracking-wider ${config.titleColor} leading-none`}>
                {toast.title}
              </h5>
              <p className="text-xs text-zinc-200 mt-1 leading-snug font-sans">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
