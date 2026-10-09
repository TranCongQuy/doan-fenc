import { useEffect, useState } from "react";
import { layDsChuyenDi } from "../../../lib/api";
import type { ChuyenDi, TrangThaiTai } from "../types";

export function useChuyenDiList() {
  const [ketQua, setKetQua] = useState<TrangThaiTai<ChuyenDi[]>>({
    trangThai: "dang-tai",
  });
  const [lan, setLan] = useState(0);

  useEffect(() => {
    let daHuy = false;

    setKetQua({ trangThai: "dang-tai" });

    layDsChuyenDi()
      .then((duLieu) => {
        if (!daHuy) setKetQua({ trangThai: "thanh-cong", duLieu });
      })
      .catch((e: unknown) => {
        if (daHuy) return;
        const thongBao = e instanceof Error ? e.message : "Lỗi không xác định";
        setKetQua({ trangThai: "loi", loi: thongBao });
      });

    return () => {
      daHuy = true;
    };
  }, [lan]);

  return {
    ketQua,
    taiLai: () => setLan((x) => x + 1),
  };
}
