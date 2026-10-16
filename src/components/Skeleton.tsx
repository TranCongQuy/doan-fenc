type SkeletonProps = {
  rong?: string;
  cao?: string;
  banKinh?: string;
};

export function Skeleton({
  rong = "100%",
  cao = "1rem",
  banKinh = "var(--ban-kinh)",
}: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ width: rong, height: cao, borderRadius: banKinh }}
      aria-hidden="true"
    />
  );
}

export function SkeletonThe() {
  return (
    <div className="the">
      <div
        className="the__than"
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        <Skeleton cao="1.5rem" rong="60%" />
        <Skeleton cao="1rem" />
        <Skeleton cao="1rem" rong="80%" />
        <Skeleton cao="2rem" rong="40%" />
      </div>
    </div>
  );
}
