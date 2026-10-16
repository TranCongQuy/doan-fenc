```markdown
# ARCHITECTURE.md — Kiến trúc kỹ thuật

> **Phiên bản:** 1.0 · **Cập nhật:** 12/10/2026
> Tham chiếu: PRD.md mục 12 · AGENTS.md mục 3, 8

---

## 1. Sơ đồ tổng thể

┌──────────────────────────────────────────┐
│ Trình duyệt │
│ ┌────────────────────────────────────┐ │
│ │ React SPA (Vite) │ │
│ │ ┌──────────┐ ┌──────────┐ │ │
│ │ │ Router │→ │ Pages │ │ │
│ │ └──────────┘ └────┬─────┘ │ │
│ │ ↓ │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ │ Features (types/schema/store)│ │ │
│ │ └──────────────┬───────────────┘ │ │
│ │ ↓ │ │
│ │ ┌──────────────────────────────┐ │ │
│ │ │ Shared Components │ │ │
│ │ └──────────────────────────────┘ │ │
│ │ │ │
│ │ ┌──────────────┐ ┌─────────────┐ │ │
│ │ │ Zustand │ │ Context │ │ │
│ │ │ Stores │ │ Theme/Auth │ │ │
│ │ └──────┬───────┘ └─────────────┘ │ │
│ │ │ │ │
│ │ ┌──────▼─────────────────────┐ │ │
│ │ │ fetch + Zod safeParse │ │ │
│ │ └──────┬─────────────────────┘ │ │
│ └─────────┼──────────────────────────┘ │
└────────────┼──────────────────────────────┘
│ HTTP
▼
┌──────────────────────────────────────────┐
│ Mock API Server (Node, port 4000) │
│ GET /api/chuyen-di │
│ GET /api/chuyen-di/:id │
│ GET /api/diem-dung?chuyenDiId=... │
│ GET /api/nhat-ky?diemDungId=... │
└──────────────────────────────────────────┘

text

---

## 2. Luồng dữ liệu

### 2.1. Luồng đọc (Read)

User mở /chuyen-di
↓
Page render
↓
useChuyenDiList() gọi layDsChuyenDi()
↓
fetch → API server
↓
API trả { success, data }
↓
Zod safeParse(data)
↓
├─ Thành công → setState { trangThai: 'thanh-cong', duLieu }
└─ Lỗi → setState { trangThai: 'loi', loi }
↓
Component re-render, hiển thị tương ứng

text

### 2.2. Luồng ghi (Create/Update/Delete)

User submit form
↓
Event handler (onSubmit)
↓
e.preventDefault()
↓
Zod safeParse(formData)
↓
├─ Lỗi → setState lỗi, hiển thị touched
└─ Thành công → gọi store action
↓
Store action cập nhật state (immutable)
↓
Zustand persist → localStorage
↓
Toast thành công
↓
navigate('/duong-dan')

text

---

## 3. Sơ đồ stores

┌──────────────────────────────────────────┐
│ Global Stores │
│ │
│ useYeuThichStore ── persist ──┐ │
│ useChuyenDiStore ── persist ──┤ │
│ useDiemDungStore ── persist ──┼──→ localStorage
│ useNhatKyStore ── persist ──┤ │
│ useToastStore ── không ────┘ │
│ │
│ Contexts │
│ │
│ ThemeContext (light/dark) │
│ AuthContext (isAdmin) │
└──────────────────────────────────────────┘

text

---

## 4. Quyết định kỹ thuật

| #   | Quyết định           | Lý do                                      |
| --- | -------------------- | ------------------------------------------ |
| 1   | Zustand thay Redux   | Nhẹ hơn, không boilerplate, có persist sẵn |
| 2   | Zustand thay Context | Context re-render toàn bộ subscribers      |
| 3   | Zod thay Yup         | TypeScript-first, infer type               |
| 4   | CSS thuần            | Không cần build step, không phụ thuộc      |
| 5   | react-router 8       | Version mới, hỗ trợ React 19               |
| 6   | Mock API bằng Node   | Không cần cài backend, dễ hiểu             |
| 7   | Discriminated union  | Loại bỏ trạng thái vô nghĩa                |
| 8   | Toast thay alert()   | UX tốt hơn, không block                    |
| 9   | ModalXacNhan         | An toàn hơn `confirm()` của browser        |
| 10  | Feature-based folder | Dễ tìm, dễ xóa, ít conflict                |

---

## 5. Cấu trúc thư mục chi tiết

doan-fenc/
├── AGENTS.md
├── PROMPTS.md
├── AI-DECLARATION.md
├── README.md
├── .env / .env.example
├── docs/
│ ├── PRD.md
│ ├── ROUTES.md
│ ├── DATA-MODEL.md
│ └── ARCHITECTURE.md ← file này
├── server/
│ └── api.cjs
└── src/
├── main.tsx
├── app/
│ ├── providers.tsx
│ ├── router.tsx
│ ├── routes.tsx
│ ├── RootLayout.tsx
│ ├── AdminLayout.tsx
│ ├── ProtectedRoute.tsx
│ └── contexts/
│ ├── ThemeContext.tsx
│ └── AuthContext.tsx
├── features/
│ ├── chuyen-di/{types,schema,store,hooks,components}
│ ├── diem-dung/{types,schema,store,hooks,components}
│ └── nhat-ky/{types,schema,store,hooks,components}
├── pages/ (15 file)
├── components/ (15 file dùng chung)
├── lib/
│ ├── api.ts
│ ├── format.ts
│ └── storage.ts
├── data/
│ └── chuyenDi.ts
└── styles/
├── variables.css
├── globals.css
└── print.css

text

---

## 6. Testing strategy

| Loại       | Công cụ                  | Số test tối thiểu |
| ---------- | ------------------------ | ----------------- |
| Route      | `createMemoryRouter`     | 5                 |
| Form       | Testing Library + Vitest | 2                 |
| Zod schema | Vitest                   | 3                 |

---

## 7. Deployment (ngoài phạm vi đồ án)

Khi deploy lên Vercel/Netlify:

- Build: `npm run build`
- Output: `dist/`
- Rewrite rule: mọi route → `index.html` (cho SPA)
- Mock API: cần deploy riêng hoặc dùng mock trong client
```
