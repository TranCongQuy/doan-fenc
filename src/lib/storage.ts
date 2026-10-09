export function docLocalStorage<T>(khoa: string, macDinh: T): T {
  try {
    const raw = localStorage.getItem(khoa);
    if (!raw) return macDinh;
    return JSON.parse(raw) as T;
  } catch {
    return macDinh;
  }
}

export function ghiLocalStorage<T>(khoa: string, giaTri: T): void {
  try {
    localStorage.setItem(khoa, JSON.stringify(giaTri));
  } catch {
    // localStorage đầy hoặc bị chặn — bỏ qua im lặng
  }
}
