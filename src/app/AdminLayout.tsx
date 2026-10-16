import { NavLink, Outlet } from "react-router";

export function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-layout__sidebar">
        <h2 className="admin-layout__tieu-de">Quản trị</h2>
        <nav className="admin-layout__nav">
          <NavLink to="/admin" end className="admin-layout__link">
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/du-lieu" className="admin-layout__link">
            💾 Quản lý dữ liệu
          </NavLink>
        </nav>
      </aside>
      <div className="admin-layout__noi-dung">
        <Outlet />
      </div>
    </div>
  );
}
