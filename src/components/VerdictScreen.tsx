import React, { useState, useMemo } from 'react';
import { BiryaniPlace, HungerLevel } from '../types/biryani';
import { HandiPodiumItem } from './HandiCanvas';
import { RadarChart } from './RadarChart';
import {
  Flame,
  Award,
  AlertTriangle,
  Compass,
  ChevronDown,
  ChevronUp,
  MapPin,
  Clock,
  Sparkles,
  Share2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { sound, triggerHaptic } from '../utils/audio';

interface VerdictScreenProps {
  places: BiryaniPlace[];
  onTriggerUstadLoader: () => void;
  onShowToast: (title: string, message: string, type: 'slang' | 'alert' | 'dum' | 'reject' | 'troll') => void;
}

export const VerdictScreen: React.FC<VerdictScreenProps> = ({
  places,
  onTriggerUstadLoader,
  onShowToast,
}) => {
  const [hungerLevel, setHungerLevel] = useState<HungerLevel>('hungry');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [showIntelDrawer, setShowIntelDrawer] = useState<boolean>(false);

  // Dynamic re-ranking algorithm based on Hunger Level Slider
  const rankedPlaces = useMemo(() => {
    return [...places].map(place => {
      let distanceWeight = 0.25;
      let ratingWeight = 0.35;
      let yaarDostWeight = 0.25;
      let botiWeight = 0.15;

      if (hungerLevel === 'snacking') {
        // Gourmet quality and rating matter most, distance is secondary
        distanceWeight = 0.1;
        ratingWeight = 0.5;
        yaarDostWeight = 0.25;
        botiWeight = 0.15;
      } else if (hungerLevel === 'dying') {
        // Starvation emergency! Distance dominates (Thandah Na Ho Jaye & immediate food!)
        distanceWeight = 0.65;
        ratingWeight = 0.15;
        yaarDostWeight = 0.1;
        botiWeight = 0.1;
      }

      // Calculate composite Weighted Biryani Score (WBS)
      const wbs =
        place.intelMetrics.distanceImpact * distanceWeight +
        place.intelMetrics.publicOpinion * ratingWeight +
        place.intelMetrics.yaarDostLove * yaarDostWeight +
        place.intelMetrics.botiRatio * botiWeight;

      return {
        ...place,
        computedWbs: Number(wbs.toFixed(1)),
        isRescue: hungerLevel === 'dying' && place.distanceKm <= 2.5
      };
    }).sort((a, b) => b.computedWbs - a.computedWbs);
  }, [places, hungerLevel]);

  // Current winner is rank 1
  const winner = rankedPlaces[0];
  const rank2 = rankedPlaces[1];
  const rank3 = rankedPlaces[2];

  // Currently focused restaurant for Intel Radar & Reality Check
  const activePlace = useMemo(() => {
    if (selectedPlaceId) {
      return rankedPlaces.find(p => p.id === selectedPlaceId) || winner;
    }
    return winner;
  }, [rankedPlaces, selectedPlaceId, winner]);

  const handleHungerChange = (newLevel: HungerLevel) => {
    setHungerLevel(newLevel);
    sound.playSizzle();
    triggerHaptic('hungry');

    if (newLevel === 'dying') {
      onShowToast(
        '🚨 EMERGENCY MODE: DYING OF HUNGER!',
        'Distance weight jacked up to 65%! Rescue Squad deployed to the front.',
        'alert'
      );
    } else if (newLevel === 'snacking') {
      onShowToast(
        'Gourmet Mode Active',
        'Patience mode enabled: Distance penalty relaxed for pure taste.',
        'dum'
      );
    } else {
      onShowToast('Balanced Appetite', 'Standard weighted Panchayat formula applied.', 'dum');
    }
  };

  const handleShareVerdict = () => {
    sound.playClink();
    navigator.clipboard?.writeText(
      `Biryani War Room #42 Verdict: ${winner.name} won Rank 1 with ${winner.computedWbs} WBS! Order right now!`
    );
    onShowToast('VERDICT COPIED!', 'Share with the WhatsApp group to end the argument.', 'slang');
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Banner: Verdict Announcement */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#2D2D2D] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-widest">
              OFFICIAL PANCHAYAT GAZETTE
            </span>
            <span className="text-[10px] bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800 font-bold uppercase">
              DECREE FINAL
            </span>
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mt-1">
            THE BIRYANI VERDICT & PODIUM
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerUstadLoader}
            className="px-3.5 py-2 rounded-xl bg-[#222222] hover:bg-[#2C2C2C] border border-[#3A3A3A] text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            Re-Simulate Coal Fire
          </button>

          <button
            onClick={handleShareVerdict}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-[#FF9933] text-black font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Decree
          </button>
        </div>
      </div>

      {/* SECTION 1: 3D CLAY HANDI PODIUM (Rank 2 - Rank 1 - Rank 3) */}
      <div className="bg-gradient-to-b from-[#1C1714] via-[#161312] to-[#121212] border-2 border-amber-900/40 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative smoke background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            THE TRIUMPHANT TRIO
          </span>
          <p className="text-xs text-zinc-400 mt-0.5">
            Tap any Clay Handi to inspect its radar telemetry and unfiltered reality check
          </p>
        </div>

        {/* Podium Layout: Rank 2 on Left, Rank 1 in Center (Taller), Rank 3 on Right */}
        <div className="flex items-end justify-center gap-2 sm:gap-6 md:gap-10 pt-4 pb-2 overflow-x-auto">
          {/* Rank 2 (Silver Handi) */}
          {rank2 && (
            <HandiPodiumItem
              rank={2}
              wbsScore={rank2.computedWbs}
              restaurantName={rank2.name}
              style={rank2.style}
              distanceKm={rank2.distanceKm}
              isRescueSquad={rank2.isRescue}
              isHighlighted={activePlace.id === rank2.id}
              onClick={() => {
                sound.playClink();
                setSelectedPlaceId(rank2.id);
              }}
            />
          )}

          {/* Rank 1 (Gold Handi - King of Dum) */}
          {winner && (
            <HandiPodiumItem
              rank={1}
              wbsScore={winner.computedWbs}
              restaurantName={winner.name}
              style={winner.style}
              distanceKm={winner.distanceKm}
              isRescueSquad={winner.isRescue}
              isHighlighted={activePlace.id === winner.id}
              onClick={() => {
                sound.playClink();
                setSelectedPlaceId(winner.id);
              }}
            />
          )}

          {/* Rank 3 (Bronze Handi) */}
          {rank3 && (
            <HandiPodiumItem
              rank={3}
              wbsScore={rank3.computedWbs}
              restaurantName={rank3.name}
              style={rank3.style}
              distanceKm={rank3.distanceKm}
              isRescueSquad={rank3.isRescue}
              isHighlighted={activePlace.id === rank3.id}
              onClick={() => {
                sound.playClink();
                setSelectedPlaceId(rank3.id);
              }}
            />
          )}
        </div>
      </div>

      {/* SECTION 2: THE HUNGER LEVEL SLIDER */}
      <div className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-2xl p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
              METABOLIC URGENCY SENSOR
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Select Your Group's Hunger Level:
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-[#252525] px-2.5 py-1 rounded border border-[#333333]">
            Active Weight: {hungerLevel === 'dying' ? 'Distance Priority (65%)' : hungerLevel === 'snacking' ? 'Quality Priority (50%)' : 'Balanced (35% rating, 25% dist)'}
          </span>
        </div>

        {/* Visual 3-Stage Slider Control */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2">
          <button
            onClick={() => handleHungerChange('snacking')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
              hungerLevel === 'snacking'
                ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-500/20'
                : 'bg-[#222222] border-[#333333] text-zinc-400 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <span className="text-2xl">🥨</span>
            <span className="font-bebas text-lg tracking-wider">SNACKING</span>
            <span className="text-[10px] text-zinc-400 text-center">
              Chill mode. Taste &gt; Distance.
            </span>
          </button>

          <button
            onClick={() => handleHungerChange('hungry')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
              hungerLevel === 'hungry'
                ? 'bg-orange-950/60 border-orange-500 text-white shadow-lg shadow-orange-500/20'
                : 'bg-[#222222] border-[#333333] text-zinc-400 hover:text-white hover:bg-[#282828]'
            }`}
          >
            <span className="text-2xl">🤤</span>
            <span className="font-bebas text-lg tracking-wider">HUNGRY</span>
            <span className="text-[10px] text-zinc-400 text-center">
              Standard appetite. Balanced WBS.
            </span>
          </button>

          <button
            onClick={() => handleHungerChange('dying')}
            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all relative overflow-hidden ${
              hungerLevel === 'dying'
                ? 'bg-red-950/80 border-red-500 text-white shadow-xl shadow-red-600/30 ring-2 ring-red-500/50'
                : 'bg-[#222222] border-[#333333] text-zinc-400 hover:text-white hover:bg-[#282828]'
            }`}
          >
            {hungerLevel === 'dying' && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
            )}
            <span className="text-2xl animate-pulse">💀</span>
            <span className="font-bebas text-lg tracking-wider text-red-400">DYING (STARVING)</span>
            <span className="text-[10px] text-red-200/80 text-center">
              Nearest spot wins! Speed is life.
            </span>
          </button>
        </div>
      </div>

      {/* SECTION 3: THE WINNER SPOTLIGHT & HATERS' CORNER */}
      <div className="bg-[#1C1C1C] border border-[#333333] rounded-3xl p-5 sm:p-7 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#2E2E2E] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                INSPECTING {activePlace.id === winner.id ? 'WINNER (#1)' : `#${rankedPlaces.findIndex(p => p.id === activePlace.id) + 1}`}
              </span>
            </div>
            <h3 className="font-bebas text-3xl text-white tracking-wide mt-1">
              {activePlace.name}
            </h3>
            <p className="text-xs text-amber-200/80">{activePlace.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">Weighted Score</span>
              <span className="font-bebas text-3xl text-amber-400 font-bold leading-none">
                {activePlace.computedWbs} <span className="text-sm font-sans text-zinc-400">WBS</span>
              </span>
            </div>

            <button
              onClick={() => {
                sound.playClink();
                setShowIntelDrawer(!showIntelDrawer);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#282828] hover:bg-[#333333] border border-[#444444] text-xs font-semibold text-amber-400 hover:text-white transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              {showIntelDrawer ? 'Hide Intel' : 'View Intel Radar'}
              {showIntelDrawer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable Radar Chart Intel Drawer */}
        {showIntelDrawer && (
          <div className="my-5 animate-in fade-in duration-300">
            <RadarChart
              metrics={activePlace.intelMetrics}
              restaurantName={activePlace.name}
            />
          </div>
        )}

        {/* Meat, Rice, Elaichi specs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 text-xs">
          <div className="bg-[#242424] p-3 rounded-xl border border-[#333333]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Distance to Table</span>
            <span className="font-bold text-white text-sm mt-0.5 block">{activePlace.distanceKm} km ({activePlace.etaMins}m ETA)</span>
          </div>
          <div className="bg-[#242424] p-3 rounded-xl border border-[#333333]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Meat Spec</span>
            <span className="font-bold text-white text-sm mt-0.5 block truncate">{activePlace.meat}</span>
          </div>
          <div className="bg-[#242424] p-3 rounded-xl border border-[#333333]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Elaichi Landmines</span>
            <span className="font-bold text-amber-400 text-sm mt-0.5 block">{activePlace.elaichiCount} Hidden Bombs</span>
          </div>
          <div className="bg-[#242424] p-3 rounded-xl border border-[#333333]">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Ghee Purity Score</span>
            <span className="font-bold text-emerald-400 text-sm mt-0.5 block">{activePlace.gheeScore} / 10 Pure Ghee</span>
          </div>
        </div>

        {/* THE "HATERS’ CORNER" (Adversary UI) */}
        {/* Requirement: A jagged, red-bordered box at the bottom of the winning card */}
        <div className="mt-5 border-2 border-dashed border-red-600/80 bg-gradient-to-r from-red-950/50 via-rose-950/30 to-red-950/50 rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <h4 className="font-bebas text-xl sm:text-2xl text-red-400 tracking-wider">
                {activePlace.realityCheck.headline}
              </h4>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-red-900/60 text-red-200 border border-red-700">
              {activePlace.realityCheck.tag}
            </span>
          </div>

          {/* Adversary Quote */}
          <blockquote className="text-sm sm:text-base text-zinc-200 font-serif italic border-l-2 border-red-500 pl-3 my-2 leading-relaxed">
            "{activePlace.realityCheck.quote}"
          </blockquote>

          <div className="flex items-center justify-between text-xs text-red-300/80 mt-3 pt-2 border-t border-red-800/40">
            <span>Verified Adversary: <strong>{activePlace.realityCheck.reviewer}</strong></span>
            <span className="font-mono text-[10px] uppercase">Zero Paid PR Allowed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
