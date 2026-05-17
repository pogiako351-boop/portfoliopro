import { ImageSource } from "expo-image";

const imageMap: Record<string, ImageSource> = {
  "patek-nautilus": require("@/assets/images/patek-nautilus.png"),
  "ap-royal-oak": require("@/assets/images/ap-royal-oak.png"),
  "rolex-daytona": require("@/assets/images/rolex-daytona.png"),
};

export function getAssetImage(key: string): ImageSource {
  return imageMap[key] || imageMap["patek-nautilus"];
}
