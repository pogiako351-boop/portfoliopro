import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { HeroCarousel } from "@/components/hero-carousel";
import { AssetCard } from "@/components/asset-card";
import { InquiryButton } from "@/components/inquiry-button";

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const assets = useAppStore((s) => s.assets);
  const featuredAssets = assets.filter((a) => a.isFeatured);
  const collectionAssets = assets;

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
        <View style={{ paddingHorizontal: 20, marginTop: 28 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Text
              style={{
                fontFamily: Fonts.serifSemiBold,
                fontSize: 26,
                color: Colors.ivory,
                letterSpacing: 0.5,
              }}
            >
              The Collection
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

          {/* Asset Grid */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 20,
            }}
          >
            {collectionAssets.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                width={cardWidth}
                onPress={() => router.push(`/asset/${asset.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <InquiryButton />
    </View>
  );
}
