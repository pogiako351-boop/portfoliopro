import type { Asset } from "@/store/types";

export const ASSETS: Asset[] = [
  // === TIMEPIECES ===
  {
    id: "patek-philippe-nautilus-5711",
    title: "Patek Philippe Nautilus 5711/1A-010",
    category: "Timepiece",
    imageUrl: "patek-nautilus",
    msrp: 34800,
    marketValue: 118000,
    description:
      "Dial: Piano Blue | Case: Steel. Sovereign-Hold status.",
    isFeatured: true,
  },
  {
    id: "audemars-piguet-royal-oak",
    title: "Audemars Piguet Royal Oak 'Jumbo' 16202ST",
    category: "Timepiece",
    imageUrl: "ap-royal-oak",
    msrp: 33200,
    marketValue: 74500,
    description:
      "Dial: Bleu Nuit | Case: Steel. Hyper-Demand velocity.",
    isFeatured: true,
  },
  {
    id: "rolex-daytona-le-mans",
    title: "Rolex Daytona 'Le Mans' 126529LN",
    category: "Timepiece",
    imageUrl: "rolex-daytona",
    msrp: 51400,
    marketValue: 165000,
    description:
      "Dial: Reverse Panda | Case: 18k White Gold. Critical Scarcity.",
    isFeatured: true,
  },
  {
    id: "richard-mille-rm56-02",
    title: "Richard Mille RM 56-02 Tourbillon Sapphire",
    category: "Timepiece",
    imageUrl: "richard-mille",
    msrp: 202000,
    marketValue: 3450000,
    description:
      "Pure Sapphire Crystal Case. Cable-Suspension Movement. Ghost-Tier Rarity.",
    isFeatured: false,
  },
  {
    id: "rolex-gmt-pepsi",
    title: "Rolex GMT-Master II 'Pepsi' 126710BLRO",
    category: "Timepiece",
    imageUrl: "rolex-gmt-pepsi",
    msrp: 10900,
    marketValue: 21800,
    description:
      "Oystersteel | Jubilee Bracelet. Continuous Retail Queue Waitlist.",
    isFeatured: false,
  },

  // === HYPERCARS ===
  {
    id: "ferrari-f80-allocation",
    title: "2026 Ferrari F80 Flagship",
    category: "Hypercar",
    imageUrl: "ferrari-f80",
    msrp: 3735000,
    marketValue: 5100000,
    description:
      "1200HP V6 Hybrid. Production capped at 799 units. Immediate contract transfer.",
    isFeatured: true,
  },
  {
    id: "bugatti-tourbillon",
    title: "Bugatti Tourbillon Slot",
    category: "Hypercar",
    imageUrl: "bugatti-tourbillon",
    msrp: 4100000,
    marketValue: 5800000,
    description:
      "Naturally Aspirated V16 Cosworth Engine + Triple Electric Motors. 1,800HP Masterpiece.",
    isFeatured: true,
  },
  {
    id: "porsche-gt3rs-992",
    title: "Porsche 911 GT3 RS (992.2)",
    category: "Hypercar",
    imageUrl: "porsche-gt3rs",
    msrp: 241300,
    marketValue: 356300,
    description:
      "PTS (Paint to Sample) Slot Confirmed. Ultra-Track Weapon Allocation.",
    isFeatured: false,
  },
  {
    id: "lamborghini-revuelto",
    title: "Lamborghini Revuelto V12",
    category: "Hypercar",
    imageUrl: "lamborghini-revuelto",
    msrp: 608000,
    marketValue: 818000,
    description:
      "Bypass 24-Month Factory Waitlist. Immediate physical allocation delivery.",
    isFeatured: false,
  },
  {
    id: "mclaren-w1",
    title: "McLaren W1 Production Slot",
    category: "Hypercar",
    imageUrl: "mclaren-w1",
    msrp: 2100000,
    marketValue: 3200000,
    description:
      "The iconic post-P1 hybrid apex hypercar. Built strictly for tier-1 collectors.",
    isFeatured: false,
  },

  // === PREMIER ESTATES ===
  {
    id: "monaco-coastal-villa",
    title: "Monaco Coastal Villa",
    category: "Real Estate",
    imageUrl: "monaco-villa",
    msrp: 45000000,
    marketValue: 85000000,
    description:
      "Exclusive cliffside estate with private helipad and direct Mediterranean sea ingress.",
    isFeatured: true,
  },
  {
    id: "manhattan-penthouse",
    title: "Billionaires' Row Penthouse",
    category: "Real Estate",
    imageUrl: "manhattan-penthouse",
    msrp: 22000000,
    marketValue: 42500000,
    description:
      "Full-floor duplex residence with 360-degree Central Park and skyline visibility.",
    isFeatured: false,
  },
  {
    id: "dubai-palm-mansion",
    title: "Palm Jumeirah Mansion",
    category: "Real Estate",
    imageUrl: "dubai-palm-mansion",
    msrp: 18500000,
    marketValue: 31000000,
    description:
      "Ultra-modern private beachfront estate with zero-edge infinity pool and private yacht berth.",
    isFeatured: false,
  },
  {
    id: "tokyo-roppongi-skyvilla",
    title: "Roppongi Hills Sky Villa",
    category: "Real Estate",
    imageUrl: "tokyo-skyvilla",
    msrp: 12000000,
    marketValue: 19500000,
    description:
      "Triplex penthouse with private rooftop onsen looking directly onto Tokyo Tower.",
    isFeatured: false,
  },
];
