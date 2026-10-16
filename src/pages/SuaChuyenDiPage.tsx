import { useParams } from "react-router";

export function SuaChuyenDiPage() {
  const { id } = useParams<{ id: string }>();
  return <h1>Sửa chuyến đi: {id}</h1>;
}
