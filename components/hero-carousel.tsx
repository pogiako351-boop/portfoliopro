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

interface HeroCarouselProps {
  assets: Asset[];
}

export function HeroCarousel({ assets }: HeroCarouselProps) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heroHeight = 380;

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
    startAutoScroll();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoScroll]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleScrollBeginDrag = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleScrollEndDrag = () => {
    startAutoScroll();
  };

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
                  backgroundColor: "rgba(0,0,0,0.55)",
                  justifyContent: "flex-end",
                  padding: 24,
                  paddingBottom: 32,
                }}
              >
                <Text
                  style={{
                    fontFamily: Fonts.serifBold,
                    fontSize: 24,
                    color: Colors.ivory,
                    marginBottom: 4,
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
                    marginBottom: 4,
                    letterSpacing: 0.3,
                  }}
                >
                  Ref. {asset.reference} · {asset.material} · {asset.diameter}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.semiBold,
                    fontSize: 16,
                    color: Colors.gold,
                    letterSpacing: 0.5,
                  }}
                >
                  {asset.marketPrice}
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
                backgroundColor: "rgba(0,0,0,0.3)",
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
