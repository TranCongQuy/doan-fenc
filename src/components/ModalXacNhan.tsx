import { Modal } from "./Modal";
import { NutBam } from "./NutBam";

type ModalXacNhanProps = {
  mo: boolean;
  tieuDe: string;
  noiDung: string;
  nhanXacNhan?: string;
  nguyHiem?: boolean;
  onXacNhan: () => void;
  onHuy: () => void;
};

export function ModalXacNhan({
  mo,
  tieuDe,
  noiDung,
  nhanXacNhan = "Xác nhận",
  nguyHiem = false,
  onXacNhan,
  onHuy,
}: ModalXacNhanProps) {
  return (
    <Modal
      mo={mo}
      tieuDe={tieuDe}
      onDong={onHuy}
      chan={
        <>
          <NutBam bienThe="phu" onClick={onHuy}>
            Hủy
          </NutBam>
          <NutBam
            bienThe={nguyHiem ? "nguy-hiem" : "chinh"}
            onClick={onXacNhan}
          >
            {nhanXacNhan}
          </NutBam>
        </>
      }
    >
      <p>{noiDung}</p>
    </Modal>
  );
}
