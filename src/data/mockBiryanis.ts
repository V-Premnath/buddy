import { BiryaniPlace, PanchayatFriend, UndergroundSpot } from '../types/biryani';

export const INITIAL_BIRYANI_PLACES: BiryaniPlace[] = [
  {
    id: 'shadab-dum-01',
    name: 'Hotel Shadab Khansama Degh',
    tagline: 'Legacy Old-City Dum with caramelized birista & saffron marrow',
    style: 'Hyderabadi Dum',
    cityLocation: 'Ghansi Bazaar, Near High Court Gate',
    distanceKm: 3.4,
    etaMins: 28,
    spiceLevel: 5,
    isSpicy: true,
    rating: 4.8,
    reviewCount: 42100,
    priceForTwo: 540,
    meat: 'Tender Mutton Shank',
    rice: 'Extra Long Aged Basmati',
    elaichiCount: 7,
    gheeScore: 9.6,
    realityCheck: {
      headline: 'THE REALITY CHECK',
      quote: 'Taste top-class, but the leg piece is smaller than a chicken wing. Dhokha hai! Aur raita itna patla jaise paani ka siphon.',
      reviewer: 'Tauseef (Self-Proclaimed Dum Commissioner)',
      tag: 'Boti Shortage Alert'
    },
    intelMetrics: {
      distanceImpact: 76,
      publicOpinion: 96,
      yaarDostLove: 92,
      botiRatio: 78,
      dumIntegrity: 98,
    },
    votes: { dum: 14, rejected: 2 },
    cardColor: {
      accent: '#FF9933',
      gradient: 'from-[#2A1810] via-[#1D1410] to-[#121212]',
      border: 'border-[#FF9933]/40'
    }
  },
  {
    id: 'dindigul-thalappa-02',
    name: 'Dindigul Thalappakatti 1957',
    tagline: 'Seeraga Samba pepper infusion with fall-off-the-bone goat',
    style: 'Dindigul Thalappakatti',
    cityLocation: 'Cantonment 2nd Cross, 5 min away',
    distanceKm: 1.4,
    etaMins: 14,
    spiceLevel: 4,
    isSpicy: true,
    rating: 4.6,
    reviewCount: 28900,
    priceForTwo: 620,
    meat: 'Slow-Cooked Goat',
    rice: 'Seeraga Samba',
    elaichiCount: 2,
    gheeScore: 8.9,
    realityCheck: {
      headline: 'THE REALITY CHECK',
      quote: 'Short grain rice feels like pulao for 2 seconds until the black pepper explodes like a grenade. Your nose will run for 3 business days.',
      reviewer: 'Karthik S. (Cardamom Survivor)',
      tag: 'Pepper Landmine'
    },
    intelMetrics: {
      distanceImpact: 97, // Super close!
      publicOpinion: 89,
      yaarDostLove: 84,
      botiRatio: 92,
      dumIntegrity: 88,
    },
    votes: { dum: 11, rejected: 3 },
    cardColor: {
      accent: '#10B981',
      gradient: 'from-[#14231A] via-[#121A15] to-[#121212]',
      border: 'border-[#10B981]/40'
    }
  },
  {
    id: 'idrees-awadh-03',
    name: 'Idrees Awadhi Shahi Dastarkhwan',
    tagline: 'Fragrant Kewra & saffron cooked in pure sealed clay pot',
    style: 'Awadhi Lucknowi',
    cityLocation: 'Nakkhas Chowk, Deep North Extension',
    distanceKm: 15.2, // Will trigger the 15km toast!
    etaMins: 72,
    spiceLevel: 2,
    isSpicy: false,
    rating: 4.9,
    reviewCount: 16500,
    priceForTwo: 590,
    meat: 'Juicy Chicken Leg Piece',
    rice: 'Extra Long Aged Basmati',
    elaichiCount: 11,
    gheeScore: 9.9,
    realityCheck: {
      headline: 'THE REALITY CHECK',
      quote: 'Smells like heaven, but so mild that Suresh asked if it was diet food. Also distance is so far your hunger will pass away in transit.',
      reviewer: 'Mirza Sahab (Nawab of Complaints)',
      tag: 'Distance Hazard'
    },
    intelMetrics: {
      distanceImpact: 24, // Terrible distance!
      publicOpinion: 98,
      yaarDostLove: 79,
      botiRatio: 90,
      dumIntegrity: 99,
    },
    votes: { dum: 9, rejected: 6 },
    cardColor: {
      accent: '#EAB308',
      gradient: 'from-[#282210] via-[#1B1710] to-[#121212]',
      border: 'border-[#EAB308]/40'
    }
  },
  {
    id: 'arsalan-kolkata-04',
    name: 'Arsalan Royal Park Circus',
    tagline: 'Melted golden spiced potato, boiled egg & sweet nutmeg aroma',
    style: 'Kolkata Royal',
    cityLocation: 'Park Circus 7-Point Crossing',
    distanceKm: 4.8,
    etaMins: 34,
    spiceLevel: 3,
    isSpicy: false,
    rating: 4.7,
    reviewCount: 37400,
    priceForTwo: 520,
    meat: 'Spiced Egg & Aloo',
    rice: 'Extra Long Aged Basmati',
    elaichiCount: 4,
    gheeScore: 8.7,
    realityCheck: {
      headline: 'THE REALITY CHECK',
      quote: 'The potato stole the whole show, mutton took secondary artist billing. If you fight for the potato, friendship is officially terminated.',
      reviewer: 'Sourav B. (Aloo Maximalist)',
      tag: 'Potato Hegemony'
    },
    intelMetrics: {
      distanceImpact: 69,
      publicOpinion: 93,
      yaarDostLove: 88,
      botiRatio: 72,
      dumIntegrity: 91,
    },
    votes: { dum: 12, rejected: 3 },
    cardColor: {
      accent: '#F97316',
      gradient: 'from-[#291B12] via-[#1C1612] to-[#121212]',
      border: 'border-[#F97316]/40'
    }
  },
  {
    id: 'meghana-volcano-05',
    name: 'Meghana Spicy Dum Station',
    tagline: 'Scorching green chili marinade, extra gravy bowl included',
    style: 'Hyderabadi Dum',
    cityLocation: 'Koramangala 5th Block Hub',
    distanceKm: 2.2,
    etaMins: 20,
    spiceLevel: 5,
    isSpicy: true,
    rating: 4.5,
    reviewCount: 52000,
    priceForTwo: 480,
    meat: 'Juicy Chicken Leg Piece',
    rice: 'Extra Long Aged Basmati',
    elaichiCount: 3,
    gheeScore: 8.2,
    realityCheck: {
      headline: 'THE REALITY CHECK',
      quote: 'Not biryani, this is a volcanic lava experiment with rice toppings. Eat at your own digestive peril. Two bottles of cold Thums Up mandatory.',
      reviewer: 'Vikram R. (ICU Evacuee)',
      tag: 'Hazard Level Red'
    },
    intelMetrics: {
      distanceImpact: 88,
      publicOpinion: 85,
      yaarDostLove: 86,
      botiRatio: 85,
      dumIntegrity: 76,
    },
    votes: { dum: 10, rejected: 5 },
    cardColor: {
      accent: '#EF4444',
      gradient: 'from-[#2D1212] via-[#1B1111] to-[#121212]',
      border: 'border-[#EF4444]/40'
    }
  },
  {
    id: 'bhatkali-sufi-06',
    name: 'Bhatkali Sufi Coastal Handi',
    tagline: 'Coastal spiced onion masala with delicate jeerakasala rice',
    style: 'Bhatkali Sufi',
    cityLocation: 'Fish Market By-Lane, Port Ward',
    distanceKm: 6.9,
    etaMins: 42,
    spiceLevel: 3,
    isSpicy: false,
    rating: 4.6,
    reviewCount: 9200,
    priceForTwo: 550,
    meat: 'Tender Mutton Shank',
    rice: 'Fragrant Kaima',
    elaichiCount: 5,
    gheeScore: 9.3,
    realityCheck: {
      headline: 'THE REALITY CHECK',
      quote: 'White rice with secret red onion masala hidden underneath. One bite you think it is bland, next bite your soul leaves your body.',
      reviewer: 'Rashid Khan (Coastal Recon)',
      tag: 'Submerged Masala'
    },
    intelMetrics: {
      distanceImpact: 58,
      publicOpinion: 87,
      yaarDostLove: 81,
      botiRatio: 84,
      dumIntegrity: 93,
    },
    votes: { dum: 8, rejected: 4 },
    cardColor: {
      accent: '#14B8A6',
      gradient: 'from-[#122320] via-[#111A18] to-[#121212]',
      border: 'border-[#14B8A6]/40'
    }
  }
];

export const PANCHAYAT_FRIENDS: PanchayatFriend[] = [
  {
    id: 'f-rahul',
    name: 'Rahul',
    avatarBg: 'bg-amber-600',
    avatarEmoji: '💸',
    isSwiping: true,
    speechBubble: 'Typical Rahul, picking the cheapest one',
    role: 'The Budget Miser',
    lastVote: 'REJECT'
  },
  {
    id: 'f-suresh',
    name: 'Suresh',
    avatarBg: 'bg-emerald-600',
    avatarEmoji: '🥦',
    isSwiping: false,
    speechBubble: 'Suresh is looking for Veg Biryani... kick him?',
    role: 'The Impostor',
    lastVote: 'REJECT'
  },
  {
    id: 'f-priya',
    name: 'Priya',
    avatarBg: 'bg-rose-600',
    avatarEmoji: '🥣',
    isSwiping: true,
    speechBubble: 'Extra raita & salna or I boycott this election',
    role: 'Raita Inspector',
    lastVote: 'DUM'
  },
  {
    id: 'f-vikram',
    name: 'Vikram',
    avatarBg: 'bg-orange-600',
    avatarEmoji: '🍗',
    isSwiping: false,
    speechBubble: 'Checking if the mutton dissolves or fights back',
    role: 'Boti Auditor',
    lastVote: 'DUM'
  },
  {
    id: 'f-ananya',
    name: 'Ananya',
    avatarBg: 'bg-purple-600',
    avatarEmoji: '⭐',
    isSwiping: true,
    speechBubble: 'Under 4.5 rating is an insult to our bloodline',
    role: 'Zomato Snob',
    lastVote: 'DUM'
  },
  {
    id: 'f-kabir',
    name: 'Kabir',
    avatarBg: 'bg-yellow-600',
    avatarEmoji: '🥔',
    isSwiping: false,
    speechBubble: 'No potato in biryani? Straight to jail.',
    role: 'Aloo Extremist',
    lastVote: 'DUM'
  }
];

export const UNDERGROUND_GEMS: UndergroundSpot[] = [
  {
    id: 'gem-chacha-01',
    alias: 'Chacha Ki 3 AM Secret Degh',
    codeName: 'OPERATIVE: GHEE-VIPER',
    coordinates: '17.3616° N, 78.4747° E (Old Fort Ward)',
    landmarks: 'Behind the blue gate, ask for Chacha. Knock 3 times.',
    neuralGheeRatio: 96.4,
    botiTenderness: 'Velvet / Zero Resistance',
    aiJustification: 'Our neural network detected high Ghee-to-Rice ratios in this alleyway. No brand, just bangers.',
    secretSlang: 'Asli maal idhar hai, baaki sab moh-maya hai.',
    batchTiming: 'Opens 02:45 AM · Sells out by 04:15 AM sharp',
    passwordPhrase: '"Bhaijaan, degh ka nichla hissa dena"',
    dangerLevel: 'Pure Alchemy'
  },
  {
    id: 'gem-cantonment-02',
    alias: 'The Railway Signal Matka Cellar',
    codeName: 'OPERATIVE: COAL-SHADOW',
    coordinates: '12.9716° N, 77.5946° E (Line 4 Shed)',
    landmarks: 'Under the abandoned signal box, follow the fried onion smoke.',
    neuralGheeRatio: 91.8,
    botiTenderness: 'Fall-off-the-bone in 4 seconds flat',
    aiJustification: 'Acoustic thermal sensors detected slow-wood charcoal dum burning at uniform 78°C for 6 hours uninterrupted.',
    secretSlang: 'Bina board ki dukan, par swad mein Hindustan.',
    batchTiming: 'Thursdays & Sundays after midnight only',
    passwordPhrase: '"Double salna, single chawal"',
    dangerLevel: 'Stealth'
  },
  {
    id: 'gem-nawabi-03',
    alias: 'Peeru Ustad’s 100-Year Brass Vessel',
    codeName: 'OPERATIVE: ITTAR-PROTOCOL',
    coordinates: '26.8467° N, 80.9462° E (Narrow Galis)',
    landmarks: 'Third wooden door past the spice mill, guarded by a very sleepy cat.',
    neuralGheeRatio: 94.2,
    botiTenderness: 'Infused with edible gold and attar essence',
    aiJustification: 'Spectrometry analysis reveals zero artificial coloring; 100% genuine Kashmiri saffron strings.',
    secretSlang: 'Dilli se log flight pakad ke aate hain chupke se.',
    batchTiming: 'Only 30 plates per afternoon',
    passwordPhrase: '"Ustad ko salam bolna"',
    dangerLevel: 'Sub-Radar'
  }
];

export const LOADING_ROASTS = [
  { progress: 10, message: 'Marinating the data... thoda sabr rakho.' },
  { progress: 40, message: 'Counting the Elaichis to warn you... Landmines ahead.' },
  { progress: 70, message: "Calculating your friend's bad taste... Error: Too high." },
  { progress: 90, message: "Plating the results... Don't lick the screen." }
];
