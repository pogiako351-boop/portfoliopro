import { ImageSource } from "expo-image";

const imageMap: Record<string, ImageSource> = {
  "rembrandt-night-watch": require("@/assets/images/rembrandt-night-watch.png"),
  "monaco-villa": require("@/assets/images/monaco-villa.png"),
  "ferrari-testa-rossa": require("@/assets/images/ferrari-testa-rossa.png"),
  "manhattan-penthouse": require("@/assets/images/manhattan-penthouse.png"),
  "patek-philippe": require("@/assets/images/patek-philippe.png"),
  "abstract-gold-art": require("@/assets/images/abstract-gold-art.png"),
};

export function getAssetImage(key: string): ImageSource {
  return imageMap[key] || imageMap["rembrandt-night-watch"];
}
