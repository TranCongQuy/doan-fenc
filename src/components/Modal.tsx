import { useEffect, type ReactNode } from "react";

type ModalProps = {
  mo?: boolean;
  tieuDe: string;
  onDong: () => void;
  children: ReactNode;
  chan?: ReactNode;
};

export function Modal({
  mo = false,
  tieuDe,
  onDong,
  children,
  chan,
}: ModalProps) {
  useEffect(() => {
    if (!mo) return;
    const xuLyEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onDong();
    };
    document.addEventListener("keydown", xuLyEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", xuLyEsc);
      document.body.style.overflow = "";
    };
  }, [mo, onDong]);

  if (!mo) return null;

  return (
    <div className="modal-backdrop" onClick={onDong} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-tieu-de"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal__dau">
          <h2 id="modal-tieu-de" className="modal__tieu-de">
            {tieuDe}
          </h2>
          <button
            type="button"
            className="modal__nut-dong"
            onClick={onDong}
            aria-label="Đóng"
          >
            ✕
          </button>
        </header>
        <div className="modal__than">{children}</div>
        {chan && <footer className="modal__chan">{chan}</footer>}
      </div>
    </div>
  );
}
