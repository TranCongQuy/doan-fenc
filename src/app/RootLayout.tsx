import { Link, NavLink, Outlet } from "react-router";
import { ToastContainer } from "../components/ToastContainer";
import {
  useChuyenDiStore,
  useYeuThichStore,
} from "../features/chuyen-di/store";
import { useAuth } from "./contexts/AuthContext";
import { useTheme } from "./contexts/ThemeContext";

export function RootLayout() {
  const { theme, toggle } = useTheme();
  const { isAdmin, logout } = useAuth();
  const soYeuThich = useYeuThichStore((s) => s.daLuu.length);
  const soChuyenDiCaNhan = useChuyenDiStore((s) => s.dsChuyenDi.length);
  const tenApp = import.meta.env.VITE_APP_NAME ?? "Nhật ký hành trình Huế";

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-noi-dung">
          <Link to="/" className="app__logo">
            {tenApp}
          </Link>

          <nav className="app__nav" aria-label="Điều hướng chính">
            <NavLink to="/" end className="app__nav-link">
              Trang chủ
            </NavLink>
            <NavLink to="/chuyen-di" className="app__nav-link">
              Chuyến đi
            </NavLink>
            <NavLink to="/yeu-thich" className="app__nav-link">
              Yêu thích ({soYeuThich})
            </NavLink>
            {isAdmin && (
              <NavLink to="/admin" className="app__nav-link">
                Quản trị ({soChuyenDiCaNhan})
              </NavLink>
            )}
          </nav>

          <div className="app__header-hanh-dong">
            <button
              type="button"
              className="app__nut-chu-de"
              onClick={toggle}
              aria-label={`Chuyển sang chế độ ${theme === "light" ? "tối" : "sáng"}`}
              title={`Chế độ ${theme === "light" ? "sáng" : "tối"}`}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {isAdmin ? (
              <button
                type="button"
                className="app__nut-dang-xuat"
                onClick={logout}
              >
                Đăng xuất
              </button>
            ) : (
              <Link to="/admin/login" className="app__nut-dang-nhap">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="app__main">
        <Outlet />
      </main>

      <footer className="app__footer">
        <p>© 2026 doan-fenc — Nhật ký hành trình Huế</p>
      </footer>

      <ToastContainer />
    </div>
  );
}
