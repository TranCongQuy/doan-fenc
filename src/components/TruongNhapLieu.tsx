import type { ReactNode } from "react";

type TruongNhapLieuProps = {
  id: string;
  nhan: string;
  batBuoc?: boolean;
  loi?: string;
  children: ReactNode;
};

export function TruongNhapLieu({
  id,
  nhan,
  batBuoc = false,
  loi,
  children,
}: TruongNhapLieuProps) {
  return (
    <div className="truong">
      <label htmlFor={id} className="truong__nhan">
        {nhan}
        {batBuoc && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {loi && (
        <p className="truong__loi" role="alert">
          {loi}
        </p>
      )}
    </div>
  );
}
