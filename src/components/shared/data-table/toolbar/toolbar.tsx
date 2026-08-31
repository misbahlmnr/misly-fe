import type { ReactNode } from "react";

type DataTableToolbarProps = {
  children: ReactNode;
};

export function DataTableToolbar({ children }: DataTableToolbarProps) {
  return <div className="mb-4">{children}</div>;
}
