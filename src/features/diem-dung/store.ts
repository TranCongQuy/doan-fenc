import { create } from "zustand";
import { persist } from "zustand/middleware";
import { taoId } from "../../lib/format";
import type { DiemDungForm } from "./schema";
import type { DiemDung } from "./types";

interface DiemDungState {
  dsDiemDung: DiemDung[];
  them: (chuyenDiId: string, form: DiemDungForm) => DiemDung;
  sua: (id: string, form: DiemDungForm) => void;
  xoa: (id: string) => void;
  xoaTheoChuyenDi: (chuyenDiId: string) => void;
  danhGia: (id: string, soSao: number) => void;
  doiThuTu: (id: string, huong: "len" | "xuong") => void;
  thayThe: (ds: DiemDung[]) => void;
  xoaHet: () => void;
}

export const useDiemDungStore = create<DiemDungState>()(
  persist(
    (set, get) => ({
      dsDiemDung: [],

      them: (chuyenDiId, form) => {
        const cungChuyen = get().dsDiemDung.filter(
          (dd) => dd.chuyenDiId === chuyenDiId,
        );
        const thuTuMoi = cungChuyen.length;
        const moi: DiemDung = {
          id: taoId(),
          chuyenDiId,
          ...form,
          danhGia: 0,
          thuTu: thuTuMoi,
        };
        set((s) => ({ dsDiemDung: [...s.dsDiemDung, moi] }));
        return moi;
      },

      sua: (id, form) =>
        set((s) => ({
          dsDiemDung: s.dsDiemDung.map((dd) =>
            dd.id === id ? { ...dd, ...form } : dd,
          ),
        })),

      xoa: (id) =>
        set((s) => ({
          dsDiemDung: s.dsDiemDung.filter((dd) => dd.id !== id),
        })),

      xoaTheoChuyenDi: (chuyenDiId) =>
        set((s) => ({
          dsDiemDung: s.dsDiemDung.filter((dd) => dd.chuyenDiId !== chuyenDiId),
        })),

      danhGia: (id, soSao) =>
        set((s) => ({
          dsDiemDung: s.dsDiemDung.map((dd) =>
            dd.id === id ? { ...dd, danhGia: soSao } : dd,
          ),
        })),

      doiThuTu: (id, huong) => {
        const all = get().dsDiemDung;
        const target = all.find((dd) => dd.id === id);
        if (!target) return;
        const cungChuyen = all
          .filter((dd) => dd.chuyenDiId === target.chuyenDiId)
          .sort((a, b) => a.thuTu - b.thuTu);
        const idx = cungChuyen.findIndex((dd) => dd.id === id);
        const idxMoi = huong === "len" ? idx - 1 : idx + 1;
        if (idxMoi < 0 || idxMoi >= cungChuyen.length) return;
        const hangXom = cungChuyen[idxMoi];
        if (!hangXom) return;

        set((s) => ({
          dsDiemDung: s.dsDiemDung.map((dd) => {
            if (dd.id === target.id) return { ...dd, thuTu: hangXom.thuTu };
            if (dd.id === hangXom.id) return { ...dd, thuTu: target.thuTu };
            return dd;
          }),
        }));
      },

      thayThe: (ds) => set({ dsDiemDung: ds }),
      xoaHet: () => set({ dsDiemDung: [] }),
    }),
    { name: "diem-dung-hue", version: 1 },
  ),
);
