import { dsChuyenDiSchema } from "../features/chuyen-di/schema";
import { dsDiemDungSchema } from "../features/diem-dung/schema";
import { dsNhatKySchema } from "../features/nhat-ky/schema";
import type { ChuyenDi } from "../features/chuyen-di/types";
import type { DiemDung } from "../features/diem-dung/types";
import type { NhatKy } from "../features/nhat-ky/types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

function bocData(goi: unknown): unknown {
  if (typeof goi === "object" && goi !== null && "data" in goi) {
    return (goi as { data: unknown }).data;
  }
  return goi;
}

async function goiApi<T>(
  duongDan: string,
  kiemChung: (raw: unknown) => T,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${duongDan}`);
  if (!res.ok) throw new Error(`Máy chủ trả về mã ${res.status}`);
  const goi: unknown = await res.json();
  return kiemChung(bocData(goi));
}

export async function layDsChuyenDi(): Promise<ChuyenDi[]> {
  return goiApi("/api/chuyen-di", (raw) => {
    const kq = dsChuyenDiSchema.safeParse(raw);
    if (!kq.success) {
      throw new Error(
        "Dữ liệu chuyến đi không hợp lệ: " +
          kq.error.issues
            .map((i) => `[${i.path.join(".")}] ${i.message}`)
            .join("; "),
      );
    }
    return kq.data;
  });
}

export async function layDsDiemDung(chuyenDiId?: string): Promise<DiemDung[]> {
  const qs = chuyenDiId ? `?chuyenDiId=${chuyenDiId}` : "";
  return goiApi(`/api/diem-dung${qs}`, (raw) => {
    const kq = dsDiemDungSchema.safeParse(raw);
    if (!kq.success) {
      throw new Error(
        "Dữ liệu điểm dừng không hợp lệ: " +
          kq.error.issues
            .map((i) => `[${i.path.join(".")}] ${i.message}`)
            .join("; "),
      );
    }
    return kq.data;
  });
}

export async function layDsNhatKy(diemDungId?: string): Promise<NhatKy[]> {
  const qs = diemDungId ? `?diemDungId=${diemDungId}` : "";
  return goiApi(`/api/nhat-ky${qs}`, (raw) => {
    const kq = dsNhatKySchema.safeParse(raw);
    if (!kq.success) {
      throw new Error(
        "Dữ liệu nhật ký không hợp lệ: " +
          kq.error.issues
            .map((i) => `[${i.path.join(".")}] ${i.message}`)
            .join("; "),
      );
    }
    return kq.data;
  });
}
