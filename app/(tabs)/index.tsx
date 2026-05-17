import { useState, useMemo } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { HeroCarousel } from "@/components/hero-carousel";
import { AssetCard } from "@/components/asset-card";
import { InquiryButton } from "@/components/inquiry-button";
import { CategoryPills, FilterOption } from "@/components/category-pills";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const assets = useAppStore((s) => s.assets);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const featuredAssets = useMemo(
    () => assets.filter((a) => a.isFeatured),
    [assets]
  );

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
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Carousel */}
        <HeroCarousel assets={featuredAssets} />

        {/* Collection Section */}
        <View style={{ marginTop: 28 }}>
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 18,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.serifSemiBold,
                fontSize: 26,
                color: Colors.ivory,
                letterSpacing: 0.5,
              }}
            >
              The Portfolio
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: Colors.gold,
                opacity: 0.3,
              }}
            />
          </View>

          {/* Category Filter Pills */}
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

          {/* Empty state */}
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
                No assets in this category
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <InquiryButton />
    </View>
  );
}
