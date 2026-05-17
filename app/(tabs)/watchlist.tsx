import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { AssetCard } from "@/components/asset-card";

export default function WatchlistScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const assets = useAppStore((s) => s.assets);
  const watchlist = useAppStore((s) => s.watchlist);

  const watchlistAssets = assets.filter((a) => watchlist.includes(a.id));
  const cardWidth = (width - 48 - 12) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.obsidian }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: insets.top + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text
            style={{
              fontFamily: Fonts.serifBold,
              fontSize: 32,
              color: Colors.ivory,
              letterSpacing: 0.5,
            }}
          >
            Watchlist
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: Colors.gold,
              opacity: 0.3,
              marginTop: 8,
              width: 60,
            }}
          />
        </View>

        {/* Watchlist Grid */}
        {watchlistAssets.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              paddingHorizontal: 20,
            }}
          >
            {watchlistAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                width={cardWidth}
                onPress={() => router.push(`/asset/${asset.id}`)}
              />
            ))}
          </View>
        ) : (
          /* Empty State */
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 80,
              paddingHorizontal: 40,
            }}
          >
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: Colors.surface,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Ionicons name="heart-outline" size={32} color={Colors.muted} />
            </View>
            <Text
              style={{
                fontFamily: Fonts.serifMedium,
                fontSize: 20,
                color: Colors.ivory,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              Your Watchlist is Empty
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                color: Colors.muted,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Save assets you&apos;re interested in by tapping the heart icon on any
              asset detail page.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
