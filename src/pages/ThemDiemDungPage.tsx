import { useParams } from "react-router";

export function ThemDiemDungPage() {
  const { chuyenDiId } = useParams<{ chuyenDiId: string }>();
  return <h1>Thêm điểm dừng cho chuyến: {chuyenDiId}</h1>;
}
