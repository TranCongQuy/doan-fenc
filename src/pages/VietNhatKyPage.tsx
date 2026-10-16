import { useParams } from "react-router";

export function VietNhatKyPage() {
  const { diemDungId } = useParams<{ diemDungId: string }>();
  return <h1>Viết nhật ký cho điểm dừng: {diemDungId}</h1>;
}
