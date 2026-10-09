import { z } from "zod";
import { CAM_XUC } from "./types";

export const nhatKySchema = z.object({
  id: z.string().min(1),
  diemDungId: z.string().min(1),
  camXuc: z.enum(CAM_XUC, { error: "Chọn cảm xúc" }),
  noiDung: z
    .string()
    .trim()
    .min(10, "Cảm nhận cần ít nhất 10 ký tự")
    .max(500, "Cảm nhận tối đa 500 ký tự"),
  hinh: z.string().default(""),
});

export const dsNhatKySchema = z.array(nhatKySchema);

export const nhatKyFormSchema = nhatKySchema.omit({ id: true });

export type NhatKyForm = z.infer<typeof nhatKyFormSchema>;
export type LoiNhatKy = Partial<Record<keyof NhatKyForm, string[]>>;
