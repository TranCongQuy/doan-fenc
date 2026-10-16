import type { ReactNode } from "react";

export type LoaiThongBao = "thanh-cong" | "loi" | "canh-bao" | "thong-tin";

type HopThongBaoProps = {
  loai?: LoaiThongBao;
  children: ReactNode;
};

const VAI_TRO: Record<LoaiThongBao, "status" | "alert"> = {
  "thanh-cong": "status",
  loi: "alert",
  "canh-bao": "alert",
  "thong-tin": "status",
};

export function HopThongBao({
  loai = "thong-tin",
  children,
}: HopThongBaoProps) {
  return (
    <div
      className={`hop-thong-bao hop-thong-bao--${loai}`}
      role={VAI_TRO[loai]}
    >
      {children}
    </div>
  );
}
