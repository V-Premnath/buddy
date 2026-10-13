import React, { useState } from 'react';
import { PanchayatFriend } from '../types/biryani';
import { MessageSquare, Flame, AlertCircle } from 'lucide-react';
import { sound, triggerHaptic } from '../utils/audio';

interface PanchayatBarProps {
  friends: PanchayatFriend[];
  onFriendClick: (friend: PanchayatFriend) => void;
  onKickSuresh: () => void;
}

export const PanchayatBar: React.FC<PanchayatBarProps> = ({
  friends,
  onFriendClick,
  onKickSuresh,
}) => {
  const [activeBubbleId, setActiveBubbleId] = useState<string | null>(null);

  const handleAvatarTap = (friend: PanchayatFriend) => {
    sound.playClink();
    triggerHaptic('dum');
    setActiveBubbleId(activeBubbleId === friend.id ? null : friend.id);
    onFriendClick(friend);
  };

  return (
    <div className="w-full bg-[#181818]/95 backdrop-blur-md border-t border-[#2D2D2D] py-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-bold">
              THE PANCHAYAT STATUS
            </span>
            <span className="text-[10px] text-zinc-500 hidden sm:inline">
              (Live Swiping Roster)
            </span>
          </div>

          <span className="text-[10px] text-amber-400 font-mono">
            {friends.filter(f => f.isSwiping).length} Currently Debating
          </span>
        </div>

        {/* Horizontal Scroll of Friend Avatars */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 pt-5 scrollbar-thin">
          {friends.map((friend) => {
            const isSuresh = friend.name === 'Suresh';

            return (
              <div
                key={friend.id}
                className="relative flex flex-col items-center shrink-0 cursor-pointer group"
                onClick={() => handleAvatarTap(friend)}
              >
                {/* Speech Bubble Above Avatar (Passive-Aggressive text) */}
                <div
                  className={`absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#262626] border ${
                    isSuresh ? 'border-red-500/70 text-red-200' : 'border-[#444444] text-zinc-200'
                  } text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full shadow-lg transition-all duration-300 pointer-events-none z-30 flex items-center gap-1 ${
                    activeBubbleId === friend.id ? 'scale-105 opacity-100' : 'group-hover:scale-105 opacity-90'
                  }`}
                >
                  {isSuresh && <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />}
                  <span>{friend.speechBubble}</span>
                  {/* Bubble tail */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#262626] border-r border-b border-[#444444] transform rotate-45" />
                </div>

                {/* Avatar Ring */}
                <div className="relative">
                  {friend.isSwiping && (
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 animate-spin opacity-75 blur-[2px]" />
                  )}
                  <div
                    className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full ${friend.avatarBg} flex items-center justify-center text-xl shadow-md border-2 ${
                      friend.isSwiping
                        ? 'border-[#FF9933] ring-2 ring-[#FF9933]/50'
                        : 'border-[#333333]'
                    } transform group-hover:scale-110 transition-transform`}
                  >
                    <span>{friend.avatarEmoji}</span>

                    {/* Active swiping pulse badge */}
                    {friend.isSwiping && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-amber-500 border-2 border-[#181818] rounded-full flex items-center justify-center">
                        <Flame className="w-2 h-2 text-black fill-black" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Friend Name & Role */}
                <span className="text-[11px] font-bold text-zinc-200 mt-1 tracking-tight flex items-center gap-1">
                  {friend.name}
                  {isSuresh && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onKickSuresh();
                      }}
                      className="text-[9px] bg-red-950/80 hover:bg-red-900 text-red-300 px-1 rounded border border-red-800"
                      title="Kick Suresh for Veg Biryani blasphemy"
                    >
                      Kick?
                    </button>
                  )}
                </span>
                <span className="text-[9px] text-zinc-500 font-mono">
                  {friend.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
