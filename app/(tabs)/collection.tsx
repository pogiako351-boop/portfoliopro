import { View, Text, ScrollView, Pressable, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { AssetCard } from "@/components/asset-card";
import { InquiryButton } from "@/components/inquiry-button";
import type { AssetCategory } from "@/store/types";

type FilterTab = "All" | AssetCategory;

const TABS: FilterTab[] = ["All", "Art", "Real Estate", "Collectibles"];

export default function CollectionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const assets = useAppStore((s) => s.assets);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filteredAssets =
    activeFilter === "All"
      ? assets
      : assets.filter((a) => a.category === activeFilter);

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

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            gap: 8,
            marginBottom: 20,
          }}
        >
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveFilter(tab)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                borderCurve: "continuous",
                backgroundColor:
                  activeFilter === tab ? Colors.gold : Colors.surface,
                borderWidth: 1,
                borderColor:
                  activeFilter === tab ? Colors.gold : Colors.borderSubtle,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  fontSize: 13,
                  color: activeFilter === tab ? Colors.obsidian : Colors.cream,
                  letterSpacing: 0.3,
                }}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

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
              No assets in this category
            </Text>
          </View>
        )}
      </ScrollView>

      <InquiryButton />
    </View>
  );
}
