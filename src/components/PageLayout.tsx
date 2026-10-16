import type { ReactNode } from "react";

type PageLayoutProps = {
  header?: ReactNode;
  sidebar?: ReactNode;
  main: ReactNode;
};

export function PageLayout({ header, sidebar, main }: PageLayoutProps) {
  const coSidebar = Boolean(sidebar);
  return (
    <div className="page-layout">
      {header && <header className="page-layout__header">{header}</header>}
      <div
        className={`page-layout__body${coSidebar ? " page-layout__body--co-sidebar" : ""}`}
      >
        {sidebar && <aside className="page-layout__sidebar">{sidebar}</aside>}
        <main className="page-layout__main">{main}</main>
      </div>
    </div>
  );
}
