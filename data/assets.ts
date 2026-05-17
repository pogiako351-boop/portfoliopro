import type { Asset } from "@/store/types";

export const ASSETS: Asset[] = [
  {
    id: "1",
    title: "Patek Philippe Nautilus 5711",
    category: "Collectibles",
    imageUrl: "patek-nautilus",
    estimatedValue: "$118,000",
    retailPrice: "$34,800",
    marketPrice: "$118,000",
    description:
      "The ultimate grail watch for collectors worldwide. The Nautilus 5711/1A-010 in stainless steel represents the pinnacle of Gérald Genta's iconic porthole design. Discontinued in 2021, this reference has become one of the most sought-after timepieces in modern horology.",
    provenance:
      "Acquired new from authorized dealer in Geneva, 2021. Complete set with original box, papers, certificate of origin, and purchase receipt. Never sized — original links included. Stored in climate-controlled watch vault.",
    year: 2021,
    isFeatured: true,
    reference: "5711/1A-010",
    material: "Stainless Steel",
    diameter: "40mm",
    movement: "Cal. 324 S C",
    condition: "Unworn",
  },
  {
    id: "2",
    title: "Audemars Piguet Royal Oak 'Jumbo'",
    category: "Collectibles",
    imageUrl: "ap-royal-oak",
    estimatedValue: "$74,500",
    retailPrice: "$33,200",
    marketPrice: "$74,500",
    description:
      "The 15202ST — a direct descendant of the original 1972 Royal Oak designed by Gérald Genta. This 'Jumbo' Extra-Thin model features the legendary blue Grande Tapisserie dial and ultra-slim Cal. 2121 movement, maintaining the pure proportions of the original ref. 5402.",
    provenance:
      "Sourced from an established European collector in 2023. Complete with AP wooden presentation box, warranty card dated 2020, and service booklet. One careful owner since new. Recently authenticated by Audemars Piguet Le Brassus service center.",
    year: 2020,
    isFeatured: true,
    reference: "15202ST.OO.1240ST.01",
    material: "Stainless Steel",
    diameter: "39mm",
    movement: "Cal. 2121",
    condition: "Mint",
  },
  {
    id: "3",
    title: "Rolex Daytona 'Le Mans'",
    category: "Collectibles",
    imageUrl: "rolex-daytona",
    estimatedValue: "$165,000",
    retailPrice: "$51,400",
    marketPrice: "$165,000",
    description:
      "The coveted Daytona 116519LN in 18k white gold — a limited 'Le Mans' edition celebrating Rolex's enduring partnership with the legendary 24 Hours of Le Mans endurance race. Features a striking green-accented dial and Cerachrom bezel with tachymetric scale.",
    provenance:
      "Purchased directly from Rolex boutique, 2022 allocation. Full collector's set including outer shipping box, Rolex green presentation case, warranty card, hang tags, and chronometer certification. Unworn and factory sealed until delivery.",
    year: 2022,
    isFeatured: true,
    reference: "116519LN",
    material: "White Gold",
    diameter: "40mm",
    movement: "Cal. 4130",
    condition: "Unworn",
  },
];
