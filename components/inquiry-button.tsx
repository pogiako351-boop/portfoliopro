import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";

export function InquiryButton() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: insets.bottom + 68,
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
  );
}
