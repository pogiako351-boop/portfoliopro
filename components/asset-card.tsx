import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import type { Asset } from "@/store/types";
import { getAssetImage } from "@/utils/images";

interface AssetCardProps {
  asset: Asset;
  width: number;
  onPress: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Art: "#6B4C9A",
  "Real Estate": "#2D6A4F",
  Collectibles: "#8B5E3C",
};

export function AssetCard({ asset, width, onPress }: AssetCardProps) {
  const imageHeight = width * 1.25;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width,
        opacity: pressed ? 0.85 : 1,
      })}
    >
      <View
        style={{
          borderRadius: 12,
          borderCurve: "continuous",
          overflow: "hidden",
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.borderSubtle,
        }}
      >
        {/* Image */}
        <Image
          source={getAssetImage(asset.imageUrl)}
          style={{ width: "100%", height: imageHeight }}
          contentFit="cover"
          transition={200}
        />

        {/* Info */}
        <View style={{ padding: 12, gap: 6 }}>
          {/* Category Badge */}
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 4,
              borderCurve: "continuous",
              backgroundColor:
                CATEGORY_COLORS[asset.category] || Colors.surfaceElevated,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 10,
                color: Colors.ivory,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              {asset.category}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: Fonts.serifSemiBold,
              fontSize: 15,
              color: Colors.ivory,
              lineHeight: 19,
            }}
            numberOfLines={2}
          >
            {asset.title}
          </Text>

          {/* View CTA */}
          <Text
            style={{
              fontFamily: Fonts.medium,
              fontSize: 11,
              color: Colors.gold,
              letterSpacing: 0.5,
              marginTop: 2,
            }}
          >
            View
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
