import type { Asset } from "@/store/types";

export const ASSETS: Asset[] = [
  {
    id: "1",
    title: 'Rembrandt\'s "The Night Watch"',
    category: "Art",
    imageUrl: "rembrandt-night-watch",
    estimatedValue: "$42.5M",
    description:
      "A masterpiece of Dutch Golden Age painting, this monumental work captures the civic guard company of Captain Frans Banning Cocq in extraordinary chiaroscuro. The painting's dramatic use of light and shadow represents the pinnacle of Baroque artistry.",
    provenance:
      "Private European collection since 1947. Authenticated by the Rijksmuseum conservation team. Exhibited at major international institutions.",
    year: 1642,
    isFeatured: true,
  },
  {
    id: "2",
    title: "Monaco Coastal Villa",
    category: "Real Estate",
    imageUrl: "monaco-villa",
    estimatedValue: "$85.0M",
    description:
      "A rare opportunity to acquire a secluded cliffside villa with private beach access and panoramic Mediterranean views. This architectural masterpiece features 12,000 sq ft of living space across four levels.",
    provenance:
      "Built in 1920, meticulously restored in 2019 by award-winning architect Jean-Pierre Villanova. Previous ownership includes European nobility.",
    year: 1920,
    isFeatured: true,
  },
  {
    id: "3",
    title: "1957 Ferrari 250 Testa Rossa",
    category: "Collectibles",
    imageUrl: "ferrari-testa-rossa",
    estimatedValue: "$39.8M",
    description:
      "One of only 22 examples ever produced, this legendary racing Ferrari represents the golden era of motorsport. Numbers-matching engine, documented racing history at Le Mans and Sebring.",
    provenance:
      "Single-family ownership 1962–2018. Complete service records. Concours condition with original bodywork by Scaglietti.",
    year: 1957,
    isFeatured: true,
  },
  {
    id: "4",
    title: "Manhattan Penthouse",
    category: "Real Estate",
    imageUrl: "manhattan-penthouse",
    estimatedValue: "$67.5M",
    description:
      "A trophy penthouse spanning the entire 89th floor with 360-degree views of Central Park, the Hudson River, and the Manhattan skyline. 8,400 sq ft with private elevator and rooftop terrace.",
    provenance:
      "New construction in one of Manhattan's most exclusive towers. Designed by Robert A.M. Stern Architects with interiors by Peter Marino.",
    year: 2023,
    isFeatured: false,
  },
  {
    id: "5",
    title: "Patek Philippe Grand Complications",
    category: "Collectibles",
    imageUrl: "patek-philippe",
    estimatedValue: "$31.2M",
    description:
      "The Grandmaster Chime Reference 6300A — the most complicated wristwatch ever made by Patek Philippe. Features 20 complications including five chiming modes and two dials.",
    provenance:
      "Originally sold at Only Watch 2019 charity auction. One of one in steel. Complete with original box, papers, and certificate of authenticity.",
    year: 2019,
    isFeatured: false,
  },
  {
    id: "6",
    title: "Abstract Gold Composition",
    category: "Art",
    imageUrl: "abstract-gold-art",
    estimatedValue: "$8.7M",
    description:
      "A stunning large-scale oil on canvas featuring layered gold leaf and deep ultramarine pigments. The work explores the tension between opulence and void, material and immaterial.",
    provenance:
      "Created in 2021 by contemporary artist Elara Voss. Exhibited at Art Basel and Frieze. Acquired directly from the artist's studio.",
    year: 2021,
    isFeatured: false,
  },
];
