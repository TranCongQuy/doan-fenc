import { create } from "zustand";
import { persist } from "zustand/middleware";
import { taoId } from "../../lib/format";
import type { ChuyenDiForm } from "./schema";
import type { ChuyenDi } from "./types";

// ===== Store 1: Yêu thích =====
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

// ===== Store 2: Chuyến đi (CRUD) =====
interface ChuyenDiState {
  dsChuyenDi: ChuyenDi[];
  them: (form: ChuyenDiForm) => ChuyenDi;
  sua: (id: string, form: ChuyenDiForm) => void;
  xoa: (id: string) => void;
  nhanBan: (id: string) => ChuyenDi | null;
  tangLuotXem: (id: string) => void;
  thayThe: (ds: ChuyenDi[]) => void;
  xoaHet: () => void;
}

export const useChuyenDiStore = create<ChuyenDiState>()(
  persist(
    (set, get) => ({
      dsChuyenDi: [],

      them: (form) => {
        const moi: ChuyenDi = {
          id: taoId(),
          ...form,
          luotXem: 0,
          taoLuc: new Date().toISOString(),
        };
        set((s) => ({ dsChuyenDi: [...s.dsChuyenDi, moi] }));
        return moi;
      },

      sua: (id, form) =>
        set((s) => ({
          dsChuyenDi: s.dsChuyenDi.map((cd) =>
            cd.id === id ? { ...cd, ...form } : cd,
          ),
        })),

      xoa: (id) =>
        set((s) => ({
          dsChuyenDi: s.dsChuyenDi.filter((cd) => cd.id !== id),
        })),

      nhanBan: (id) => {
        const goc = get().dsChuyenDi.find((cd) => cd.id === id);
        if (!goc) return null;
        const banSao: ChuyenDi = {
          ...goc,
          id: taoId(),
          ten: `${goc.ten} (bản sao)`,
          luotXem: 0,
          taoLuc: new Date().toISOString(),
        };
        set((s) => ({ dsChuyenDi: [...s.dsChuyenDi, banSao] }));
        return banSao;
      },

      tangLuotXem: (id) =>
        set((s) => ({
          dsChuyenDi: s.dsChuyenDi.map((cd) =>
            cd.id === id ? { ...cd, luotXem: cd.luotXem + 1 } : cd,
          ),
        })),

      thayThe: (ds) => set({ dsChuyenDi: ds }),
      xoaHet: () => set({ dsChuyenDi: [] }),
    }),
    { name: "chuyen-di-hue", version: 1 },
  ),
);
