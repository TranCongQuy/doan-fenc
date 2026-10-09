import { z } from "zod";

export const diemDungSchema = z.object({
  id: z.string().min(1),
  chuyenDiId: z.string().min(1),
  ten: z.string().trim().min(1, "Tên điểm dừng không được trống"),
  diaChi: z.string().default(""),
  ngay: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày theo định dạng YYYY-MM-DD"),
  thoiGian: z.string().regex(/^\d{2}:\d{2}$/, "Thời gian theo định dạng HH:mm"),
  ghiChu: z.string().max(200, "Ghi chú tối đa 200 ký tự").default(""),
});

export const dsDiemDungSchema = z.array(diemDungSchema);

export const diemDungFormSchema = diemDungSchema.omit({ id: true });

export type DiemDungForm = z.infer<typeof diemDungFormSchema>;
export type LoiDiemDung = Partial<Record<keyof DiemDungForm, string[]>>;
