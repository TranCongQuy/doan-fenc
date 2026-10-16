type DuLieuCot = {
  nhan: string;
  giaTri: number;
};

type BieuDoCotProps = {
  duLieu: DuLieuCot[];
  chieuCao?: number;
};

export function BieuDoCot({ duLieu, chieuCao = 200 }: BieuDoCotProps) {
  const max = Math.max(...duLieu.map((d) => d.giaTri), 1);

  return (
    <div
      className="bieu-do-cot"
      style={{ height: chieuCao }}
      role="img"
      aria-label="Biểu đồ cột"
    >
      {duLieu.map((d) => {
        const phanTram = (d.giaTri / max) * 100;
        return (
          <div key={d.nhan} className="bieu-do-cot__cot">
            <div
              className="bieu-do-cot__thanh"
              style={{ height: `${phanTram}%` }}
              title={`${d.nhan}: ${d.giaTri}`}
            />
            <span className="bieu-do-cot__nhan">{d.nhan}</span>
          </div>
        );
      })}
    </div>
  );
}
