import { Link } from "react-router";
import { NutBam } from "../components/NutBam";

export function NotFoundPage() {
  return (
    <section style={{ textAlign: "center", padding: "var(--khoang-12) 0" }}>
      <h1 style={{ fontSize: 64, margin: 0 }}>404</h1>
      <p style={{ color: "var(--mau-chu-phu)" }}>
        Trang bạn tìm không tồn tại.
      </p>
      <Link to="/">
        <NutBam bienThe="chinh">Về trang chủ</NutBam>
      </Link>
    </section>
  );
}
