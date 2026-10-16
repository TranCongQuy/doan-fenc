import { useParams } from "react-router";

export function DiemDungDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <h1>Chi tiết điểm dừng: {id}</h1>;
}
