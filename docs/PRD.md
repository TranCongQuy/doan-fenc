# PRD — Nhật ký hành trình Huế

> **Tên dự án:** `doan-fenc` — Nhật ký hành trình Huế
> **Mã tài liệu:** PRD-INT718-2026-001
> **Phiên bản:** 2.0.0
> **Ngày ban hành:** 12/10/2026
> **Người soạn:** [Họ tên sinh viên] · **MSSV:** [MSSV]
> **Học phần:** INT.7.18 — Web FrontEnd nâng cao
> **Trạng thái:** Approved

---

## Mục lục

1. Tóm tắt điều hành
2. Bối cảnh & vấn đề
3. Mục tiêu & chỉ số thành công
4. Người dùng & persona
5. User stories chi tiết (28 chức năng)
6. User flows
7. Mô hình dữ liệu
8. Danh sách tuyến
9. Ma trận chức năng × Route
10. Yêu cầu phi chức năng
11. Hướng dẫn UI/UX
12. Kiến trúc kỹ thuật
13. Ngoài phạm vi
14. Rủi ro & giảm thiểu
15. Timeline
16. Definition of Done
17. Kết quả đạt được
18. Glossary

---

## 1. Tóm tắt điều hành

**Nhật ký hành trình Huế** là một ứng dụng web cá nhân giúp người dùng ghi chép, tổ chức và lưu giữ hành trình khám phá Huế. Ứng dụng cho phép tạo **chuyến đi** (hành trình nhiều ngày), thêm **điểm dừng** (địa điểm cụ thể), và viết **nhật ký** (cảm xúc, ghi chú) cho mỗi điểm dừng.

Ứng dụng xây dựng dưới dạng SPA với React 19 + TypeScript, lưu dữ liệu cục bộ (localStorage) qua Zustand persist, cùng mock API server.

**Phiên bản 2.0 bổ sung 22 chức năng mới** so với v1.0, bao gồm: CRUD đầy đủ, tags, đánh giá sao, sắp xếp, toast, modal, biểu đồ, export/import, in PDF.

---

## 2. Bối cảnh & vấn đề

### 2.1. Vấn đề

Du khách đến Huế gặp:

- Thông tin phân tán (Google Maps, blog, ghi chú rời rạc)
- Không có công cụ tổ chức hành trình theo chuyến đi cụ thể
- Không lưu giữ được cảm xúc tại mỗi điểm
- Muốn chia sẻ hành trình nhưng không có định dạng phù hợp
- Không có công cụ thống kê hành trình đã đi

### 2.2. Giải pháp

Ứng dụng cung cấp không gian số để:

1. **Lên kế hoạch** chuyến đi với nhiều điểm dừng
2. **Ghi chép** cảm xúc, ghi chú tại mỗi điểm
3. **Lưu giữ** hành trình để xem lại hoặc chia sẻ
4. **Thống kê** hành trình theo tháng, tags, lượt xem
5. **Xuất / nhập** dữ liệu để sao lưu

---

## 3. Mục tiêu & chỉ số thành công

### 3.1. Mục tiêu sản phẩm

| #   | Mục tiêu                            | Đo lường           |
| --- | ----------------------------------- | ------------------ |
| G1  | Tạo chuyến đi đầu tiên trong 2 phút | Thời gian ≤ 2 phút |
| G2  | Thêm ≥ 3 điểm dừng/chuyến           | Số điểm dừng ≥ 3   |
| G3  | Viết nhật ký cho mỗi điểm dừng      | Tỉ lệ ≥ 50%        |
| G4  | Người dùng quay lại                 | Session/user ≥ 2   |
| G5  | Người dùng dùng tags                | ≥ 1 tag/chuyến     |
| G6  | Người dùng export dữ liệu           | ≥ 1 lần/user       |

### 3.2. Mục tiêu kỹ thuật

| #   | Mục tiêu                 | Ngưỡng    |
| --- | ------------------------ | --------- |
| T1  | `npm run typecheck`      | 0 lỗi     |
| T2  | `npm run build`          | 0 lỗi     |
| T3  | `npm test`               | 100% pass |
| T4  | Lighthouse Performance   | ≥ 90      |
| T5  | Lighthouse Accessibility | ≥ 90      |
| T6  | Bundle size (JS gzip)    | ≤ 200 KB  |

---

## 4. Người dùng & persona

### 4.1. Persona chính — Minh, 28 tuổi, nhân viên IT

| Thuộc tính    | Mô tả                                                    |
| ------------- | -------------------------------------------------------- |
| **Nhân khẩu** | 28 tuổi, Đà Nẵng, làm IT                                 |
| **Mục tiêu**  | Cuối tuần đi Huế 2 ngày, muốn ghi lại hành trình         |
| **Nỗi đau**   | Không nhớ nổi đã ăn gì, ghé đâu sau 2 tuần               |
| **Câu quote** | _"Đi Huế về muốn viết lại mà lười, cuối cùng quên hết."_ |

### 4.2. Persona phụ — Linh, 22 tuổi, sinh viên du lịch

| Thuộc tính    | Mô tả                                                |
| ------------- | ---------------------------------------------------- |
| **Nhân khẩu** | 22 tuổi, sinh viên ngành Du lịch                     |
| **Mục tiêu**  | Viết blog review các điểm đến ở Huế                  |
| **Câu quote** | _"Mình muốn lưu lại từng cảm xúc ở mỗi nơi đã ghé."_ |

### 4.3. Persona admin (giả lập)

Chỉ để demo ProtectedRoute — xem dashboard thống kê, quản lý dữ liệu (export/import).

---

## 5. User stories chi tiết (28 chức năng)

### 🟢 NHÓM A — QUẢN LÝ CHUYẾN ĐI (CRUD)

#### US#1 — Tạo chuyến đi mới 🔴 MVP

> **Là** du khách, **tôi muốn** tạo chuyến đi mới, **để** lên kế hoạch.

**Acceptance Criteria:**

- [ ] Route `/chuyen-di/tao-moi` (bảo vệ)
- [ ] Form: tên (3–80 ký tự), mô tả (≤ 300), ngày bắt đầu/kết thúc, trạng thái, tags (multi-select 8 tag)
- [ ] Zod validation, hiển thị lỗi khi rời ô (touched)
- [ ] Submit thành công → store, navigate `/chuyen-di/:id`, hiện toast "Đã tạo chuyến đi"
- [ ] Submit lỗi → chặn, focus ô lỗi đầu tiên

#### US#10 — Sửa chuyến đi 🟡

> **Là** du khách, **tôi muốn** sửa chuyến đi đã tạo.

**Acceptance Criteria:**

- [ ] Route `/chuyen-di/:id/sua` (bảo vệ)
- [ ] Form prefill từ dữ liệu cũ
- [ ] Nếu ID không tồn tại → hiện NotFound
- [ ] Sau khi lưu → quay lại detail, toast "Đã cập nhật"

#### US#11 — Xóa chuyến đi 🟡

> **Là** du khách, **tôi muốn** xóa chuyến đi không cần nữa.

**Acceptance Criteria:**

- [ ] Nút "Xóa" trong detail page
- [ ] Bấm → mở ModalXacNhan với tên chuyến đi
- [ ] Xác nhận → xóa cascade (chuyến + điểm dừng + nhật ký liên quan)
- [ ] Toast "Đã xóa chuyến đi", navigate về `/chuyen-di`

#### US#12 — Nhân bản chuyến đi 🟡

> **Là** du khách, **tôi muốn** nhân bản chuyến đi để tạo biến thể mới.

**Acceptance Criteria:**

- [ ] Nút "Nhân bản" trong detail
- [ ] Tạo bản sao: `ten = "[Tên cũ] (bản sao)"`, `luotXem = 0`, `taoLuc = now`
- [ ] KHÔNG copy điểm dừng / nhật ký
- [ ] Sau khi tạo → navigate sang bản sao

#### US#28 — Đếm lượt xem 🔵 Nâng cao

> **Là** du khách, **tôi muốn** thấy chuyến đi này được xem bao nhiêu lần.

**Acceptance Criteria:**

- [ ] Mỗi lần vào `/chuyen-di/:id` → `luotXem++`
- [ ] Dùng `useEffect` với `[id]` để tránh đếm trùng
- [ ] Hiển thị "X lượt xem" trong detail

---

### 🟢 NHÓM B — QUẢN LÝ ĐIỂM DỪNG (CRUD)

#### US#2 — Thêm điểm dừng 🔴 MVP

> **Là** du khách, **tôi muốn** thêm điểm dừng vào chuyến đi.

**Acceptance Criteria:**

- [ ] Route `/diem-dung/them/:chuyenDiId` (bảo vệ)
- [ ] Form: tên (bắt buộc), địa chỉ, ngày, thời gian, ghi chú
- [ ] Ngày phải trong khoảng `[ngayBatDau, ngayKetThuc]` chuyến đi
- [ ] `thuTu` tự động = max + 1
- [ ] Sau khi thêm → quay lại detail chuyến đi

#### US#13 — Chi tiết điểm dừng 🟡

> **Là** du khách, **tôi muốn** xem chi tiết điểm dừng.

**Acceptance Criteria:**

- [ ] Route `/diem-dung/:id`
- [ ] Hiển thị: tên, địa chỉ, ngày, thời gian, ghi chú, đánh giá
- [ ] Có link đến nhật ký, nút sửa/xóa

#### US#14 — Sửa điểm dừng 🟡

**Acceptance Criteria:**

- [ ] Route `/diem-dung/:id/sua` (bảo vệ)
- [ ] Form prefill
- [ ] Sau khi lưu → quay lại detail

#### US#15 — Xóa điểm dừng 🟡

**Acceptance Criteria:**

- [ ] Confirm modal
- [ ] Xóa cascade cả nhật ký liên quan
- [ ] Toast thành công

#### US#16 — Sắp xếp điểm dừng 🟡

> **Là** du khách, **tôi muốn** đổi thứ tự điểm dừng trong chuyến.

**Acceptance Criteria:**

- [ ] Mỗi điểm dừng có nút ↑ và ↓
- [ ] Nút ↑ disabled nếu đã ở đầu, ↓ disabled nếu ở cuối
- [ ] Click → hoán đổi `thuTu` với item liền kề
- [ ] Danh sách render theo `thuTu` tăng dần

#### US#19 — Đánh giá sao 🟡

> **Là** du khách, **tôi muốn** đánh giá điểm dừng 1-5 sao.

**Acceptance Criteria:**

- [ ] 5 nút sao trong detail điểm dừng
- [ ] Click sao → lưu `danhGia` vào state
- [ ] Hiển thị số sao đã đánh giá
- [ ] Có thể đổi đánh giá

---

### 🟢 NHÓM C — NHẬT KÝ

#### US#3 — Viết nhật ký 🔴 MVP

**Acceptance Criteria:**

- [ ] Route `/nhat-ky/viet/:diemDungId` (bảo vệ)
- [ ] Form: radio cảm xúc (4 lựa chọn), textarea nội dung (10-500), URL hình
- [ ] Breadcrumb tên điểm dừng + chuyến đi
- [ ] Bộ đếm ký tự còn lại
- [ ] Mỗi điểm dừng chỉ 1 nhật ký — đã có thì auto chuyển sang sửa

#### US#17 — Xem nhật ký 🟡

**Acceptance Criteria:**

- [ ] Route `/nhat-ky/:diemDungId`
- [ ] Hiển thị đầy đủ: cảm xúc, nội dung, hình
- [ ] Có nút sửa, xóa

#### US#18 — Sửa/xóa nhật ký 🟡

**Acceptance Criteria:**

- [ ] Sửa: form prefill, route giống US#3
- [ ] Xóa: confirm modal, sau khi xóa → quay lại detail điểm dừng

---

### 🟢 NHÓM D — LỌC, TÌM KIẾM, TAGS

#### US#4 — Lọc + tìm kiếm 🔴 MVP

**Acceptance Criteria:**

- [ ] Ô tìm kiếm + dropdown trạng thái
- [ ] Query params: `q`, `trangThai`
- [ ] Lọc + tìm kiếm kết hợp (AND)
- [ ] Empty state + nút "Xoá bộ lọc"

#### US#20 — Tags 🟡

**Acceptance Criteria:**

- [ ] 8 tag có sẵn: `bien`, `nui`, `am-thuc`, `lich-su`, `van-hoa`, `chua`, `lang-tam`, `thien-nhien`
- [ ] Component `ChonTags` — multi-select dạng checkbox
- [ ] Lưu `tags: string[]` vào ChuyenDi
- [ ] Hiển thị badge tag trong thẻ chuyến đi

#### US#21 — Lọc theo tag 🟡

**Acceptance Criteria:**

- [ ] Dropdown chọn tag trên `/chuyen-di`
- [ ] Query param `?tag=bien`
- [ ] Kết hợp được với các filter khác

#### US#28b — Sort nâng cao 🔵

**Acceptance Criteria:**

- [ ] Dropdown sort: "Mới nhất", "Tên A-Z", "Nhiều lượt xem"
- [ ] Query param `?sapXep=moi-nhat|ten-az|luot-xem`

---

### 🟢 NHÓM E — YÊU THÍCH & AUTH

#### US#5 — Lưu yêu thích 🟡

**Acceptance Criteria:**

- [ ] Nút ♡/♥ trên mỗi thẻ
- [ ] Zustand persist `useYeuThichStore`
- [ ] Trang `/yeu-thich`
- [ ] Badge header realtime
- [ ] Sau F5 vẫn còn

#### US#8 — Đăng nhập admin 🔴 MVP

**Acceptance Criteria:**

- [ ] Route `/admin/login`
- [ ] Tài khoản `admin` / `hue2026`
- [ ] Lưu `from` state để quay lại trang cũ

#### US#6 — Admin dashboard 🟢

**Acceptance Criteria:**

- [ ] Route `/admin` (bảo vệ)
- [ ] Thống kê: tổng chuyến đi, điểm dừng, nhật ký
- [ ] Top 3 chuyến đi nhiều điểm dừng nhất

---

### 🟢 NHÓM F — UX NÂNG CAO

#### US#22 — Toast notification 🟡

**Acceptance Criteria:**

- [ ] Zustand store `useToastStore` (không persist)
- [ ] Component `ToastContainer` ở RootLayout
- [ ] Hiện toast khi CRUD thành công/lỗi
- [ ] Tự động ẩn sau 3 giây
- [ ] Hỗ trợ 4 loại: `thanh-cong`, `loi`, `canh-bao`, `thong-tin`

#### US#23 — Confirm modal 🟡

**Acceptance Criteria:**

- [ ] Component `ModalXacNhan` dùng chung
- [ ] Props: `tieuDe`, `noiDung`, `nhanXacNhan`, `onXacNhan`, `onHuy`
- [ ] Đóng được bằng Esc, click backdrop
- [ ] Focus trap + `aria-modal="true"`

#### US#24 — Biểu đồ cột 🔵

**Acceptance Criteria:**

- [ ] Component `BieuDoCot` dùng CSS thuần (không thư viện)
- [ ] Thống kê số chuyến đi theo 12 tháng
- [ ] Hiển thị trong `/admin`

#### US#25 — Xuất PDF 🔵

**Acceptance Criteria:**

- [ ] Nút "In" trên detail chuyến đi
- [ ] `window.print()` + `@media print` CSS
- [ ] Ẩn header/footer khi in, chỉ in nội dung

#### US#26 — Export JSON 🔵

**Acceptance Criteria:**

- [ ] Trang `/admin/du-lieu` (bảo vệ)
- [ ] Nút "Tải JSON" → tải file `doan-fenc-backup.json`
- [ ] Chứa toàn bộ: chuyến đi, điểm dừng, nhật ký, yêu thích

#### US#27 — Import JSON 🔵

**Acceptance Criteria:**

- [ ] Input file `.json`
- [ ] Đọc file, validate bằng Zod
- [ ] Xác nhận ghi đè → khôi phục stores
- [ ] Toast thành công/lỗi

---

## 6. User flows

### Flow tạo chuyến đi

```
/ → "Tạo chuyến đi mới" → nếu chưa login → /admin/login
→ /chuyen-di/tao-moi → điền form + chọn tags → submit
→ toast "Đã tạo" → /chuyen-di/:id
```

### Flow thêm điểm dừng

```
/chuyen-di/:id → "Thêm điểm dừng" → /diem-dung/them/:chuyenDiId
→ điền → validate ngày → submit → quay lại /chuyen-di/:id
```

### Flow viết nhật ký

```
/chuyen-di/:id → click điểm dừng → /diem-dung/:id
→ "Viết nhật ký" → /nhat-ky/viet/:diemDungId
→ điền → submit → quay lại /diem-dung/:id
```

### Flow sửa/xóa chuyến đi

```
/chuyen-di/:id → "Sửa" → /chuyen-di/:id/sua → lưu → quay lại
/chuyen-di/:id → "Xóa" → modal confirm → xác nhận → /chuyen-di
```

### Flow đăng nhập admin

```
/admin → ProtectedRoute → isAdmin? → /admin/login?from=/admin
→ đăng nhập → navigate(from, replace)
```

### Flow export dữ liệu

```
/admin → "Quản lý dữ liệu" → /admin/du-lieu
→ "Tải JSON" → tải file backup
→ "Import" → chọn file → validate → xác nhận → khôi phục
```

---

## 7. Mô hình dữ liệu

### 7.1. ChuyenDi

```ts
interface ChuyenDi {
  id: string; // UUID hoặc cd01...
  ten: string; // 3-80 ký tự
  moTa: string; // ≤ 300
  ngayBatDau: string; // YYYY-MM-DD
  ngayKetThuc: string; // ≥ ngayBatDau
  trangThai: "du-dinh" | "dang-di" | "da-xong";
  tags: string[]; // ✨ MỚI v2.0
  luotXem: number; // ✨ MỚI v2.0
  taoLuc: string; // ✨ MỚI v2.0 — ISO datetime
}
```

### 7.2. DiemDung

```ts
interface DiemDung {
  id: string;
  chuyenDiId: string;
  ten: string;
  diaChi: string;
  ngay: string;
  thoiGian: string; // HH:mm
  ghiChu: string;
  danhGia: number; // ✨ MỚI v2.0 — 1-5
  thuTu: number; // ✨ MỚI v2.0 — thứ tự trong chuyến
}
```

### 7.3. NhatKy

```ts
interface NhatKy {
  id: string;
  diemDungId: string;
  camXuc: "tuyet-voi" | "vui" | "binh-thuong" | "met";
  noiDung: string; // 10-500
  hinh: string; // URL
}
```

### 7.4. Quan hệ

```
ChuyenDi (1) ──< (N) DiemDung (1) ──< (1) NhatKy
   │
   └── tags: string[]
```

### 7.5. Hằng số TAGS

```ts
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
```

---

## 8. Danh sách tuyến

Chi tiết đầy đủ tại `docs/ROUTES.md` v2.0.

| #   | Route                         | Page               | Bảo vệ |
| --- | ----------------------------- | ------------------ | ------ |
| 1   | `/`                           | HomePage           | Không  |
| 2   | `/chuyen-di`                  | ChuyenDiListPage   | Không  |
| 3   | `/chuyen-di/:id`              | ChuyenDiDetailPage | Không  |
| 4   | `/chuyen-di/tao-moi`          | TaoChuyenDiPage    | **Có** |
| 5   | `/chuyen-di/:id/sua`          | SuaChuyenDiPage    | **Có** |
| 6   | `/diem-dung/:id`              | DiemDungDetailPage | Không  |
| 7   | `/diem-dung/them/:chuyenDiId` | ThemDiemDungPage   | **Có** |
| 8   | `/diem-dung/:id/sua`          | SuaDiemDungPage    | **Có** |
| 9   | `/nhat-ky/:diemDungId`        | NhatKyPage         | Không  |
| 10  | `/nhat-ky/viet/:diemDungId`   | VietNhatKyPage     | **Có** |
| 11  | `/yeu-thich`                  | YeuThichPage       | Không  |
| 12  | `/admin/login`                | AdminLoginPage     | Không  |
| 13  | `/admin`                      | AdminDashboardPage | **Có** |
| 14  | `/admin/du-lieu`              | AdminDataPage      | **Có** |
| 15  | `*`                           | NotFoundPage       | Không  |

---

## 9. Ma trận chức năng × Route

| #   | Chức năng              | Route chính         | Tầng     |
| --- | ---------------------- | ------------------- | -------- |
| 1   | Danh sách chuyến đi    | /chuyen-di          | MVP      |
| 2   | Chi tiết chuyến đi     | /chuyen-di/:id      | MVP      |
| 3   | Tạo chuyến đi          | /chuyen-di/tao-moi  | MVP      |
| 4   | Thêm điểm dừng         | /diem-dung/them/:id | MVP      |
| 5   | Viết nhật ký           | /nhat-ky/viet/:id   | MVP      |
| 6   | Lọc + tìm kiếm         | /chuyen-di?q=       | MVP      |
| 7   | Yêu thích              | /yeu-thich          | MVP      |
| 8   | Đăng nhập              | /admin/login        | MVP      |
| 9   | Dashboard              | /admin              | MVP      |
| 10  | Sửa chuyến đi          | /chuyen-di/:id/sua  | Mở rộng  |
| 11  | Xóa chuyến đi          | Detail              | Mở rộng  |
| 12  | Nhân bản chuyến đi     | Detail              | Mở rộng  |
| 13  | Chi tiết điểm dừng     | /diem-dung/:id      | Mở rộng  |
| 14  | Sửa điểm dừng          | /diem-dung/:id/sua  | Mở rộng  |
| 15  | Xóa điểm dừng          | Detail              | Mở rộng  |
| 16  | Sắp xếp điểm dừng (↑↓) | List                | Mở rộng  |
| 17  | Xem nhật ký            | /nhat-ky/:id        | Mở rộng  |
| 18  | Sửa/xóa nhật ký        | Form                | Mở rộng  |
| 19  | Đánh giá sao           | Detail              | Mở rộng  |
| 20  | Tags                   | Form                | Mở rộng  |
| 21  | Lọc theo tag           | /chuyen-di?tag=     | Mở rộng  |
| 22  | Toast                  | Global              | Mở rộng  |
| 23  | Confirm modal          | Global              | Mở rộng  |
| 24  | Biểu đồ cột            | /admin              | Nâng cao |
| 25  | Xuất PDF               | Detail              | Nâng cao |
| 26  | Export JSON            | /admin/du-lieu      | Nâng cao |
| 27  | Import JSON            | /admin/du-lieu      | Nâng cao |
| 28  | Đếm lượt xem + Sort    | Detail + List       | Nâng cao |

---

## 10. Yêu cầu phi chức năng

- **Hiệu năng:** FCP ≤ 1.5s, bundle ≤ 200KB
- **Accessibility:** WCAG AA, `aria-label`, `role="alert"`, `role="status"`, focus visible
- **Responsive:** 375 / 768 / 1024 px
- **Bảo mật:** Không lưu mật khẩu thật, mock auth, không hardcode API key
- **Bảo trì:** file ≤ 150 dòng, typecheck 0 lỗi, không `any`
- **Print:** có `@media print` cho các trang detail

---

## 11. Hướng dẫn UI/UX

### Bảng màu

| Vai trò    | Mã        |
| ---------- | --------- |
| Chính      | `#0F6E6A` |
| Phụ        | `#B8860B` |
| Thành công | `#2F855A` |
| Lỗi        | `#9B2C2C` |
| Cảnh báo   | `#B7791F` |
| Nền sáng   | `#FAFAF7` |
| Nền tối    | `#1A1A1A` |

### Typography

- Font: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- h1: 32px/700, h2: 24px/700, body: 16px/400

### Spacing

Base 4px: 4, 8, 12, 16, 24, 32, 48

### Trạng thái UI

Mọi trang tải dữ liệu phải có 3 trạng thái: đang tải / lỗi / rỗng.

### Microcopy

- Empty state: "Chưa có chuyến đi nào. Bắt đầu tạo chuyến đi đầu tiên!"
- Lỗi API: "Không tải được dữ liệu. Vui lòng thử lại."
- Toast thành công: "Đã lưu" / "Đã xóa" / "Đã cập nhật"
- Xác nhận xóa: "Bạn có chắc muốn xóa? Hành động này không thể hoàn tác."

---

## 12. Kiến trúc kỹ thuật

```
┌──────────────────────────────────┐
│         React SPA                 │
│  Router → Pages → Features        │
│  Zustand Stores + Context         │
│  fetch + Zod safeParse            │
└──────────────┬───────────────────┘
               │ HTTP
               ▼
┌──────────────────────────────────┐
│  Mock API (Node, port 4000)       │
└──────────────────────────────────┘

Stores:
- useYeuThichStore (persist: yeu-thich-chuyen-di)
- useToastStore (không persist)
- useChuyenDiStore (persist: chuyen-di-hue)
- useDiemDungStore (persist: diem-dung-hue)
- useNhatKyStore (persist: nhat-ky-hue)
```

---

## 13. Ngoài phạm vi

- Không đặt vé / thanh toán
- Không upload ảnh thật (dùng URL)
- Không bản đồ tương tác
- Không xác thực thật (mock)
- Không gửi email
- Không PWA / offline
- Không đa ngôn ngữ
- Không CI/CD

---

## 14. Rủi ro & giảm thiểu

| #   | Rủi ro                    | Giảm thiểu                                  |
| --- | ------------------------- | ------------------------------------------- |
| R1  | API server không chạy     | Có fallback data trong `src/data/`          |
| R2  | Zod không khớp API        | Test schema                                 |
| R3  | Router 8 breaking changes | Đọc docs kỹ, pin version                    |
| R4  | Thời gian không đủ        | Ưu tiên MVP + Mở rộng, cắt Nâng cao nếu cần |
| R5  | AI sinh code sai          | Checklist 8 điểm                            |
| R6  | localStorage đầy          | Cảnh báo khi > 50 chuyến đi                 |
| R7  | Import JSON sai format    | Zod validate trước khi ghi                  |

---

## 15. Timeline

| Ngày     | Việc                                           |
| -------- | ---------------------------------------------- |
| T6 tối   | Setup + docs v2.0                              |
| T7 sáng  | Nền tảng (types, stores, contexts, toast)      |
| T7 chiều | Router + 15 trang skeleton + shared components |
| T7 tối   | US#1, US#4, US#20, US#21                       |
| CN sáng  | US#2, US#3, US#10-19                           |
| CN chiều | US#22-28                                       |
| CN tối   | Test + docs + push                             |
| T2 sáng  | Nộp PR                                         |

---

## 16. Definition of Done

### Chắc chắn có

- [x] 15 tuyến hoạt động
- [x] 28 chức năng (9 MVP + 14 Mở rộng + 5 Nâng cao)
- [x] 5 Zustand stores + 2 Context + Zod
- [x] Discriminated union
- [x] Toast + Confirm modal
- [x] typecheck + build sạch
- [x] README + PROMPTS + AI-DECLARATION
- [x] AGENTS.md, PRD.md, ROUTES.md, DATA-MODEL.md

### Cố gắng có

- [ ] Test routes + 2 form
- [ ] Biểu đồ cột
- [ ] Export/Import JSON
- [ ] In PDF

---

## 17. Kết quả đạt được

_[Sẽ điền sau khi hoàn thành]_

---

## 18. Glossary

| Thuật ngữ           | Giải thích               |
| ------------------- | ------------------------ |
| Chuyến đi           | Hành trình nhiều ngày    |
| Điểm dừng           | Địa điểm trong chuyến đi |
| Nhật ký             | Ghi chép cảm xúc         |
| SPA                 | Single Page Application  |
| Discriminated union | Type với trường nhãn     |
| Zustand             | State management         |
| Zod                 | Validation               |
| ProtectedRoute      | Route yêu cầu login      |
| Toast               | Thông báo nổi            |
| Tag                 | Nhãn phân loại           |

---

**Người phê duyệt:** [Họ tên sinh viên] · **Ngày:** [Ngày]
