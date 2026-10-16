import type { ChuyenDi } from "../features/chuyen-di/types";

/**
 * Dữ liệu fallback khi API server không chạy.
 */
export const DS_CHUYEN_DI_FALLBACK: ChuyenDi[] = [
  {
    id: "cd01",
    ten: "Khám phá Cố đô",
    moTa: "Hành trình 2 ngày qua các di tích triều Nguyễn.",
    ngayBatDau: "2026-10-15",
    ngayKetThuc: "2026-10-16",
    trangThai: "da-xong",
    tags: ["lich-su", "van-hoa"],
    luotXem: 0,
    taoLuc: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "cd02",
    ten: "Sông Hương buổi sáng",
    moTa: "Đi thuyền rồng ngắm bình minh trên sông Hương.",
    ngayBatDau: "2026-11-01",
    ngayKetThuc: "2026-11-01",
    trangThai: "du-dinh",
    tags: ["thien-nhien", "van-hoa"],
    luotXem: 0,
    taoLuc: "2026-10-01T00:00:00.000Z",
  },
];
