import { useParams } from "react-router";

export function SuaDiemDungPage() {
  const { id } = useParams<{ id: string }>();
  return <h1>Sửa điểm dừng: {id}</h1>;
}
