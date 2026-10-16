import type { ReactNode } from "react";

type TrangThaiRongProps = {
  tieuDe: string;
  moTa?: string;
  hanhDong?: ReactNode;
};

export function TrangThaiRong({ tieuDe, moTa, hanhDong }: TrangThaiRongProps) {
  return (
    <div className="trang-thai-rong">
      <p className="trang-thai-rong__tieu-de">{tieuDe}</p>
      {moTa && <p className="trang-thai-rong__mo-ta">{moTa}</p>}
      {hanhDong && <div className="trang-thai-rong__hanh-dong">{hanhDong}</div>}
    </div>
  );
}
