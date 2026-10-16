import type { ReactNode } from "react";

type TheProps = {
  tieuDe?: ReactNode;
  hanhDong?: ReactNode;
  children: ReactNode;
};

export function The({ tieuDe, hanhDong, children }: TheProps) {
  const coDau = Boolean(tieuDe || hanhDong);
  return (
    <article className="the">
      {coDau && (
        <header className="the__dau">
          {tieuDe && <h3 className="the__tieu-de">{tieuDe}</h3>}
          {hanhDong && <div className="the__hanh-dong">{hanhDong}</div>}
        </header>
      )}
      <div className="the__than">{children}</div>
    </article>
  );
}
