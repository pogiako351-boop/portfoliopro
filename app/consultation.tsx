import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import { useAppStore } from "@/store/useAppStore";

type FormState = "idle" | "loading" | "success" | "error";

export default function ConsultationModal() {
  const router = useRouter();
  const addInquiry = useAppStore((s) => s.addInquiry);
  const [contact, setContact] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidContact = (value: string) => {
    // Basic email or phone validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s()-]{7,}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSubmit = () => {
    if (!contact.trim()) {
      setErrorMessage("Please enter a contact identifier.");
      setFormState("error");
      return;
    }

    if (!isValidContact(contact.trim())) {
      setErrorMessage("Please enter a valid email address or phone number.");
      setFormState("error");
      return;
    }

    setFormState("loading");
    setErrorMessage("");

    // Simulate network request
    setTimeout(() => {
      addInquiry(contact.trim());
      setFormState("success");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.darkSlate,
          paddingHorizontal: 24,
          paddingTop: 20,
        }}
      >
        {/* Close button */}
        <View style={{ alignItems: "flex-end", marginBottom: 8 }}>
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: Colors.surface,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="close" size={18} color={Colors.cream} />
          </Pressable>
        </View>

        {formState === "success" ? (
          /* Success State */
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 20,
              paddingBottom: 60,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "rgba(201, 168, 76, 0.15)",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
              }}
            >
              <Ionicons name="checkmark" size={32} color={Colors.gold} />
            </View>
            <Text
              style={{
                fontFamily: Fonts.serifBold,
                fontSize: 22,
                color: Colors.ivory,
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Inquiry successfully logged.
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                color: Colors.cream,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              A luxury asset analyst will reach out to coordinate a private
              consultation via your secure contact line.
            </Text>
          </View>
        ) : (
          /* Form State */
          <View style={{ flex: 1 }}>
            {/* Header */}
            <Text
              style={{
                fontFamily: Fonts.serifBold,
                fontSize: 26,
                color: Colors.ivory,
                marginBottom: 6,
              }}
            >
              Private Portfolio Analytics
            </Text>
            <View
              style={{
                height: 2,
                width: 50,
                backgroundColor: Colors.gold,
                marginBottom: 16,
                borderRadius: 1,
              }}
            />
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 14,
                color: Colors.cream,
                lineHeight: 21,
                marginBottom: 32,
              }}
            >
              Connect with a luxury asset analyst for a confidential
              consultation.
            </Text>

            {/* Input */}
            <Text
              style={{
                fontFamily: Fonts.medium,
                fontSize: 12,
                color: Colors.muted,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Client Contact Identifier
            </Text>
            <TextInput
              value={contact}
              onChangeText={(text) => {
                setContact(text);
                if (formState === "error") setFormState("idle");
              }}
              placeholder="Email or Phone Number"
              placeholderTextColor={Colors.muted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={formState !== "loading"}
              style={{
                backgroundColor: Colors.surface,
                borderWidth: 1,
                borderColor:
                  formState === "error" ? Colors.error : Colors.borderSubtle,
                borderRadius: 8,
                borderCurve: "continuous",
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontFamily: Fonts.regular,
                fontSize: 15,
                color: Colors.ivory,
              }}
            />

            {/* Error message */}
            {formState === "error" && errorMessage && (
              <Text
                style={{
                  fontFamily: Fonts.regular,
                  fontSize: 12,
                  color: Colors.error,
                  marginTop: 8,
                }}
                selectable
              >
                {errorMessage}
              </Text>
            )}

            {/* Submit button */}
            <Pressable
              onPress={handleSubmit}
              disabled={formState === "loading"}
              style={({ pressed }) => ({
                marginTop: 24,
                backgroundColor:
                  formState === "loading"
                    ? Colors.surfaceElevated
                    : pressed
                      ? Colors.goldMuted
                      : Colors.gold,
                borderRadius: 8,
                borderCurve: "continuous",
                paddingVertical: 15,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                gap: 8,
              })}
            >
              {formState === "loading" ? (
                <ActivityIndicator size="small" color={Colors.obsidian} />
              ) : (
                <Text
                  style={{
                    fontFamily: Fonts.serifSemiBold,
                    fontSize: 16,
                    color: Colors.obsidian,
                    letterSpacing: 0.3,
                  }}
                >
                  Submit Inquiry
                </Text>
              )}
            </Pressable>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
