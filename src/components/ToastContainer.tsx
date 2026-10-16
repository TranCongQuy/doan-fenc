import { useToastStore } from "../features/toast/store";
import { Toast } from "./Toast";

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const xoa = useToastStore((s) => s.xoa);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onDong={xoa} />
      ))}
    </div>
  );
}
