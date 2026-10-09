# PRD — Nhật ký hành trình Huế

> **Tên dự án:** `doan-fenc` — Nhật ký hành trình Huế
> **Mã tài liệu:** PRD-INT718-2026-001
> **Phiên bản:** 1.0.0
> **Ngày ban hành:** 09/10/2026
> **Người soạn:** [Họ tên sinh viên] · **MSSV:** [MSSV]
> **Học phần:** INT.7.18 — Web FrontEnd nâng cao
> **Trạng thái:** Approved

---

## 1. Tóm tắt điều hành

**Nhật ký hành trình Huế** là một ứng dụng web cá nhân giúp người dùng ghi chép, tổ chức và lưu giữ hành trình khám phá Huế. Ứng dụng cho phép tạo **chuyến đi** (hành trình nhiều ngày), thêm **điểm dừng** (địa điểm cụ thể), và viết **nhật ký** (cảm xúc, ghi chú) cho mỗi điểm dừng.

Ứng dụng xây dựng dưới dạng SPA với React 19 + TypeScript, lưu dữ liệu cục bộ (localStorage) qua Zustand persist, cùng mock API server.

---

## 2. Bối cảnh & vấn đề

### 2.1. Vấn đề

Du khách đến Huế gặp:

- Thông tin phân tán (Google Maps, blog, ghi chú rời rạc)
- Không có công cụ tổ chức hành trình theo chuyến đi cụ thể
- Không lưu giữ được cảm xúc tại mỗi điểm
- Muốn chia sẻ hành trình nhưng không có định dạng phù hợp

### 2.2. Giải pháp

Ứng dụng cung cấp không gian số để:

1. **Lên kế hoạch** chuyến đi với nhiều điểm dừng
2. **Ghi chép** cảm xúc, ghi chú tại mỗi điểm
3. **Lưu giữ** hành trình để xem lại hoặc chia sẻ

---

## 3. Mục tiêu & chỉ số thành công

### 3.1. Mục tiêu sản phẩm

| #   | Mục tiêu                            | Đo lường           |
| --- | ----------------------------------- | ------------------ |
| G1  | Tạo chuyến đi đầu tiên trong 2 phút | Thời gian ≤ 2 phút |
| G2  | Thêm ≥ 3 điểm dừng/chuyến           | Số điểm dừng ≥ 3   |
| G3  | Viết nhật ký cho mỗi điểm dừng      | Tỉ lệ ≥ 50%        |
| G4  | Người dùng quay lại                 | Session/user ≥ 2   |

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

Chỉ để demo ProtectedRoute — xem dashboard thống kê.

---

## 5. User stories chi tiết

### US#1 — Tạo chuyến đi mới 🔴 MVP

> **Là** du khách, **tôi muốn** tạo chuyến đi mới, **để** lên kế hoạch.

**Acceptance Criteria:**

- [ ] Trang `/chuyen-di/tao-moi` (bảo vệ)
- [ ] Form: tên (3–80 ký tự), mô tả (≤ 300), ngày bắt đầu, ngày kết thúc (≥ ngày bắt đầu), trạng thái
- [ ] Zod validation, hiển thị lỗi khi rời ô (touched)
- [ ] Submit thành công → lưu store, chuyển trang chi tiết
- [ ] Submit lỗi → chặn, focus ô lỗi đầu tiên
- [ ] Thông báo `role="status"` khi thành công

### US#2 — Thêm điểm dừng 🔴 MVP

> **Là** du khách, **tôi muốn** thêm điểm dừng vào chuyến đi.

**Acceptance Criteria:**

- [ ] Trang `/diem-dung/them/:chuyenDiId` (bảo vệ)
- [ ] Form: tên (bắt buộc), địa chỉ, ngày, thời gian, ghi chú
- [ ] Ngày phải nằm trong khoảng chuyến đi
- [ ] Sau khi thêm → quay lại trang chi tiết
- [ ] Danh sách sắp xếp theo ngày + thời gian

### US#3 — Viết nhật ký 🔴 MVP

> **Là** du khách, **tôi muốn** viết nhật ký cho mỗi điểm dừng.

**Acceptance Criteria:**

- [ ] Trang `/nhat-ky/viet/:diemDungId` (bảo vệ)
- [ ] Form: cảm xúc (radio 4 lựa chọn), nội dung (10–500 ký tự), hình (URL)
- [ ] Breadcrumb hiển thị tên điểm dừng + chuyến đi
- [ ] Mỗi điểm dừng chỉ có 1 nhật ký — nếu có rồi thì sửa
- [ ] Bộ đếm ký tự còn lại

### US#4 — Lọc + tìm kiếm 🔴 MVP

> **Là** du khách, **tôi muốn** lọc và tìm kiếm chuyến đi.

**Acceptance Criteria:**

- [ ] Ô tìm kiếm + dropdown lọc trạng thái
- [ ] Từ khóa lưu URL (`?q=`)
- [ ] Trạng thái lưu URL (`?trangThai=`)
- [ ] Lọc + tìm kiếm kết hợp (AND)
- [ ] Empty state + nút "Xoá bộ lọc"

### US#5 — Lưu yêu thích 🟡 Should have

> **Là** du khách, **tôi muốn** đánh dấu chuyến đi yêu thích.

**Acceptance Criteria:**

- [ ] Nút ♡ / ♥ trên mỗi thẻ
- [ ] Lưu Zustand persist
- [ ] Trang `/yeu-thich`
- [ ] Badge header realtime
- [ ] Sau F5 vẫn còn

### US#6 — Admin dashboard 🟢 Nice to have

> **Là** admin, **tôi muốn** đăng nhập và xem thống kê.

**Acceptance Criteria:**

- [ ] `/admin/login` — tài khoản `admin` / `hue2026`
- [ ] Sau đăng nhập → `/admin`
- [ ] Dashboard: tổng chuyến đi, điểm dừng, nhật ký, top 3
- [ ] ProtectedRoute chuyển hướng khi chưa đăng nhập

---

## 6. User flows

### Flow tạo chuyến đi

```
/ → "Tạo chuyến đi mới" → nếu chưa đăng nhập → /admin/login
→ /chuyen-di/tao-moi → điền → submit → /chuyen-di/:id
```

### Flow thêm điểm dừng

```
/chuyen-di/:id → "Thêm điểm dừng" → /diem-dung/them/:chuyenDiId
→ điền → submit → quay lại /chuyen-di/:id
```

### Flow viết nhật ký

```
/diem-dung/:id → "Viết nhật ký" → /nhat-ky/viet/:diemDungId
→ điền → submit → quay lại /diem-dung/:id
```

### Flow đăng nhập admin

```
/admin → ProtectedRoute → nếu chưa login → /admin/login?from=/admin
→ đăng nhập → navigate(from, replace)
```

---

## 7. Mô hình dữ liệu

### ChuyenDi

```ts
interface ChuyenDi {
  id: string;
  ten: string; // 3-80 ký tự
  moTa: string; // ≤ 300
  ngayBatDau: string; // YYYY-MM-DD
  ngayKetThuc: string; // ≥ ngayBatDau
  trangThai: "du-dinh" | "dang-di" | "da-xong";
}
```

### DiemDung

```ts
interface DiemDung {
  id: string;
  chuyenDiId: string; // FK
  ten: string;
  diaChi: string;
  ngay: string; // trong khoảng chuyến đi
  thoiGian: string; // HH:mm
  ghiChu: string; // ≤ 200
}
```

### NhatKy

```ts
interface NhatKy {
  id: string;
  diemDungId: string; // FK, unique
  camXuc: "tuyet-voi" | "vui" | "binh-thuong" | "met";
  noiDung: string; // 10-500
  hinh: string; // URL
}
```

### Quan hệ

```
ChuyenDi (1) ──< (N) DiemDung (1) ──< (1) NhatKy
```

---

## 8. Danh sách tuyến

| #   | Route                         | Page               | Bảo vệ |
| --- | ----------------------------- | ------------------ | ------ |
| 1   | `/`                           | HomePage           | Không  |
| 2   | `/chuyen-di`                  | ChuyenDiListPage   | Không  |
| 3   | `/chuyen-di/:id`              | ChuyenDiDetailPage | Không  |
| 4   | `/chuyen-di/tao-moi`          | TaoChuyenDiPage    | **Có** |
| 5   | `/diem-dung/:id`              | DiemDungDetailPage | Không  |
| 6   | `/diem-dung/them/:chuyenDiId` | ThemDiemDungPage   | **Có** |
| 7   | `/nhat-ky/:diemDungId`        | NhatKyPage         | Không  |
| 8   | `/nhat-ky/viet/:diemDungId`   | VietNhatKyPage     | **Có** |
| 9   | `/yeu-thich`                  | YeuThichPage       | Không  |
| 10  | `/admin/login`                | AdminLoginPage     | Không  |
| 11  | `/admin`                      | AdminDashboardPage | **Có** |
| 12  | `*`                           | NotFoundPage       | Không  |

---

## 9. Yêu cầu phi chức năng

- **Hiệu năng:** FCP ≤ 1.5s, bundle ≤ 200KB
- **Accessibility:** WCAG AA, `aria-label`, `role="alert"`
- **Responsive:** 375 / 768 / 1024 px
- **Bảo mật:** Không lưu mật khẩu thật, mock auth
- **Bảo trì:** file ≤ 150 dòng, typecheck 0 lỗi

---

## 10. Hướng dẫn UI/UX

### Bảng màu

| Vai trò    | Mã        |
| ---------- | --------- |
| Chính      | `#0F6E6A` |
| Phụ        | `#B8860B` |
| Thành công | `#2F855A` |
| Lỗi        | `#9B2C2C` |
| Nền sáng   | `#FAFAF7` |
| Nền tối    | `#1A1A1A` |

### Typography

- Font: `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`
- h1: 32px/700, h2: 24px/700, body: 16px/400

### Spacing

Base 4px: 4, 8, 12, 16, 24, 32

### Trạng thái UI

Mọi trang tải dữ liệu phải có 3 trạng thái: đang tải / lỗi / rỗng.

---

## 11. Kiến trúc kỹ thuật

```
┌──────────────────────────────────┐
│         React SPA                 │
│  Router → Pages → Features        │
│  Zustand Store + Context          │
│  fetch + Zod safeParse            │
└──────────────┬───────────────────┘
               │ HTTP
               ▼
┌──────────────────────────────────┐
│  Mock API (Node, port 4000)       │
└──────────────────────────────────┘
```

---

## 12. Ngoài phạm vi

- Không đặt vé / thanh toán
- Không upload ảnh thật
- Không bản đồ tương tác
- Không xác thực thật (mock)
- Không gửi email
- Không PWA / offline
- Không đa ngôn ngữ
- Không CI/CD

---

## 13. Rủi ro & giảm thiểu

| #   | Rủi ro                    | Giảm thiểu                       |
| --- | ------------------------- | -------------------------------- |
| R1  | API server không chạy     | Có fallback data                 |
| R2  | Zod không khớp API        | Test schema                      |
| R3  | Router 8 breaking changes | Đọc docs kỹ                      |
| R4  | Thời gian 3 ngày không đủ | Ưu tiên US#1-4, cắt US#6 nếu cần |
| R5  | AI sinh code sai          | Checklist 8 điểm                 |

---

## 14. Timeline

| Ngày     | Việc                               |
| -------- | ---------------------------------- |
| T6 tối   | Setup + docs                       |
| T7 sáng  | Nền tảng (types, stores, contexts) |
| T7 chiều | Router + 12 trang skeleton         |
| T7 tối   | US#1, US#4                         |
| CN sáng  | US#2, US#3                         |
| CN chiều | US#5, US#6                         |
| CN tối   | Test + docs + push                 |
| T2 sáng  | Nộp PR                             |

---

## 15. Definition of Done

### Chắc chắn có

- [x] 12 tuyến hoạt động
- [x] 4 user story MVP
- [x] Zustand + Context + Zod
- [x] Discriminated union
- [x] typecheck + build sạch
- [x] README + PROMPTS + AI-DECLARATION
- [x] AGENTS.md, PRD.md, ROUTES.md

### Cố gắng có

- [ ] US#5, US#6
- [ ] Test routes + 2 form
- [ ] Dark mode

---

## 16. Kết quả đạt được

_[Sẽ điền sau khi hoàn thành]_

---

## 17. Glossary

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

---

**Người phê duyệt:** [Họ tên sinh viên] · **Ngày:** [Ngày]
