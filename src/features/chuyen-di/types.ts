export const TRANG_THAI_CHUYEN_DI = ["du-dinh", "dang-di", "da-xong"] as const;
export type TrangThaiChuyenDi = (typeof TRANG_THAI_CHUYEN_DI)[number];

export const NHAN_TRANG_THAI: Record<TrangThaiChuyenDi, string> = {
  "du-dinh": "Dự định",
  "dang-di": "Đang đi",
  "da-xong": "Đã xong",
};

export interface ChuyenDi {
  id: string;
  ten: string;
  moTa: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  trangThai: TrangThaiChuyenDi;
}

export type TrangThaiTai<T> =
  | { trangThai: "dang-tai" }
  | { trangThai: "loi"; loi: string }
  | { trangThai: "thanh-cong"; duLieu: T };
