# CHANGELOG — Lịch sử phiên bản

Theo chuẩn [Keep a Changelog](https://keepachangelog.com/) và [Semantic Versioning](https://semver.org/).

---

## [2.0.0] — 2026-10-12

### Added — 22 chức năng mới

**CRUD chuyến đi:**

- Sửa chuyến đi (`/chuyen-di/:id/sua`)
- Xóa chuyến đi (cascade điểm dừng + nhật ký)
- Nhân bản chuyến đi
- Đếm lượt xem

**CRUD điểm dừng:**

- Chi tiết điểm dừng
- Sửa điểm dừng
- Xóa điểm dừng
- Sắp xếp điểm dừng (↑↓)
- Đánh giá sao 1-5

**Nhật ký:**

- Xem nhật ký
- Sửa/xóa nhật ký

**Lọc & tags:**

- Tags (8 tag có sẵn)
- Lọc theo tag
- Sort nâng cao (mới nhất / tên A-Z / lượt xem)

**UX:**

- Toast notification (5 loại)
- Confirm modal
- Breadcrumb
- Skeleton loading

**Nâng cao:**

- Biểu đồ cột (CSS thuần)
- Xuất PDF (window.print)
- Export JSON
- Import JSON

### Changed

- Data model: thêm `tags`, `luotXem`, `taoLuc` cho ChuyenDi
- Data model: thêm `danhGia`, `thuTu` cho DiemDung
- Routes: 12 → 15 tuyến
- Thêm 3 stores mới: `useToastStore`, `useChuyenDiStore`, `useDiemDungStore`

---

## [1.0.0] — 2026-10-09

### Added

- Setup dự án Vite + React 19 + TypeScript
- Cấu hình ESLint, Prettier
- Mock API server (4 endpoint)
- 3 features: chuyen-di, diem-dung, nhat-ky
- 2 Context: Theme, Auth
- 4 stores: YeuThich, Toast, ChuyenDi, DiemDung, NhatKy (khởi tạo)
- 12 tuyến cơ bản
- Tài liệu: AGENTS.md, PRD.md, ROUTES.md, DATA-MODEL.md

### Notes

- Phiên bản MVP, chưa có CRUD đầy đủ
- Chưa có toast, modal, tags, export/import
