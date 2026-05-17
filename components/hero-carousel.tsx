import { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  useWindowDimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import type { Asset } from "@/store/types";
import { getAssetImage } from "@/utils/images";
import { formatCurrency } from "@/utils/currency";

interface HeroCarouselProps {
  assets: Asset[];
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

export function HeroCarousel({ assets }: HeroCarouselProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heroHeight = 400;

  const startAutoScroll = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % assets.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 4500);
  }, [assets.length, width]);

  useEffect(() => {
    if (assets.length > 1) {
      startAutoScroll();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoScroll, assets.length]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex && index >= 0 && index < assets.length) {
      setActiveIndex(index);
    }
  };

  const handleScrollBeginDrag = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleScrollEndDrag = () => {
    if (assets.length > 1) startAutoScroll();
  };

  if (assets.length === 0) return null;

  return (
    <View style={{ height: heroHeight }}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleScrollBeginDrag}
        onScrollEndDrag={handleScrollEndDrag}
        scrollEventThrottle={16}
        style={{ flexGrow: 0 }}
      >
        {assets.map((asset) => (
          <Pressable
            key={asset.id}
            onPress={() => router.push(`/asset/${asset.id}`)}
            style={{ width, height: heroHeight }}
          >
            <Image
              source={getAssetImage(asset.imageUrl)}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={300}
            />
            {/* Gradient Overlay */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: heroHeight * 0.6,
                backgroundColor: "transparent",
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  justifyContent: "flex-end",
                  padding: 24,
                  paddingBottom: 36,
                }}
              >
                {/* Category Badge */}
                <View
                  style={{
                    alignSelf: "flex-start",
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderRadius: 4,
                    borderCurve: "continuous",
                    backgroundColor: "rgba(201, 168, 76, 0.15)",
                    borderWidth: 0.5,
                    borderColor: "rgba(201, 168, 76, 0.5)",
                    marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Fonts.semiBold,
                      fontSize: 10,
                      color: Colors.gold,
                      letterSpacing: 1.5,
                    }}
                  >
                    {getCategoryLabel(asset.category)}
                  </Text>
                </View>

                <Text
                  style={{
                    fontFamily: Fonts.serifBold,
                    fontSize: 24,
                    color: Colors.ivory,
                    marginBottom: 6,
                    textShadowColor: "rgba(0,0,0,0.5)",
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 4,
                  }}
                  numberOfLines={2}
                >
                  {asset.title}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.regular,
                    fontSize: 12,
                    color: Colors.cream,
                    marginBottom: 6,
                    letterSpacing: 0.3,
                  }}
                  numberOfLines={1}
                >
                  {asset.description}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.semiBold,
                    fontSize: 18,
                    color: Colors.gold,
                    letterSpacing: 0.5,
                    fontVariant: ["tabular-nums"],
                  }}
                >
                  {formatCurrency(asset.marketValue)}
                </Text>
              </View>
            </View>

            {/* Top gradient for status bar legibility */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: insets.top + 30,
                backgroundColor: "rgba(0,0,0,0.35)",
              }}
            />
          </Pressable>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View
        style={{
          position: "absolute",
          bottom: 14,
          alignSelf: "center",
          flexDirection: "row",
          gap: 6,
        }}
      >
        {assets.map((_, i) => (
          <View
            key={i}
            style={{
              width: activeIndex === i ? 20 : 6,
              height: 6,
              borderRadius: 3,
              backgroundColor:
                activeIndex === i ? Colors.gold : "rgba(255,255,255,0.4)",
              borderCurve: "continuous",
            }}
          />
        ))}
      </View>
    </View>
  );
}
