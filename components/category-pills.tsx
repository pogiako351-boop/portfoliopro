import { ScrollView, Pressable, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import { Fonts } from "@/constants/Typography";
import type { AssetCategory } from "@/store/types";

export type FilterOption = "All" | AssetCategory;

const FILTERS: FilterOption[] = ["All", "Timepiece", "Hypercar", "Real Estate"];

const FILTER_LABELS: Record<FilterOption, string> = {
  All: "All",
  Timepiece: "Timepieces",
  Hypercar: "Hypercars",
  "Real Estate": "Real Estate",
};

interface CategoryPillsProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

export function CategoryPills({
  activeFilter,
  onFilterChange,
}: CategoryPillsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ flexGrow: 0 }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 10,
      }}
    >
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Pressable
            key={filter}
            onPress={() => onFilterChange(filter)}
            style={({ pressed }) => ({
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 24,
              borderCurve: "continuous",
              backgroundColor: isActive
                ? Colors.gold
                : "rgba(255, 255, 255, 0.04)",
              borderWidth: 1,
              borderColor: isActive
                ? Colors.gold
                : "rgba(201, 168, 76, 0.35)",
              opacity: pressed ? 0.8 : 1,
              transform: [{ scale: pressed ? 0.96 : 1 }],
            })}
          >
            <Text
              style={{
                fontFamily: Fonts.semiBold,
                fontSize: 13,
                color: isActive ? Colors.obsidian : Colors.gold,
                letterSpacing: 0.4,
              }}
            >
              {FILTER_LABELS[filter]}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
