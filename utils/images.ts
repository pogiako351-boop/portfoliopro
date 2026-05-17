import { ImageSource } from "expo-image";

const imageMap: Record<string, ImageSource> = {
  // Timepieces
  "patek-nautilus": require("@/assets/images/patek-nautilus.png"),
  "ap-royal-oak": require("@/assets/images/ap-royal-oak.png"),
  "rolex-daytona": require("@/assets/images/rolex-daytona.png"),
  "richard-mille": require("@/assets/images/patek-nautilus.png"),
  "rolex-gmt-pepsi": require("@/assets/images/rolex-daytona.png"),
  // Hypercars
  "ferrari-f80": require("@/assets/images/ferrari-testa-rossa.png"),
  "bugatti-tourbillon": require("@/assets/images/ferrari-testa-rossa.png"),
  "porsche-gt3rs": require("@/assets/images/ferrari-testa-rossa.png"),
  "lamborghini-revuelto": require("@/assets/images/ferrari-testa-rossa.png"),
  "mclaren-w1": require("@/assets/images/ferrari-testa-rossa.png"),
  // Real Estate
  "monaco-villa": require("@/assets/images/monaco-villa.png"),
  "manhattan-penthouse": require("@/assets/images/manhattan-penthouse.png"),
  "dubai-palm-mansion": require("@/assets/images/monaco-villa.png"),
  "tokyo-skyvilla": require("@/assets/images/manhattan-penthouse.png"),
};

export function getAssetImage(key: string): ImageSource {
  return imageMap[key] || imageMap["patek-nautilus"];
}
