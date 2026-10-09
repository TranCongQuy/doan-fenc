# ROUTES.md — Bảng tuyến chi tiết

> Tham chiếu: PRD.md mục 8 · AGENTS.md mục 3

## Bảng tuyến

| #   | Đường dẫn                     | Trang              | Layout      | Tham số              | Bảo vệ |
| --- | ----------------------------- | ------------------ | ----------- | -------------------- | ------ |
| 1   | `/`                           | HomePage           | RootLayout  | —                    | Không  |
| 2   | `/chuyen-di`                  | ChuyenDiListPage   | RootLayout  | `?q=`, `?trangThai=` | Không  |
| 3   | `/chuyen-di/:id`              | ChuyenDiDetailPage | RootLayout  | `:id`                | Không  |
| 4   | `/chuyen-di/tao-moi`          | TaoChuyenDiPage    | RootLayout  | —                    | **Có** |
| 5   | `/diem-dung/:id`              | DiemDungDetailPage | RootLayout  | `:id`                | Không  |
| 6   | `/diem-dung/them/:chuyenDiId` | ThemDiemDungPage   | RootLayout  | `:chuyenDiId`        | **Có** |
| 7   | `/nhat-ky/:diemDungId`        | NhatKyPage         | RootLayout  | `:diemDungId`        | Không  |
| 8   | `/nhat-ky/viet/:diemDungId`   | VietNhatKyPage     | RootLayout  | `:diemDungId`        | **Có** |
| 9   | `/yeu-thich`                  | YeuThichPage       | RootLayout  | —                    | Không  |
| 10  | `/admin/login`                | AdminLoginPage     | (không)     | `state.from`         | Không  |
| 11  | `/admin`                      | AdminDashboardPage | AdminLayout | —                    | **Có** |
| 12  | `*`                           | NotFoundPage       | RootLayout  | —                    | Không  |

## Cây tuyến

```
/
├── / (index) → HomePage
├── chuyen-di
│   ├── / (index) → ChuyenDiListPage
│   ├── tao-moi → TaoChuyenDiPage [bảo vệ]
│   └── :id → ChuyenDiDetailPage
├── diem-dung
│   ├── :id → DiemDungDetailPage
│   └── them/:chuyenDiId → ThemDiemDungPage [bảo vệ]
├── nhat-ky
│   ├── :diemDungId → NhatKyPage
│   └── viet/:diemDungId → VietNhatKyPage [bảo vệ]
├── yeu-thich → YeuThichPage
├── admin
│   ├── login → AdminLoginPage
│   └── / (index) → AdminDashboardPage [bảo vệ]
└── * → NotFoundPage
```

## Ghi chú

- Tuyến bảo vệ dùng `ProtectedRoute` đọc `isAdmin` từ `AuthContext`.
- Tuyến động dùng `useParams()` — luôn trả về chuỗi.
- `?q=` và `?trangThai=` dùng `useSearchParams()`.
