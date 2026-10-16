import { useState, type SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { HopThongBao } from "../components/HopThongBao";
import { NutBam } from "../components/NutBam";
import { TruongNhapLieu } from "../components/TruongNhapLieu";
import { useAuth } from "../app/contexts/AuthContext";

function docFrom(state: unknown): string {
  if (typeof state === "object" && state !== null && "from" in state) {
    const v = (state as { from: unknown }).from;
    if (typeof v === "string") return v;
  }
  return "/admin";
}

export function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loi, setLoi] = useState("");

  function xuLyGui(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (login(username, password)) {
      navigate(docFrom(location.state), { replace: true });
    } else {
      setLoi("Sai tên đăng nhập hoặc mật khẩu");
    }
  }

  return (
    <section style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1>Đăng nhập quản trị</h1>
      <p style={{ color: "var(--mau-chu-phu)" }}>
        Tài khoản demo: <code>admin</code> / <code>hue2026</code>
      </p>

      {loi && <HopThongBao loai="loi">{loi}</HopThongBao>}

      <form onSubmit={xuLyGui}>
        <TruongNhapLieu id="username" nhan="Tên đăng nhập" batBuoc>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </TruongNhapLieu>

        <TruongNhapLieu id="password" nhan="Mật khẩu" batBuoc>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </TruongNhapLieu>

        <NutBam type="submit" bienThe="chinh">
          Đăng nhập
        </NutBam>
      </form>
    </section>
  );
}
