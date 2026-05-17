import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { getAssetImage } from "@/utils/images";
import { formatCurrency } from "@/utils/currency";
import { YieldCalculator } from "@/components/yield-calculator";

function getCategoryLabel(category: string): string {
  switch (category) {
    case "Timepiece":
      return "TIMEPIECE";
    case "Hypercar":
      return "HYPERCAR";
    case "Real Estate":
      return "REAL ESTATE";
    default:
      return category.toUpperCase();
  }
}

function getAboutLabel(category: string): string {
  switch (category) {
    case "Timepiece":
      return "About This Timepiece";
    case "Hypercar":
      return "About This Allocation";
    case "Real Estate":
      return "About This Property";
    default:
      return "About This Asset";
  }
}

export default function AssetDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const assets = useAppStore((s) => s.assets);
  const watchlist = useAppStore((s) => s.watchlist);
  const toggleWatchlist = useAppStore((s) => s.toggleWatchlist);

  const asset = assets.find((a) => a.id === id);
  const isWatched = watchlist.includes(id || "");

  if (!asset) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.obsidian,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.serifMedium,
            fontSize: 18,
            color: Colors.muted,
          }}
        >
          Asset not found
        </Text>
        <Pressable
          onPress={() => router.back()}
          style={{ marginTop: 16, padding: 12 }}
        >
          <Text
            style={{ fontFamily: Fonts.medium, fontSize: 14, color: Colors.gold }}
          >
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

  const spread = asset.marketValue - asset.msrp;
  const spreadPercent = Math.round((spread / asset.msrp) * 100);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.obsidian }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={{ height: 400, position: "relative" }}>
          <Image
            source={getAssetImage(asset.imageUrl)}
            style={{ width: "100%", height: "100%" }}
            contentFit="cover"
            transition={300}
          />

          {/* Top bar overlay */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              paddingTop: insets.top + 8,
              paddingHorizontal: 16,
              paddingBottom: 12,
              backgroundColor: "rgba(0,0,0,0.35)",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Back button */}
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(0,0,0,0.5)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="chevron-back" size={22} color={Colors.ivory} />
            </Pressable>

            {/* Add to Watchlist */}
            <Pressable
              onPress={() => toggleWatchlist(asset.id)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: "rgba(0,0,0,0.5)",
                borderCurve: "continuous",
              }}
            >
              <Ionicons
                name={isWatched ? "heart" : "heart-outline"}
                size={18}
                color={isWatched ? Colors.gold : Colors.ivory}
              />
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  fontSize: 12,
                  color: Colors.ivory,
                }}
              >
                {isWatched ? "Watching" : "Add to Watchlist"}
              </Text>
            </Pressable>
          </View>

          {/* Bottom gradient */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              backgroundColor: "rgba(10,10,10,0.85)",
            }}
          />
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 24, marginTop: -50 }}>
          {/* Category Badge */}
          <View
            style={{
              alignSelf: "flex-start",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 6,
              borderCurve: "continuous",
              backgroundColor: "rgba(201, 168, 76, 0.12)",
              borderWidth: 1,
              borderColor: "rgba(201, 168, 76, 0.4)",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: 11,
                color: Colors.gold,
                letterSpacing: 1.5,
              }}
            >
              {getCategoryLabel(asset.category)}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontFamily: Fonts.serifBold,
              fontSize: 28,
              color: Colors.ivory,
              marginBottom: 16,
              lineHeight: 34,
            }}
            selectable
          >
            {asset.title}
          </Text>

          {/* Price Summary Card */}
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 14,
              borderCurve: "continuous",
              padding: 18,
              borderWidth: 1,
              borderColor: Colors.borderSubtle,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 12,
                  color: Colors.muted,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                MSRP
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.serifBold,
                  fontSize: 18,
                  color: Colors.ivory,
                  fontVariant: ["tabular-nums"],
                }}
                selectable
              >
                {formatCurrency(asset.msrp)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 12,
                  color: Colors.muted,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                Market Value
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.serifBold,
                  fontSize: 18,
                  color: Colors.goldLight,
                  fontVariant: ["tabular-nums"],
                }}
                selectable
              >
                {formatCurrency(asset.marketValue)}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.border,
                marginVertical: 8,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.semiBold,
                  fontSize: 12,
                  color: Colors.gold,
                  letterSpacing: 0.8,
                  textTransform: "uppercase",
                }}
              >
                Premium
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 4,
                    borderCurve: "continuous",
                    backgroundColor: "rgba(76, 175, 80, 0.15)",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.semiBold,
                      fontSize: 11,
                      color: Colors.success,
                    }}
                  >
                    +{spreadPercent}%
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: Fonts.serifBold,
                    fontSize: 18,
                    color: Colors.success,
                    fontVariant: ["tabular-nums"],
                  }}
                  selectable
                >
                  +{formatCurrency(spread)}
                </Text>
              </View>
            </View>
          </View>

          {/* Yield Calculator */}
          <YieldCalculator
            msrp={asset.msrp}
            marketValue={asset.marketValue}
            category={asset.category}
          />

          {/* Description */}
          <Text
            style={{
              fontFamily: Fonts.serifSemiBold,
              fontSize: 16,
              color: Colors.gold,
              marginBottom: 8,
              letterSpacing: 0.3,
            }}
          >
            {getAboutLabel(asset.category)}
          </Text>
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 16,
              borderWidth: 1,
              borderColor: Colors.borderSubtle,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                color: Colors.cream,
                lineHeight: 22,
              }}
              selectable
            >
              {asset.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          backgroundColor: Colors.obsidian,
          borderTopWidth: 0.5,
          borderTopColor: Colors.borderSubtle,
        }}
      >
        <Pressable
          onPress={() => router.push("/consultation")}
          style={({ pressed }) => ({
            backgroundColor: pressed ? Colors.charcoal : Colors.obsidian,
            borderWidth: 1,
            borderColor: Colors.gold,
            borderRadius: 8,
            borderCurve: "continuous",
            paddingVertical: 14,
            paddingHorizontal: 20,
            alignItems: "center",
          })}
        >
          <Text
            style={{
              fontFamily: Fonts.serifSemiBold,
              fontSize: 15,
              color: Colors.gold,
              letterSpacing: 0.5,
              textAlign: "center",
            }}
          >
            Inquire for Private Portfolio Analytics
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
