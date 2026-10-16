import type { Toast as ToastType } from "../features/toast/store";

type ToastProps = {
  toast: ToastType;
  onDong: (id: string) => void;
};

const ICON: Record<ToastType["loai"], string> = {
  "thanh-cong": "✓",
  loi: "✕",
  "canh-bao": "⚠",
  "thong-tin": "ℹ",
};

export function Toast({ toast, onDong }: ToastProps) {
  return (
    <div
      className={`toast toast--${toast.loai}`}
      role={toast.loai === "loi" ? "alert" : "status"}
    >
      <span aria-hidden="true">{ICON[toast.loai]}</span>
      <span className="toast__noi-dung">{toast.noiDung}</span>
      <button
        type="button"
        className="toast__dong"
        onClick={() => onDong(toast.id)}
        aria-label="Đóng thông báo"
      >
        ✕
      </button>
    </div>
  );
}
