import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import {
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";

// Font map passed to useFonts() in _layout.tsx
export const FontMap = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  CormorantGaramond_400Regular,
  CormorantGaramond_500Medium,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
};

// Semantic aliases used in styles throughout the app
export const Fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semiBold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  serifRegular: "CormorantGaramond_400Regular",
  serifMedium: "CormorantGaramond_500Medium",
  serifSemiBold: "CormorantGaramond_600SemiBold",
  serifBold: "CormorantGaramond_700Bold",
} as const;

export type FontWeight = keyof typeof Fonts;
