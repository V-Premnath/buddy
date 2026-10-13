/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VotingArena } from './components/VotingArena';
import { VerdictScreen } from './components/VerdictScreen';
import { UndergroundMode } from './components/UndergroundMode';
import { UstadLoader } from './components/UstadLoader';
import { PanchayatBar } from './components/PanchayatBar';
import { VegTrollModal } from './components/VegTrollModal';
import { ToastManager } from './components/ToastManager';
import { GheeFingerprintTrigger } from './components/GheeFingerprintTrigger';
import { INITIAL_BIRYANI_PLACES, PANCHAYAT_FRIENDS } from './data/mockBiryanis';
import { BiryaniPlace, PanchayatFriend, ToastItem } from './types/biryani';
import { sound, triggerHaptic } from './utils/audio';

export default function App() {
  const [places, setPlaces] = useState<BiryaniPlace[]>(INITIAL_BIRYANI_PLACES);
  const [friends, setFriends] = useState<PanchayatFriend[]>(PANCHAYAT_FRIENDS);
  const [activeScreen, setActiveScreen] = useState<'arena' | 'verdict' | 'ustad' | 'underground'>('arena');
  const [currentVoteIndex, setCurrentVoteIndex] = useState(0);
  const [isVegTrollOpen, setIsVegTrollOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Initial welcome toast
  useEffect(() => {
    addToast(
      'WAR ROOM CONVENED',
      'Biryani Panchayat #42 is in session. Vote carefully, friendships are at stake.',
      'slang'
    );
  }, []);

  const addToast = (
    title: string,
    message: string,
    type: 'slang' | 'alert' | 'dum' | 'reject' | 'troll'
  ) => {
    const newToast: ToastItem = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      message,
      type
    };
    setToasts((prev) => [newToast, ...prev.slice(0, 3)]);

    // Auto dismiss after 4.5s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleVote = (placeId: string, direction: 'dum' | 'reject') => {
    setPlaces((prev) =>
      prev.map((p) => {
        if (p.id === placeId) {
          return {
            ...p,
            votes: {
              dum: direction === 'dum' ? p.votes.dum + 1 : p.votes.dum,
              rejected: direction === 'reject' ? p.votes.rejected + 1 : p.votes.rejected
            }
          };
        }
        return p;
      })
    );
    setCurrentVoteIndex((prev) => Math.min(prev + 1, places.length));

    // Simulate random friend reaction
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
    if (randomFriend && randomFriend.name !== 'Suresh') {
      const reactions = [
        `"Good call on the ghee ratio!"`,
        `"Bro my stomach is already roaring."`,
        `"If there's no onion salad I'm not eating."`,
        `"Approved by Dum standards!"`
      ];
      setFriends((prev) =>
        prev.map((f) =>
          f.id === randomFriend.id
            ? { ...f, speechBubble: reactions[Math.floor(Math.random() * reactions.length)], isSwiping: true }
            : f
        )
      );
    }
  };

  const handleKickSuresh = () => {
    setFriends((prev) => prev.filter((f) => f.name !== 'Suresh'));
    sound.playReject();
    triggerHaptic('reject');
    addToast(
      'SURESH EXILED!',
      'Suresh has been banished to the Paneer Pulao realm for culinary heresy.',
      'alert'
    );
  };

  const handleFriendClick = (friend: PanchayatFriend) => {
    if (friend.name === 'Suresh') {
      setIsVegTrollOpen(true);
    } else {
      addToast(
        `${friend.name.toUpperCase()} SAYS:`,
        friend.speechBubble,
        'slang'
      );
    }
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  return (
    <div className="min-h-screen bg-[#141414] text-[#F5F5DC] flex flex-col font-sans relative overflow-x-hidden">
      {/* Toast Notification Layer */}
      <ToastManager toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main Top Header */}
      <Header
        currentCardIndex={currentVoteIndex}
        totalCards={places.length}
        activeScreen={activeScreen === 'underground' ? 'arena' : activeScreen}
        onSelectScreen={(screen) => setActiveScreen(screen)}
        onTriggerVegTroll={() => setIsVegTrollOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Screen Body */}
      <main className="flex-1 flex flex-col pb-24">
        {activeScreen === 'arena' && (
          <VotingArena
            places={places}
            onVote={handleVote}
            onShowToast={addToast}
            onNavigateToVerdict={() => setActiveScreen('verdict')}
          />
        )}

        {activeScreen === 'verdict' && (
          <VerdictScreen
            places={places}
            onTriggerUstadLoader={() => setActiveScreen('ustad')}
            onShowToast={addToast}
          />
        )}

        {activeScreen === 'ustad' && (
          <UstadLoader
            onComplete={() => {
              setActiveScreen('verdict');
              addToast('VERDICT BAKED TO PERFECTION', 'Podium rankings updated with fresh data.', 'dum');
            }}
          />
        )}

        {activeScreen === 'underground' && (
          <UndergroundMode
            onExit={() => setActiveScreen('arena')}
            onShowToast={addToast}
          />
        )}
      </main>

      {/* Bottom Fixed Panchayat Avatars Bar (always active unless in Underground mode) */}
      {activeScreen !== 'underground' && (
        <div className="fixed bottom-0 inset-x-0 z-30">
          <PanchayatBar
            friends={friends}
            onFriendClick={handleFriendClick}
            onKickSuresh={handleKickSuresh}
          />
        </div>
      )}

      {/* Hidden Ghee-Stained Fingerprint Trigger (Hold to decrypt Underground Gems) */}
      {activeScreen !== 'underground' && (
        <GheeFingerprintTrigger
          onUnlock={() => {
            setActiveScreen('underground');
            addToast('DEEP-WEB MODE UNLOCKED', 'Entered classified alleyway intel network.', 'alert');
          }}
        />
      )}

      {/* Veg Biryani 404 Troll Modal */}
      <VegTrollModal
        isOpen={isVegTrollOpen}
        onClose={() => setIsVegTrollOpen(false)}
        onKickSuresh={handleKickSuresh}
      />
    </div>
  );
}
