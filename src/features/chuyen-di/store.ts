import { create } from "zustand";
import { persist } from "zustand/middleware";

interface YeuThichState {
  daLuu: string[];
  luu: (id: string) => void;
  boLuu: (id: string) => void;
  xoaHet: () => void;
}

export const useYeuThichStore = create<YeuThichState>()(
  persist(
    (set) => ({
      daLuu: [],

      luu: (id) =>
        set((s) => (s.daLuu.includes(id) ? s : { daLuu: [...s.daLuu, id] })),

      boLuu: (id) => set((s) => ({ daLuu: s.daLuu.filter((x) => x !== id) })),

      xoaHet: () => set({ daLuu: [] }),
    }),
    { name: "yeu-thich-chuyen-di" },
  ),
);
