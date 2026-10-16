export const TRANG_THAI_CHUYEN_DI = ["du-dinh", "dang-di", "da-xong"] as const;
export type TrangThaiChuyenDi = (typeof TRANG_THAI_CHUYEN_DI)[number];

export const NHAN_TRANG_THAI: Record<TrangThaiChuyenDi, string> = {
  "du-dinh": "Dự định",
  "dang-di": "Đang đi",
  "da-xong": "Đã xong",
};

export const TAGS = [
  "bien",
  "nui",
  "am-thuc",
  "lich-su",
  "van-hoa",
  "chua",
  "lang-tam",
  "thien-nhien",
] as const;

export type Tag = (typeof TAGS)[number];

export const NHAN_TAG: Record<Tag, string> = {
  bien: "🏖 Biển",
  nui: "⛰ Núi",
  "am-thuc": "🍜 Ẩm thực",
  "lich-su": "📜 Lịch sử",
  "van-hoa": "🎭 Văn hóa",
  chua: "🛕 Chùa",
  "lang-tam": "⚱ Lăng tẩm",
  "thien-nhien": "🌳 Thiên nhiên",
};

export const SAP_XEP = ["moi-nhat", "ten-az", "luot-xem"] as const;
export type KieuSapXep = (typeof SAP_XEP)[number];

export const NHAN_SAP_XEP: Record<KieuSapXep, string> = {
  "moi-nhat": "Mới nhất",
  "ten-az": "Tên A-Z",
  "luot-xem": "Nhiều lượt xem",
};

export interface ChuyenDi {
  id: string;
  ten: string;
  moTa: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  trangThai: TrangThaiChuyenDi;
  tags: string[];
  luotXem: number;
  taoLuc: string;
}

export type TrangThaiTai<T> =
  | { trangThai: "dang-tai" }
  | { trangThai: "loi"; loi: string }
  | { trangThai: "thanh-cong"; duLieu: T };
