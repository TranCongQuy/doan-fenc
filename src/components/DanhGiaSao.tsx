type DanhGiaSaoProps = {
  giaTri: number;
  onDoi?: (soSao: number) => void;
  doc?: boolean;
};

export function DanhGiaSao({ giaTri, onDoi, doc = false }: DanhGiaSaoProps) {
  const nhan = ["1 sao", "2 sao", "3 sao", "4 sao", "5 sao"];

  return (
    <div
      className="danh-gia-sao"
      role={doc ? "img" : "group"}
      aria-label={`Đánh giá ${giaTri}/5`}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const chon = n <= giaTri;
        const cls = `danh-gia-sao__nut${chon ? " danh-gia-sao__nut--chon" : ""}`;
        if (doc) {
          return (
            <span key={n} className={cls} aria-hidden="true">
              {chon ? "★" : "☆"}
            </span>
          );
        }
        return (
          <button
            key={n}
            type="button"
            className={cls}
            onClick={() => onDoi?.(n)}
            aria-label={nhan[n - 1]}
          >
            {chon ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
}
