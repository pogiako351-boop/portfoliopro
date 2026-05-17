import { View, Text, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";
import { getAssetImage } from "@/utils/images";

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
          <Text style={{ fontFamily: Fonts.medium, fontSize: 14, color: Colors.gold }}>
            Go Back
          </Text>
        </Pressable>
      </View>
    );
  }

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
              height: 100,
              backgroundColor: "rgba(10,10,10,0.8)",
            }}
          />
        </View>

        {/* Content */}
        <View style={{ paddingHorizontal: 24, marginTop: -40 }}>
          {/* Title */}
          <Text
            style={{
              fontFamily: Fonts.serifBold,
              fontSize: 30,
              color: Colors.ivory,
              marginBottom: 12,
              lineHeight: 36,
            }}
            selectable
          >
            {asset.title}
          </Text>

          {/* Category & Value Row */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 6,
                borderCurve: "continuous",
                backgroundColor: Colors.surface,
                borderWidth: 1,
                borderColor: Colors.borderSubtle,
              }}
            >
              <Text
                style={{
                  fontFamily: Fonts.medium,
                  fontSize: 12,
                  color: Colors.cream,
                  letterSpacing: 0.5,
                }}
              >
                {asset.category}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: Fonts.serifBold,
                fontSize: 22,
                color: Colors.gold,
                letterSpacing: 0.5,
              }}
              selectable
            >
              {asset.estimatedValue}
            </Text>
          </View>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: Colors.border,
              marginBottom: 24,
            }}
          />

          {/* Provenance / Description */}
          <Text
            style={{
              fontFamily: Fonts.serifSemiBold,
              fontSize: 16,
              color: Colors.gold,
              marginBottom: 8,
              letterSpacing: 0.3,
            }}
          >
            Provenance/Description
          </Text>
          <Text
            style={{
              fontFamily: Fonts.regular,
              fontSize: 14,
              color: Colors.cream,
              lineHeight: 22,
              marginBottom: 24,
            }}
            selectable
          >
            {asset.description}
          </Text>

          {/* Details */}
          <View
            style={{
              backgroundColor: Colors.surface,
              borderRadius: 12,
              borderCurve: "continuous",
              padding: 16,
              gap: 12,
              borderWidth: 1,
              borderColor: Colors.borderSubtle,
            }}
          >
            <DetailRow label="Origin" value={asset.year.toString()} />
            <DetailRow label="Condition" value="Impeccable" />
            <View
              style={{
                height: 1,
                backgroundColor: Colors.borderSubtle,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 13,
                color: Colors.muted,
                lineHeight: 19,
              }}
              selectable
            >
              {asset.provenance}
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text
        style={{
          fontFamily: Fonts.regular,
          fontSize: 13,
          color: Colors.muted,
        }}
      >
        {label}:
      </Text>
      <Text
        style={{
          fontFamily: Fonts.medium,
          fontSize: 13,
          color: Colors.ivory,
        }}
        selectable
      >
        {value}
      </Text>
    </View>
  );
}
