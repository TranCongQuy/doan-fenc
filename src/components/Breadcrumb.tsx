import { Link } from "react-router";

export type MucBreadcrumb = {
  nhan: string;
  den?: string;
};

type BreadcrumbProps = {
  muc: MucBreadcrumb[];
};

export function Breadcrumb({ muc }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Đường dẫn">
      {muc.map((m, i) => (
        <span
          key={i}
          style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
        >
          {m.den ? (
            <Link to={m.den} className="breadcrumb__item">
              {m.nhan}
            </Link>
          ) : (
            <span className="breadcrumb__item" aria-current="page">
              {m.nhan}
            </span>
          )}
          {i < muc.length - 1 && (
            <span className="breadcrumb__phan-cach" aria-hidden="true">
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
