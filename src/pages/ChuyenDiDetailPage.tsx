import { useParams } from "react-router";

export function ChuyenDiDetailPage() {
  const { id } = useParams<{ id: string }>();
  return <h1>Chi tiết chuyến đi: {id}</h1>;
}
