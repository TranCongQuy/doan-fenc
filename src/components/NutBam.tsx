import type { ComponentProps, ReactNode } from "react";

type NutBamProps = ComponentProps<"button"> & {
  bienThe?: "chinh" | "phu" | "nguy-hiem";
  kichThuoc?: "thuong" | "nho";
  children: ReactNode;
};

export function NutBam({
  bienThe = "chinh",
  kichThuoc = "thuong",
  className = "",
  children,
  ...rest
}: NutBamProps) {
  const cls = [
    "nut",
    `nut--${bienThe}`,
    kichThuoc === "nho" ? "nut--nho" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
