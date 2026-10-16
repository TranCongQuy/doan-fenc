// router.tsx — File GỘP: vừa khai báo mảng routes, vừa tạo router instance
// React Router yêu cầu router phải được tạo 1 LẦN ở cấp module
// (không được tạo trong component, sẽ mất state mỗi lần render)

import { createBrowserRouter, type RouteObject } from "react-router";
import { AdminLayout } from "./AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { RootLayout } from "./RootLayout";
import { AdminDashboardPage } from "../pages/AdminDashboardPage.tsx";
import { AdminDataPage } from "../pages/AdminDataPage.tsx";
import { AdminLoginPage } from "../pages/AdminLoginPage.tsx";
import { ChuyenDiDetailPage } from "../pages/ChuyenDiDetailPage.tsx";
import { ChuyenDiListPage } from "../pages/ChuyenDiListPage.tsx";
import { DiemDungDetailPage } from "../pages/DiemDungDetailPage.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import { NhatKyPage } from "../pages/NhatKyPage.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";
import { SuaChuyenDiPage } from "../pages/SuaChuyenDiPage.tsx";
import { SuaDiemDungPage } from "../pages/SuaDiemDungPage.tsx";
import { TaoChuyenDiPage } from "../pages/TaoChuyenDiPage.tsx";
import { ThemDiemDungPage } from "../pages/ThemDiemDungPage.tsx";
import { VietNhatKyPage } from "../pages/VietNhatKyPage.tsx";
import { YeuThichPage } from "../pages/YeuThichPage.tsx";

// ===== Mảng routes (export ra để test bằng createMemoryRouter) =====
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // ===== Tuyến công khai (không cần đăng nhập) =====
      { index: true, element: <HomePage /> },
      { path: "chuyen-di", element: <ChuyenDiListPage /> },
      { path: "diem-dung/:id", element: <DiemDungDetailPage /> },
      { path: "nhat-ky/:diemDungId", element: <NhatKyPage /> },
      { path: "yeu-thich", element: <YeuThichPage /> },
      { path: "admin/login", element: <AdminLoginPage /> },

      // ===== Tuyến được bảo vệ (yêu cầu đăng nhập) =====
      {
        element: <ProtectedRoute />,
        children: [
          { path: "chuyen-di/tao-moi", element: <TaoChuyenDiPage /> },
          { path: "chuyen-di/:id", element: <ChuyenDiDetailPage /> },
          { path: "chuyen-di/:id/sua", element: <SuaChuyenDiPage /> },
          { path: "diem-dung/them/:chuyenDiId", element: <ThemDiemDungPage /> },
          { path: "diem-dung/:id/sua", element: <SuaDiemDungPage /> },
          { path: "nhat-ky/viet/:diemDungId", element: <VietNhatKyPage /> },
          {
            path: "admin",
            element: <AdminLayout />,
            children: [
              { index: true, element: <AdminDashboardPage /> },
              { path: "du-lieu", element: <AdminDataPage /> },
            ],
          },
        ],
      },

      // ===== Tuyến 404 =====
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

// ===== Tạo router instance (1 LẦN duy nhất, ở cấp module) =====
export const router = createBrowserRouter(routes);
