export function dinhDangNgay(ngay: string): string {
  const [y, m, d] = ngay.split("-");
  if (!y || !m || !d) return ngay;
  return `${d}/${m}/${y}`;
}

export function taoId(): string {
  return crypto.randomUUID();
}

export function soNgayGiua(batDau: string, ketThuc: string): number {
  const t1 = new Date(batDau).getTime();
  const t2 = new Date(ketThuc).getTime();
  return Math.round((t2 - t1) / (1000 * 60 * 60 * 24)) + 1;
}
