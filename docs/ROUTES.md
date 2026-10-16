# ROUTES.md — Bảng tuyến chi tiết

> **Phiên bản:** 2.0.0 · **Cập nhật:** 12/10/2026
> **Tham chiếu:** PRD.md mục 8 · AGENTS.md mục 3
> **Tổng số tuyến:** 15 · **Tuyến động:** 6 · **Tuyến bảo vệ:** 7

---

## 1. Bảng tuyến đầy đủ

| #   | Đường dẫn                     | Trang              | Layout      | Tham số                                   | Bảo vệ | Chức năng         |
| --- | ----------------------------- | ------------------ | ----------- | ----------------------------------------- | ------ | ----------------- |
| 1   | `/`                           | HomePage           | RootLayout  | —                                         | Không  | 1                 |
| 2   | `/chuyen-di`                  | ChuyenDiListPage   | RootLayout  | `?q=`, `?trangThai=`, `?tag=`, `?sapXep=` | Không  | 1, 6, 21, 28b     |
| 3   | `/chuyen-di/:id`              | ChuyenDiDetailPage | RootLayout  | `:id`                                     | Không  | 2, 11, 12, 25, 28 |
| 4   | `/chuyen-di/tao-moi`          | TaoChuyenDiPage    | RootLayout  | —                                         | **Có** | 3, 20             |
| 5   | `/chuyen-di/:id/sua`          | SuaChuyenDiPage    | RootLayout  | `:id`                                     | **Có** | 10, 20            |
| 6   | `/diem-dung/:id`              | DiemDungDetailPage | RootLayout  | `:id`                                     | Không  | 13, 15, 19        |
| 7   | `/diem-dung/them/:chuyenDiId` | ThemDiemDungPage   | RootLayout  | `:chuyenDiId`                             | **Có** | 4                 |
| 8   | `/diem-dung/:id/sua`          | SuaDiemDungPage    | RootLayout  | `:id`                                     | **Có** | 14                |
| 9   | `/nhat-ky/:diemDungId`        | NhatKyPage         | RootLayout  | `:diemDungId`                             | Không  | 17                |
| 10  | `/nhat-ky/viet/:diemDungId`   | VietNhatKyPage     | RootLayout  | `:diemDungId`                             | **Có** | 5, 18             |
| 11  | `/yeu-thich`                  | YeuThichPage       | RootLayout  | —                                         | Không  | 7                 |
| 12  | `/admin/login`                | AdminLoginPage     | (không)     | `state.from`                              | Không  | 8                 |
| 13  | `/admin`                      | AdminDashboardPage | AdminLayout | —                                         | **Có** | 9, 24             |
| 14  | `/admin/du-lieu`              | AdminDataPage      | AdminLayout | —                                         | **Có** | 26, 27            |
| 15  | `*`                           | NotFoundPage       | RootLayout  | —                                         | Không  | —                 |

---

## 2. Cây tuyến

```
/
├── / (index) → HomePage
│
├── chuyen-di
│   ├── / (index) → ChuyenDiListPage
│   ├── tao-moi → TaoChuyenDiPage [bảo vệ]
│   └── :id
│       ├── / (index) → ChuyenDiDetailPage
│       └── sua → SuaChuyenDiPage [bảo vệ]
│
├── diem-dung
│   ├── :id
│   │   ├── / (index) → DiemDungDetailPage
│   │   └── sua → SuaDiemDungPage [bảo vệ]
│   └── them/:chuyenDiId → ThemDiemDungPage [bảo vệ]
│
├── nhat-ky
│   ├── :diemDungId → NhatKyPage
│   └── viet/:diemDungId → VietNhatKyPage [bảo vệ]
│
├── yeu-thich → YeuThichPage
│
├── admin
│   ├── login → AdminLoginPage
│   ├── / (index) → AdminDashboardPage [bảo vệ]
│   └── du-lieu → AdminDataPage [bảo vệ]
│
└── * → NotFoundPage
```

---

## 3. Chi tiết từng tuyến

### 3.1. `/` — HomePage

| Thuộc tính | Giá trị                                     |
| ---------- | ------------------------------------------- |
| Chức năng  | Giới thiệu + top 3 chuyến đi mới            |
| Bảo vệ     | Không                                       |
| Data nguồn | `useChuyenDiList` (API)                     |
| Điều hướng | Link đến `/chuyen-di`, `/chuyen-di/tao-moi` |

### 3.2. `/chuyen-di` — ChuyenDiListPage

| Thuộc tính   | Giá trị                                                             |
| ------------ | ------------------------------------------------------------------- |
| Chức năng    | Danh sách + filter + search + sort                                  |
| Bảo vệ       | Không                                                               |
| Query params | `q` (tìm kiếm), `trangThai` (lọc), `tag` (lọc tag), `sapXep` (sort) |
| Data nguồn   | `useChuyenDiList` + `useChuyenDiStore` (user data)                  |
| Điều hướng   | Link đến detail, tạo mới                                            |

**Ví dụ URL:**

```
/chuyen-di
/chuyen-di?q=co+do
/chuyen-di?trangThai=dang-di
/chuyen-di?tag=bien&trangThai=da-xong
/chuyen-di?q=lang&sapXep=luot-xem
```

### 3.3. `/chuyen-di/:id` — ChuyenDiDetailPage

| Thuộc tính  | Giá trị                                      |
| ----------- | -------------------------------------------- |
| Chức năng   | Xem chi tiết + sửa + xóa + nhân bản + in PDF |
| Bảo vệ      | Không                                        |
| Params      | `id` (string)                                |
| Side effect | `useEffect` tăng `luotXem`                   |
| Điều hướng  | Nút "Sửa", "Xóa", "Nhân bản", "In"           |

### 3.4. `/chuyen-di/tao-moi` — TaoChuyenDiPage

| Thuộc tính | Giá trị                               |
| ---------- | ------------------------------------- |
| Chức năng  | Form tạo chuyến đi + chọn tags        |
| Bảo vệ     | **Có**                                |
| Validation | Zod: tên 3-80, mô tả ≤300, ngày, tags |
| Sau submit | Navigate `/chuyen-di/:id` + toast     |

### 3.5. `/chuyen-di/:id/sua` — SuaChuyenDiPage

| Thuộc tính | Giá trị                               |
| ---------- | ------------------------------------- |
| Chức năng  | Form sửa (prefill)                    |
| Bảo vệ     | **Có**                                |
| Edge case  | ID không tồn tại → NotFound           |
| Sau submit | Quay lại detail + toast "Đã cập nhật" |

### 3.6. `/diem-dung/:id` — DiemDungDetailPage

| Thuộc tính | Giá trị                                      |
| ---------- | -------------------------------------------- |
| Chức năng  | Chi tiết + đánh giá sao + xóa + link nhật ký |
| Bảo vệ     | Không                                        |
| Điều hướng | Nút "Sửa", "Xóa", "Viết nhật ký"             |

### 3.7. `/diem-dung/them/:chuyenDiId` — ThemDiemDungPage

| Thuộc tính | Giá trị                                       |
| ---------- | --------------------------------------------- |
| Chức năng  | Form thêm điểm dừng                           |
| Bảo vệ     | **Có**                                        |
| Validation | Ngày trong khoảng `[ngayBatDau, ngayKetThuc]` |
| Sau submit | Quay lại detail chuyến đi                     |

### 3.8. `/diem-dung/:id/sua` — SuaDiemDungPage

| Thuộc tính | Giá trị                   |
| ---------- | ------------------------- |
| Chức năng  | Form sửa (prefill)        |
| Bảo vệ     | **Có**                    |
| Sau submit | Quay lại detail điểm dừng |

### 3.9. `/nhat-ky/:diemDungId` — NhatKyPage

| Thuộc tính | Giá trị                      |
| ---------- | ---------------------------- |
| Chức năng  | Xem nhật ký của điểm dừng    |
| Bảo vệ     | Không                        |
| Điều hướng | Nút "Sửa", "Xóa" (nếu đã có) |

### 3.10. `/nhat-ky/viet/:diemDungId` — VietNhatKyPage

| Thuộc tính | Giá trị                                   |
| ---------- | ----------------------------------------- |
| Chức năng  | Form viết / sửa nhật ký                   |
| Bảo vệ     | **Có**                                    |
| Validation | Nội dung 10-500, cảm xúc bắt buộc         |
| Edge case  | Đã có nhật ký → auto prefill (chế độ sửa) |
| Sau submit | Quay lại detail điểm dừng                 |

### 3.11. `/yeu-thich` — YeuThichPage

| Thuộc tính | Giá trị                              |
| ---------- | ------------------------------------ |
| Chức năng  | Danh sách chuyến đi đã yêu thích     |
| Bảo vệ     | Không                                |
| Data nguồn | `useYeuThichStore` (Zustand persist) |

### 3.12. `/admin/login` — AdminLoginPage

| Thuộc tính | Giá trị                                     |
| ---------- | ------------------------------------------- |
| Chức năng  | Đăng nhập admin                             |
| Bảo vệ     | Không                                       |
| State      | `location.state.from` để quay lại sau login |
| Tài khoản  | `admin` / `hue2026`                         |

### 3.13. `/admin` — AdminDashboardPage

| Thuộc tính | Giá trị                        |
| ---------- | ------------------------------ |
| Chức năng  | Thống kê + top 3 + biểu đồ cột |
| Bảo vệ     | **Có**                         |
| Data nguồn | `useChuyenDiList` + stores     |

### 3.14. `/admin/du-lieu` — AdminDataPage

| Thuộc tính | Giá trị                        |
| ---------- | ------------------------------ |
| Chức năng  | Export / Import JSON           |
| Bảo vệ     | **Có**                         |
| Actions    | "Tải JSON", "Chọn file import" |

### 3.15. `*` — NotFoundPage

| Thuộc tính | Giá trị            |
| ---------- | ------------------ |
| Chức năng  | Trang 404          |
| Bảo vệ     | Không              |
| Điều hướng | Nút "Về trang chủ" |

---

## 4. Query params chi tiết

| Param       | Route        | Kiểu   | Giá trị hợp lệ                       | Mặc định   |
| ----------- | ------------ | ------ | ------------------------------------ | ---------- |
| `q`         | `/chuyen-di` | string | Bất kỳ                               | `""`       |
| `trangThai` | `/chuyen-di` | enum   | `du-dinh` \| `dang-di` \| `da-xong`  | (không)    |
| `tag`       | `/chuyen-di` | enum   | 8 tag: `bien`, `nui`, ...            | (không)    |
| `sapXep`    | `/chuyen-di` | enum   | `moi-nhat` \| `ten-az` \| `luot-xem` | `moi-nhat` |

---

## 5. Ghi chú kỹ thuật

- **Tuyến bảo vệ:** Dùng `ProtectedRoute` đọc `isAdmin` từ `AuthContext`.
- **Tuyến động:** Dùng `useParams()` — luôn trả về chuỗi, phải chuyển kiểu nếu cần.
- **Query params:** Dùng `useSearchParams()` — tự động encode/decode URL.
- **Điều hướng sau login:** Lưu `from` vào `location.state`, sau login dùng `navigate(from, { replace: true })`.
- **Điều hướng sau CRUD:** Dùng `navigate('/duong-dan')` (không replace) để user back được.
- **Điều hướng khi lỗi:** Dùng `<Navigate to="/" replace />` để không quay lại trang lỗi.

---

## 6. Checklist route khi review

- [ ] R1 — Import từ `"react-router"`, không dùng `"react-router-dom"`
- [ ] R2 — Path của tuyến con viết tương đối (không bắt đầu `/`)
- [ ] R3 — Mọi layout có `<Outlet />`
- [ ] R4 — Tham số URL đổi kiểu trước khi so sánh
- [ ] R5 — Không gọi `navigate()` trong thân component (chỉ trong event handler)
- [ ] R6 — Có tuyến `*` và xử lý ID không tồn tại
