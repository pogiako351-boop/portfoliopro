import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import type { Asset } from "@/store/types";
import { getAssetImage } from "@/utils/images";
import { formatCurrency } from "@/utils/currency";

interface AssetCardProps {
  asset: Asset;
  width: number;
  onPress: () => void;
}

function getCategoryLabel(category: Asset["category"]): string {
  switch (category) {
    case "Timepiece":
      return "TIMEPIECE";
    case "Hypercar":
      return "HYPERCAR";
    case "Real Estate":
      return "REAL ESTATE";
  }
}

export function AssetCard({ asset, width, onPress }: AssetCardProps) {
  const imageHeight = width * 1.1;
  const spread = asset.marketValue - asset.msrp;
  const spreadPercent = Math.round((spread / asset.msrp) * 100);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width,
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.98 : 1 }],
      })}
    >
      <View
        style={{
          borderRadius: 14,
          borderCurve: "continuous",
          overflow: "hidden",
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.borderSubtle,
        }}
      >
        {/* Image */}
        <View style={{ position: "relative" }}>
          <Image
            source={getAssetImage(asset.imageUrl)}
            style={{ width: "100%", height: imageHeight }}
            contentFit="cover"
            transition={200}
          />
          {/* Category Badge overlay */}
          <View
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
              borderCurve: "continuous",
              backgroundColor: "rgba(10, 10, 10, 0.75)",
              borderWidth: 0.5,
              borderColor: "rgba(201, 168, 76, 0.4)",
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: 9,
                color: Colors.gold,
                letterSpacing: 1.2,
              }}
            >
              {getCategoryLabel(asset.category)}
            </Text>
          </View>
        </View>

        {/* Info */}
        <View style={{ padding: 12, gap: 6 }}>
          {/* Title */}
          <Text
            style={{
              fontFamily: Fonts.serifSemiBold,
              fontSize: 14,
              color: Colors.ivory,
              lineHeight: 18,
            }}
            numberOfLines={2}
          >
            {asset.title}
          </Text>

          {/* Market Value */}
          <Text
            style={{
              fontFamily: Fonts.bold,
              fontSize: 15,
              color: Colors.gold,
              letterSpacing: 0.3,
              marginTop: 2,
              fontVariant: ["tabular-nums"],
            }}
          >
            {formatCurrency(asset.marketValue)}
          </Text>

          {/* Spread indicator */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: Colors.success,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 11,
                color: Colors.cream,
                letterSpacing: 0.2,
              }}
            >
              +{spreadPercent}% over MSRP
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
