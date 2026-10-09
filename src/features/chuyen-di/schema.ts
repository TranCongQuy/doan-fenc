import { z } from "zod";
import { TRANG_THAI_CHUYEN_DI } from "./types";

export const chuyenDiSchema = z
  .object({
    id: z.string().min(1),
    ten: z
      .string()
      .trim()
      .min(3, "Tên cần ít nhất 3 ký tự")
      .max(80, "Tên tối đa 80 ký tự"),
    moTa: z.string().max(300, "Mô tả tối đa 300 ký tự"),
    ngayBatDau: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày theo định dạng YYYY-MM-DD"),
    ngayKetThuc: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày theo định dạng YYYY-MM-DD"),
    trangThai: z.enum(TRANG_THAI_CHUYEN_DI, {
      error: "Trạng thái không hợp lệ",
    }),
  })
  .refine((d) => d.ngayKetThuc >= d.ngayBatDau, {
    message: "Ngày kết thúc phải sau hoặc bằng ngày bắt đầu",
    path: ["ngayKetThuc"],
  });

export const dsChuyenDiSchema = z.array(chuyenDiSchema);

export const chuyenDiFormSchema = chuyenDiSchema.omit({ id: true });

export type ChuyenDiForm = z.infer<typeof chuyenDiFormSchema>;
export type LoiChuyenDi = Partial<Record<keyof ChuyenDiForm, string[]>>;
