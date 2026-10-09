export const CAM_XUC = ["tuyet-voi", "vui", "binh-thuong", "met"] as const;
export type CamXuc = (typeof CAM_XUC)[number];

export const NHAN_CAM_XUC: Record<CamXuc, string> = {
  "tuyet-voi": "🌟 Tuyệt vời",
  vui: "😊 Vui",
  "binh-thuong": "😐 Bình thường",
  met: "😞 Mệt",
};

export interface NhatKy {
  id: string;
  diemDungId: string;
  camXuc: CamXuc;
  noiDung: string;
  hinh: string;
}
