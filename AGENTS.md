# AGENTS.md — Luật làm việc cho trợ lý AI và cộng tác viên

> **Phiên bản:** 1.0.0
> **Ngày ban hành:** 09/10/2026
> **Áp dụng cho:** dự án `doan-fenc` — đồ án INT.7.18 Web FrontEnd nâng cao
> **Phạm vi hiệu lực:** mọi mã nguồn, tài liệu, commit, prompt AI trong suốt vòng đời dự án
> **Mục đích:** Định nghĩa "luật chơi" để mọi mã nguồn do AI sinh ra hoặc do thành viên viết đều tuân theo cùng một chuẩn — đảm bảo tính nhất quán, khả năng bảo trì, khả năng vấn đáp và tính trung thực học thuật.

---

## Mục lục

1. Tổng quan dự án
2. Tech stack — KHÔNG tự ý đổi
3. Cấu trúc thư mục — bất di bất dịch
4. Quy tắc import một chiều
5. Quy ước đặt tên
6. Quy ước TypeScript
7. Quy ước React
8. Quy ước state management
9. Quy ước styling
10. Quy ước xử lý lỗi
11. Quy ước testing
12. Quy ước Git
13. Quy ước làm việc với AI — Vibe coding có kiểm soát
14. Checklist review code — trước khi merge PR
15. Câu hỏi thường gặp
16. Tài liệu tham khảo

---

## 1. Tổng quan dự án

| Hạng mục               | Nội dung                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| **Tên dự án**          | `doan-fenc` — Nhật ký hành trình Huế                                                      |
| **Mã môn học**         | INT.7.18 — Web FrontEnd nâng cao (3 tín chỉ)                                              |
| **Mục tiêu**           | Ứng dụng web cá nhân giúp người dùng ghi chép, tổ chức và lưu giữ hành trình khám phá Huế |
| **Đối tượng**          | Du khách cá nhân, người viết blog du lịch                                                 |
| **Phạm vi**            | SPA chạy trên trình duyệt, dữ liệu cục bộ (localStorage) + mock API                       |
| **Nền tảng**           | React 19 + TypeScript + Vite                                                              |
| **Thời lượng**         | 3 ngày (đồ án cá nhân)                                                                    |
| **Ngôn ngữ giao diện** | Tiếng Việt có dấu                                                                         |
| **Ngôn ngữ định danh** | Tiếng Việt không dấu (biến, hàm, type)                                                    |

---

## 2. Tech stack — KHÔNG tự ý đổi

### 2.1. Bắt buộc

| Lớp            | Công nghệ                 | Phiên bản | Ghi chú                                                              |
| -------------- | ------------------------- | --------- | -------------------------------------------------------------------- |
| Framework      | React                     | 19.x      | Function component + Hook only                                       |
| Ngôn ngữ       | TypeScript                | 5.8+      | `strict: true`, KHÔNG `any`                                          |
| Build tool     | Vite                      | 6.x       | Dev server + build                                                   |
| Router         | `react-router`            | 8.x       | Import từ `"react-router"`, `RouterProvider` từ `"react-router/dom"` |
| State toàn cục | Zustand                   | 5.x       | Có middleware `persist` cho localStorage                             |
| State cục bộ   | `useState` / `useReducer` | —         | Mặc định cho state chỉ 1 component dùng                              |
| Context        | React Context API         | —         | Chỉ cho theme + auth                                                 |
| Validation     | Zod                       | 4.x       | Cho cả API response và biểu mẫu                                      |
| Styling        | CSS thuần + CSS variable  | —         | KHÔNG Tailwind, KHÔNG UI kit                                         |
| Runtime        | Node.js                   | ≥ 22.22.0 | Yêu cầu của react-router 8                                           |

### 2.2. Cấm — không cài thêm nếu chưa hỏi

- ❌ Redux, Redux Toolkit, MobX, Recoil, Jotai
- ❌ Tailwind CSS, Bootstrap, Material UI, Ant Design, Chakra UI
- ❌ Axios, SWR, TanStack Query
- ❌ React Hook Form, Formik
- ❌ Moment.js, date-fns, Day.js
- ❌ `classnames`, `clsx`, `lodash`

### 2.3. Được phép cân nhắc (phải hỏi trước)

- `vitest` + `@testing-library/react` — cho testing
- `@types/*` — cho TypeScript

---

## 3. Cấu trúc thư mục — bất di bất dịch

```
doan-fenc/
├── AGENTS.md
├── PROMPTS.md
├── AI-DECLARATION.md
├── README.md
├── .env
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── docs/
│   ├── PRD.md
│   ├── ROUTES.md
│   └── DATA-MODEL.md
├── server/
│   └── api.cjs
└── src/
    ├── main.tsx
    ├── vite-env.d.ts
    ├── app/
    │   ├── App.tsx
    │   ├── providers.tsx
    │   ├── router.tsx
    │   ├── routes.tsx
    │   ├── RootLayout.tsx
    │   ├── AdminLayout.tsx
    │   ├── ProtectedRoute.tsx
    │   └── contexts/
    │       ├── ThemeContext.tsx
    │       └── AuthContext.tsx
    ├── features/
    │   ├── chuyen-di/
    │   │   ├── types.ts
    │   │   ├── schema.ts
    │   │   ├── store.ts
    │   │   ├── components/
    │   │   └── hooks/
    │   │       └── useChuyenDiList.ts
    │   ├── diem-dung/
    │   │   ├── types.ts
    │   │   ├── schema.ts
    │   │   ├── components/
    │   │   └── hooks/
    │   ├── nhat-ky/
    │   │   ├── types.ts
    │   │   ├── schema.ts
    │   │   ├── components/
    │   │   └── hooks/
    │   └── auth/
    ├── pages/
    ├── components/
    ├── lib/
    │   ├── api.ts
    │   ├── format.ts
    │   └── storage.ts
    ├── data/
    │   └── chuyenDi.ts
    └── styles/
        ├── variables.css
        └── globals.css
```

src/components/
├── The.tsx ← card có tiêu đề + children
├── NutBam.tsx ← button có biến thể
├── HopThongBao.tsx ← hộp thông báo (4 loại)
├── TrangThaiRong.tsx ← empty state
├── PageLayout.tsx ← layout 3 khe
├── TruongNhapLieu.tsx ← wrapper input + label + error
├── Modal.tsx ← ✨ modal cơ bản
├── ModalXacNhan.tsx ← ✨ modal xác nhận xóa
├── Toast.tsx ← ✨ 1 toast item
├── ToastContainer.tsx ← ✨ container nhiều toast
├── Breadcrumb.tsx ← ✨ điều hướng lùi
├── Skeleton.tsx ← ✨ loading placeholder
├── DanhGiaSao.tsx ← ✨ đánh giá 1-5 sao
├── ChonTags.tsx ← ✨ multi-select tags
└── BieuDoCot.tsx ← ✨ biểu đồ cột CSS thuần

## 4. Quy tắc import một chiều

**Nguyên tắc:** Thư mục cấp cao **KHÔNG được** import ngược từ thư mục cấp thấp hơn.

| Thư mục           | Được import từ                                     | KHÔNG được import từ           |
| ----------------- | -------------------------------------------------- | ------------------------------ |
| `app/`            | `pages/`, `features/`, `components/`, `lib/`       | —                              |
| `pages/`          | `features/`, `components/`, `lib/`                 | `app/`                         |
| `features/<tên>/` | `components/`, `lib/`, file trong chính feature đó | `pages/`, `app/`, feature khác |
| `components/`     | `lib/`                                             | `features/`, `pages/`, `app/`  |
| `lib/`            | —                                                  | Mọi thư mục khác               |

**Ví dụ đúng:**

```ts
import { TheChuyenDi } from "../features/chuyen-di/components/TheChuyenDi";
import { NutBam } from "../components/NutBam";
import { dinhDangNgay } from "../lib/format";
```

**Ví dụ sai:**

```ts
// src/components/NutBam.tsx
import { useChuyenDiList } from "../features/chuyen-di/hooks/useChuyenDiList";
// ❌ components/ không được import từ features/
```

**Đường dẫn import:**

- ✅ Dùng đường dẫn tương đối
- ❌ KHÔNG dùng `../../..` quá 2 cấp
- ❌ KHÔNG dùng alias `@/`

---

## 5. Quy ước đặt tên

### 5.1. File & thư mục

| Loại       | Quy ước             | Ví dụ                          |
| ---------- | ------------------- | ------------------------------ |
| Component  | PascalCase `.tsx`   | `TheChuyenDi.tsx`              |
| Hook       | camelCase `use*.ts` | `useChuyenDiList.ts`           |
| Store      | `store.ts`          | `features/chuyen-di/store.ts`  |
| Schema Zod | `schema.ts`         | `features/chuyen-di/schema.ts` |
| Types      | `types.ts`          | `features/chuyen-di/types.ts`  |
| CSS        | camelCase `.css`    | `globals.css`                  |

### 5.2. Định danh — tiếng Việt không dấu

| Loại           | Quy ước            | Ví dụ                        |
| -------------- | ------------------ | ---------------------------- |
| Component      | PascalCase         | `TheChuyenDi`                |
| Hook           | `use` + PascalCase | `useChuyenDiList`            |
| Biến, hàm      | camelCase          | `dsChuyenDi`, `dinhDangNgay` |
| Hằng số        | SCREAMING_SNAKE    | `DS_DIA_DANH`, `BASE_URL`    |
| Type/Interface | PascalCase         | `ChuyenDi`, `TrangThaiTai`   |
| Union literal  | kebab-case string  | `'du-dinh' \| 'dang-di'`     |

### 5.3. Đặt tên theo ngữ nghĩa nghiệp vụ

| ❌ Sai                    | ✅ Đúng                           |
| ------------------------- | --------------------------------- |
| `data`, `info`, `list`    | `dsChuyenDi`, `thongTinNguoiDung` |
| `handleClick`, `onClick2` | `xuLyChonChuyenDi`                |
| `flag`, `check`           | `daHoanThanh`                     |
| `temp`, `val`             | `giaTriTam`                       |

### 5.4. Quy ước tiếng Việt

- **Định danh:** viết liền không dấu
- **Chuỗi hiển thị:** tiếng Việt có dấu
- **Comment:** tiếng Việt có dấu, giải thích lý do

---

## 6. Quy ước TypeScript

### 6.1. Bắt buộc bật `strict`

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "verbatimModuleSyntax": true
  }
}
```

### 6.2. Cấm `any` — dùng `unknown` rồi thu hẹp

```ts
// ❌ CẤM
function xuLy(data: any) {
  return data.ten;
}

// ✅ ĐÚNG — dùng Zod
const kq = schema.safeParse(data);
if (!kq.success) throw new Error("Dữ liệu không hợp lệ");
return kq.data.ten;
```

### 6.3. `type` vs `interface`

- **Props component:** dùng `type`
- **Mô hình dữ liệu:** dùng `interface` hoặc `z.infer<typeof Schema>`

### 6.4. Discriminated union cho trạng thái

```ts
// ✅ ĐÚNG
type TrangThaiTai<T> =
  | { trangThai: "dang-tai" }
  | { trangThai: "loi"; loi: string }
  | { trangThai: "thanh-cong"; duLieu: T };
```

### 6.5. Kiểu cho sự kiện

| Sự kiện          | Kiểu                            |
| ---------------- | ------------------------------- |
| `onChange` input | `ChangeEvent<HTMLInputElement>` |
| `onSubmit` form  | `SubmitEvent<HTMLFormElement>`  |
| `onClick` button | `MouseEvent<HTMLButtonElement>` |

❌ KHÔNG dùng `FormEvent` (deprecated).

### 6.6. Import kiểu bằng `import type`

```ts
import type { ReactNode } from "react";
import type { ChuyenDi } from "../features/chuyen-di/types";
```

### 6.7. `find()` trả về `T | undefined` — bắt buộc kiểm tra

```ts
const cd = dsChuyenDi.find((c) => c.id === id)
if (!cd) return <NotFoundPage />
```

### 6.8. `catch (e)` — `e` là `unknown`

```ts
catch (e) {
  const thongBao = e instanceof Error ? e.message : 'Lỗi không xác định'
}
```

---

## 7. Quy ước React

### 7.1. Function component — KHÔNG `React.FC`

```tsx
// ✅ ĐÚNG
type TheChuyenDiProps = {
  chuyenDi: ChuyenDi;
  onChon: (id: string) => void;
};

export function TheChuyenDi({ chuyenDi, onChon }: TheChuyenDiProps) {
  return <article onClick={() => onChon(chuyenDi.id)}>{chuyenDi.ten}</article>;
}
```

### 7.2. Hook — tuân thủ Rules of Hooks

- Chỉ gọi Hook ở **cấp cao nhất**
- KHÔNG gọi Hook trong: vòng lặp, `if`, hàm lồng, `try/catch`

### 7.3. `useEffect` — chỉ cho side effect thật

**Chỉ dùng khi:**

- Gọi API
- Đăng ký / huỷ event listener, timer
- Đồng bộ với hệ thống ngoài React

**KHÔNG dùng để:**

- Tính giá trị dẫn xuất
- Đồng bộ state A theo state B
- Chuyển trang

### 7.4. `key` trong danh sách

- **Luôn** dùng `key` khi `.map()`
- Dùng `id` ổn định, KHÔNG dùng `index`

### 7.5. Component dưới 150 dòng

---

## 8. Quy ước state management

### Thang 5 bậc — dừng ở bậc đầu tiên đủ dùng

| Bậc | Cơ chế             | Dùng khi                  |
| --- | ------------------ | ------------------------- |
| 1   | `useState` cục bộ  | Chỉ 1 component dùng      |
| 2   | Nâng lên cha chung | Vài component cùng cha    |
| 3   | Context            | Toàn ứng dụng, đổi hiếm   |
| 4   | Zustand store      | Nghiệp vụ, nhiều nơi dùng |
| 5   | Server state       | Dữ liệu từ API            |

### Zustand — luôn dùng selector

```tsx
// ✅ ĐÚNG
const ds = useChuyenDiStore((s) => s.ds);
```

### Danh sách stores đầy đủ (v1.1)

| Store              | Khoá localStorage     | State                         | Persist |
| ------------------ | --------------------- | ----------------------------- | ------- |
| `useYeuThichStore` | `yeu-thich-chuyen-di` | `daLuu: string[]`             | ✓       |
| `useToastStore`    | (không)               | `toasts: Toast[]`             | ✗       |
| `useChuyenDiStore` | `chuyen-di-hue`       | `dsChuyenDi` + CRUD actions   | ✓       |
| `useDiemDungStore` | `diem-dung-hue`       | `dsDiemDung` + CRUD + reorder | ✓       |
| `useNhatKyStore`   | `nhat-ky-hue`         | `dsNhatKy` + CRUD             |

---

### Quy tắc store

- Mỗi store dùng **selector**: `useStore((s) => s.field)`
- Action luôn cập nhật **immutable**: dùng spread, không `push`/`splice`
- Store có persist thì thêm `version` để migration sau này
- Toast store KHÔNG persist (tự xóa sau 3 giây)

## 9. Quy ước styling

- CSS thuần + CSS variable
- File: `src/styles/variables.css`, `src/styles/globals.css`
- Class name BEM rút gọn: `the-chuyen-di__tieu-de`, `the-chuyen-di--dang-chon`
- Dark mode: `[data-theme="dark"]`

### Print CSS (v1.1)

Các trang detail cần in được (chuyến đi, điểm dừng, nhật ký) phải có:

```css
@media print {
  .app__header,
  .app__footer,
  .nut,
  .breadcrumb {
    display: none !important;
  }
  .app__main {
    padding: 0;
    max-width: none;
  }
  .the {
    border: 1px solid #000;
    box-shadow: none;
  }
}
---

## 10. Quy ước xử lý lỗi

- Lỗi API → dùng Zod `safeParse`
- Lỗi component → hiển thị bằng UI, KHÔNG `console.error`
- KHÔNG `console.log` trong mã nộp

---

## 11. Quy ước testing

- Test bộ tuyến bằng `createMemoryRouter`
- Test 2 form chính
- Chạy `npm test` phải xanh trước khi push

---

## 12. Quy ước Git

### Branch

- `feature/<mô-tả>` — tính năng mới
- `fix/<mô-tả>` — sửa bug
- `do-an/<tên>` — đồ án

### Commit message — Conventional Commits

Format: `<loại>(<phạm-vi>): <mô tả>`

Ví dụ:

```

feat(chuyen-di): thêm form tạo chuyến đi mới
fix(router): sửa lỗi protected route
docs(prd): cập nhật mục ngoài phạm vi

```

### Trước khi push

- [ ] `npm run typecheck` → 0 lỗi
- [ ] `npm run build` → không lỗi
- [ ] Không có `console.log`
- [ ] Không có `any`
- [ ] Đã cập nhật `AI-DECLARATION.md`

---

## 13. Quy ước làm việc với AI — Vibe coding có kiểm soát

### Vòng 6 bước

1. **Spec** — Viết rõ cần gì
2. **Prompt** — Viết prompt 5 phần
3. **Generate** — Yêu cầu AI nêu kế hoạch trước
4. **Review** — Đọc từng dòng theo checklist 8 điểm
5. **Test** — Chạy typecheck, build, test
6. **Commit** — Commit nhỏ, message rõ, khai báo AI

### Checklist review mã AI — 8 điểm

1. Có `any` không?
2. Có thêm thư viện ngoài danh sách?
3. Có sửa file ngoài yêu cầu?
4. Cùng dữ liệu có bị lưu 2 nơi?
5. Có sửa trực tiếp state?
6. Component có đăng ký cả store?
7. Có khoá API viết cứng?
8. Giải thích được từng dòng?

### Ba luật studio

1. Không commit mã chưa đọc
2. Mỗi PR có ít nhất 1 thay đổi tự viết tay
3. Ai viết prompt, người đó giải thích

---

## 14. Checklist review code — trước khi merge PR

### Kiến trúc

- [ ] Import một chiều đúng
- [ ] Component dưới 150 dòng

### TypeScript

- [ ] Không `any`
- [ ] Props có type
- [ ] Import type

### React

- [ ] Function component
- [ ] Hook ở cấp cao nhất
- [ ] `key` dùng id

### State

- [ ] Đặt đúng bậc
- [ ] Không lưu giá trị dẫn xuất

### Chất lượng

- [ ] Không `console.log`
- [ ] Tên biến có nghĩa

### Trải nghiệm

- [ ] Có loading / lỗi / rỗng
- [ ] Responsive ≥ 375px

---

## 15. Câu hỏi thường gặp

**Q1: Dùng thư viện không có trong danh sách?**
Hỏi trưởng nhóm trước.

**Q2: Code cũ vi phạm AGENTS.md?**
Sửa nếu đang động vào file đó.

**Q3: AI sinh code vi phạm?**
Từ chối commit, yêu cầu sửa lại.

**Q4: Dùng alias `@/`?**
Không.

**Q5: Dùng `enum`?**
Không — dùng union literal.

---

## 16. Tài liệu tham khảo

- React: https://react.dev/learn
- React Router: https://reactrouter.com
- Zustand: https://zustand.docs.pmnd.rs
- Zod: https://zod.dev
- TypeScript: https://www.typescriptlang.org/docs/handbook

---

## Cam kết

Tôi đã đọc, hiểu và đồng ý tuân thủ toàn bộ nội dung file `AGENTS.md` này.

**Người cam kết:** [Họ tên sinh viên]
**MSSV:** [MSSV]
**Ngày:** [Ngày ký]
```
