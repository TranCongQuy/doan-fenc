import { useParams } from "react-router";

export function NhatKyPage() {
  const { diemDungId } = useParams<{ diemDungId: string }>();
  return <h1>Nhật ký điểm dừng: {diemDungId}</h1>;
}
