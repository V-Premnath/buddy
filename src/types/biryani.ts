export type HungerLevel = 'snacking' | 'hungry' | 'dying';

export interface RealityCheckReview {
  headline: string;
  quote: string;
  reviewer: string;
  tag: string;
}

export interface BiryaniIntelMetrics {
  distanceImpact: number; // The "Thandah Na Ho Jaye" metric (0-100)
  publicOpinion: number;  // The "Public Opinion" (0-100)
  yaarDostLove: number;   // The "Yaar-Dost" factor (0-100)
  botiRatio: number;      // Meat-to-rice balance (0-100)
  dumIntegrity: number;   // Saffron aroma and seal strength (0-100)
}

export interface BiryaniPlace {
  id: string;
  name: string;
  tagline: string;
  style: 'Hyderabadi Dum' | 'Awadhi Lucknowi' | 'Kolkata Royal' | 'Dindigul Thalappakatti' | 'Ambur Star' | 'Bhatkali Sufi';
  cityLocation: string;
  distanceKm: number;
  etaMins: number;
  spiceLevel: 1 | 2 | 3 | 4 | 5;
  isSpicy: boolean; // triggers heat-haze animation
  rating: number;
  reviewCount: number;
  priceForTwo: number;
  meat: 'Tender Mutton Shank' | 'Juicy Chicken Leg Piece' | 'Slow-Cooked Goat' | 'Spiced Egg & Aloo';
  rice: 'Extra Long Aged Basmati' | 'Seeraga Samba' | 'Fragrant Kaima';
  elaichiCount: number; // Landmine count
  gheeScore: number; // 1-10
  realityCheck: RealityCheckReview;
  intelMetrics: BiryaniIntelMetrics;
  votes: {
    dum: number;
    rejected: number;
  };
  cardColor: {
    accent: string;
    gradient: string;
    border: string;
  };
}

export interface PanchayatFriend {
  id: string;
  name: string;
  avatarBg: string;
  avatarEmoji: string;
  isSwiping: boolean;
  speechBubble: string;
  role: string;
  lastVote?: 'DUM' | 'REJECT';
}

export interface UndergroundSpot {
  id: string;
  alias: string;
  codeName: string;
  coordinates: string;
  landmarks: string;
  neuralGheeRatio: number; // e.g. 94%
  botiTenderness: string;
  aiJustification: string;
  secretSlang: string;
  batchTiming: string;
  passwordPhrase: string;
  dangerLevel: 'Stealth' | 'Sub-Radar' | 'Pure Alchemy';
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  type: 'slang' | 'alert' | 'dum' | 'reject' | 'troll';
}
