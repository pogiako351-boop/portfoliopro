import { useState, useMemo } from "react";
import { View, Text, Pressable, Switch } from "react-native";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";

type ProvenanceModifier =
  | "unworn-double-boxed"
  | "factory-sealed-tiffany"
  | "single-owner-box-papers";

interface YieldCalculatorProps {
  retailPrice: string;
  marketPrice: string;
}

const PROVENANCE_OPTIONS: {
  key: ProvenanceModifier;
  label: string;
  sublabel: string;
  multiplier: number;
}[] = [
  {
    key: "unworn-double-boxed",
    label: "Unworn / Double Boxed",
    sublabel: "Baseline",
    multiplier: 1.0,
  },
  {
    key: "factory-sealed-tiffany",
    label: "Factory Sealed / Tiffany Stamped",
    sublabel: "+25% Premium",
    multiplier: 1.25,
  },
  {
    key: "single-owner-box-papers",
    label: "Single-Owner / Box & Papers",
    sublabel: "−5% Deduction",
    multiplier: 0.95,
  },
];

function parsePrice(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""));
}

function formatCurrency(value: number): string {
  return "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function YieldCalculator({
  retailPrice,
  marketPrice,
}: YieldCalculatorProps) {
  const [selectedModifier, setSelectedModifier] =
    useState<ProvenanceModifier>("unworn-double-boxed");
  const [wholesaleEnabled, setWholesaleEnabled] = useState(false);

  const msrp = useMemo(() => parsePrice(retailPrice), [retailPrice]);
  const baseMarket = useMemo(() => parsePrice(marketPrice), [marketPrice]);

  const calculations = useMemo(() => {
    const option = PROVENANCE_OPTIONS.find((o) => o.key === selectedModifier)!;
    let adjustedMarket = baseMarket * option.multiplier;

    if (wholesaleEnabled) {
      adjustedMarket = adjustedMarket * 0.88; // 12% cut
    }

    const spread = adjustedMarket - msrp;
    const isPrimeAlpha = spread > 70000;

    return {
      adjustedMarket,
      spread,
      isPrimeAlpha,
    };
  }, [baseMarket, msrp, selectedModifier, wholesaleEnabled]);

  return (
    <View style={{ marginBottom: 24 }}>
      {/* Section Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 16,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.gold,
            opacity: 0.4,
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.serifSemiBold,
            fontSize: 16,
            color: Colors.gold,
            letterSpacing: 1.5,
            textTransform: "uppercase",
          }}
        >
          Yield Calculator
        </Text>
        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: Colors.gold,
            opacity: 0.4,
          }}
        />
      </View>

      {/* Calculator Container */}
      <View
        style={{
          backgroundColor: Colors.surface,
          borderRadius: 16,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: Colors.border,
          overflow: "hidden",
        }}
      >
        {/* Dynamic Badge */}
        <View
          style={{
            backgroundColor: calculations.isPrimeAlpha
              ? "rgba(201, 168, 76, 0.12)"
              : "rgba(255, 255, 255, 0.04)",
            paddingVertical: 10,
            paddingHorizontal: 16,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: calculations.isPrimeAlpha
              ? "rgba(201, 168, 76, 0.25)"
              : Colors.borderSubtle,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.semiBold,
              fontSize: 12,
              color: calculations.isPrimeAlpha ? Colors.gold : Colors.muted,
              letterSpacing: 1.8,
              textAlign: "center",
            }}
            selectable
          >
            {calculations.isPrimeAlpha
              ? "PRIME ALPHA ALLOCATION 🟢"
              : "STANDARD ALLOCATION ⚪"}
          </Text>
        </View>

        {/* Price Display Grid */}
        <View style={{ padding: 20 }}>
          {/* MSRP */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 12,
                color: Colors.muted,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              MSRP (Retail)
            </Text>
            <Text
              style={{
                fontFamily: Fonts.serifBold,
                fontSize: 20,
                color: Colors.ivory,
                fontVariant: ["tabular-nums"],
              }}
              selectable
            >
              {formatCurrency(msrp)}
            </Text>
          </View>

          {/* Secondary Market Price */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
              marginBottom: 14,
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 12,
                color: Colors.muted,
                letterSpacing: 0.5,
                textTransform: "uppercase",
              }}
            >
              Secondary Market
            </Text>
            <Text
              style={{
                fontFamily: Fonts.serifBold,
                fontSize: 20,
                color: Colors.goldLight,
                fontVariant: ["tabular-nums"],
              }}
              selectable
            >
              {formatCurrency(calculations.adjustedMarket)}
            </Text>
          </View>

          {/* Accent divider */}
          <View
            style={{
              height: 1,
              backgroundColor: Colors.gold,
              opacity: 0.3,
              marginVertical: 14,
            }}
          />

          {/* Spread */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: 12,
                color: Colors.gold,
                letterSpacing: 0.8,
                textTransform: "uppercase",
              }}
            >
              Premium Spread
            </Text>
            <Text
              style={{
                fontFamily: Fonts.serifBold,
                fontSize: 24,
                color:
                  calculations.spread > 0 ? Colors.success : Colors.error,
                fontVariant: ["tabular-nums"],
              }}
              selectable
            >
              {calculations.spread >= 0 ? "+" : ""}
              {formatCurrency(calculations.spread)}
            </Text>
          </View>
        </View>

        {/* Gold separator */}
        <View
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: Colors.gold,
            opacity: 0.2,
          }}
        />

        {/* Provenance / Condition Modifier */}
        <View style={{ padding: 20 }}>
          <Text
            style={{
              fontFamily: Fonts.serifSemiBold,
              fontSize: 14,
              color: Colors.gold,
              letterSpacing: 0.5,
              marginBottom: 12,
            }}
          >
            Provenance & Condition
          </Text>

          <View style={{ gap: 8 }}>
            {PROVENANCE_OPTIONS.map((option) => {
              const isSelected = selectedModifier === option.key;
              return (
                <Pressable
                  key={option.key}
                  onPress={() => setSelectedModifier(option.key)}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 12,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    borderCurve: "continuous",
                    backgroundColor: isSelected
                      ? "rgba(201, 168, 76, 0.1)"
                      : pressed
                        ? "rgba(255, 255, 255, 0.03)"
                        : "rgba(255, 255, 255, 0.02)",
                    borderWidth: 1,
                    borderColor: isSelected
                      ? Colors.gold
                      : Colors.borderSubtle,
                  })}
                >
                  {/* Radio indicator */}
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: isSelected ? Colors.gold : Colors.muted,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: Colors.gold,
                        }}
                      />
                    )}
                  </View>

                  {/* Label */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily: Fonts.medium,
                        fontSize: 13,
                        color: isSelected ? Colors.ivory : Colors.cream,
                        lineHeight: 18,
                      }}
                    >
                      {option.label}
                    </Text>
                  </View>

                  {/* Multiplier Badge */}
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 4,
                      borderCurve: "continuous",
                      backgroundColor: isSelected
                        ? "rgba(201, 168, 76, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: Fonts.semiBold,
                        fontSize: 10,
                        color: isSelected ? Colors.goldLight : Colors.muted,
                        letterSpacing: 0.3,
                      }}
                    >
                      {option.sublabel}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Gold separator */}
        <View
          style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: Colors.gold,
            opacity: 0.2,
          }}
        />

        {/* Wholesale Toggle */}
        <View
          style={{
            padding: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1, marginRight: 16 }}>
            <Text
              style={{
                fontFamily: Fonts.serifSemiBold,
                fontSize: 14,
                color: Colors.gold,
                marginBottom: 3,
              }}
            >
              Immediate Cash Out
            </Text>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: 11,
                color: Colors.muted,
                lineHeight: 16,
              }}
            >
              Applies 12% wholesale deduction for instant liquidity
            </Text>
          </View>
          <Switch
            value={wholesaleEnabled}
            onValueChange={setWholesaleEnabled}
            trackColor={{
              false: "rgba(255,255,255,0.1)",
              true: "rgba(201, 168, 76, 0.4)",
            }}
            thumbColor={wholesaleEnabled ? Colors.gold : Colors.muted}
          />
        </View>
      </View>
    </View>
  );
}
