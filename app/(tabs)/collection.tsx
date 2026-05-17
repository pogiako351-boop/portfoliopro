import { useState, useMemo } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { AssetCard } from "@/components/asset-card";
import { InquiryButton } from "@/components/inquiry-button";
import { CategoryPills, FilterOption } from "@/components/category-pills";

export default function CollectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const assets = useAppStore((s) => s.assets);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const filteredAssets = useMemo(() => {
    if (activeFilter === "All") return assets;
    return assets.filter((a) => a.category === activeFilter);
  }, [assets, activeFilter]);

  const cardWidth = (width - 48 - 12) / 2;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.obsidian }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: insets.top + 16,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: Fonts.serifBold,
              fontSize: 32,
              color: Colors.ivory,
              letterSpacing: 0.5,
            }}
          >
            The Collection
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 13,
              color: Colors.muted,
              marginTop: 4,
              letterSpacing: 0.3,
            }}
          >
            Multi-Asset Portfolio Platform
          </Text>
          <View
            style={{
              height: 1,
              backgroundColor: Colors.gold,
              opacity: 0.3,
              marginTop: 12,
              width: 60,
            }}
          />
        </View>

        {/* Filter Pills */}
        <View style={{ marginBottom: 20 }}>
          <CategoryPills
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </View>

        {/* Asset Grid */}
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
            paddingHorizontal: 20,
          }}
        >
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              width={cardWidth}
              onPress={() => router.push(`/asset/${asset.id}`)}
            />
          ))}
        </View>

        {/* Empty State */}
        {filteredAssets.length === 0 && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 60,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.serifMedium,
                fontSize: 18,
                color: Colors.muted,
              }}
            >
              No assets match this filter
            </Text>
          </View>
        )}
      </ScrollView>

      <InquiryButton />
    </View>
  );
}
