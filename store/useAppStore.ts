import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Preferences, Asset, Inquiry } from "./types";
import { ASSETS } from "@/data/assets";

interface AppState {
  preferences: Preferences;
  assets: Asset[];
  watchlist: string[];
  inquiries: Inquiry[];
  toggleWatchlist: (assetId: string) => void;
  isInWatchlist: (assetId: string) => boolean;
  addInquiry: (contactIdentifier: string) => void;
}

export type AppStore = AppState;

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      preferences: {},
      assets: ASSETS,
      watchlist: [],
      inquiries: [],
      toggleWatchlist: (assetId: string) => {
        const current = get().watchlist;
        if (current.includes(assetId)) {
          set({ watchlist: current.filter((id) => id !== assetId) });
        } else {
          set({ watchlist: [...current, assetId] });
        }
      },
      isInWatchlist: (assetId: string) => {
        return get().watchlist.includes(assetId);
      },
      addInquiry: (contactIdentifier: string) => {
        const inquiry: Inquiry = {
          id: Date.now().toString(),
          contactIdentifier,
          submittedAt: Date.now(),
          status: "logged",
        };
        set({ inquiries: [...get().inquiries, inquiry] });
      },
    }),
    {
      name: "vault-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        preferences: state.preferences,
        watchlist: state.watchlist,
        inquiries: state.inquiries,
      }),
    }
  )
);
