import { create } from "zustand";
import { taoId } from "../../lib/format";

export type LoaiToast = "thanh-cong" | "loi" | "canh-bao" | "thong-tin";

export interface Toast {
  id: string;
  loai: LoaiToast;
  noiDung: string;
}

interface ToastState {
  toasts: Toast[];
  hien: (loai: LoaiToast, noiDung: string) => void;
  xoa: (id: string) => void;
  xoaHet: () => void;
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],

  hien: (loai, noiDung) => {
    const id = taoId();
    set((s) => ({ toasts: [...s.toasts, { id, loai, noiDung }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3000);
  },

  xoa: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  xoaHet: () => set({ toasts: [] }),
}));

// Helper functions tiện dùng
export const toast = {
  thanhCong: (msg: string) => useToastStore.getState().hien("thanh-cong", msg),
  loi: (msg: string) => useToastStore.getState().hien("loi", msg),
  canhBao: (msg: string) => useToastStore.getState().hien("canh-bao", msg),
  thongTin: (msg: string) => useToastStore.getState().hien("thong-tin", msg),
};
