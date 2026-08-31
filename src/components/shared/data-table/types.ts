import type { ColumnDef, Table as TanStackTable } from "@tanstack/react-table";
import type { ReactNode } from "react";

import type { PaginationMeta } from "@/lib/schemas/pagination";

export type DataTablePaginationConfig = {
  pageCount: number;
  defaultLimit?: number;
  limitOptions?: number[];
};

export type DataTableProps<T> = {
  columns: ColumnDef<T, unknown>[];
  data: T[];
  rowCount: number;
  isLoading?: boolean;
  emptyMessage?: string;
  pagination?: DataTablePaginationConfig;
  toolbar?: ReactNode;
  getRowId?: (row: T) => string;
  meta?: PaginationMeta;
};

export type TablePaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type DataTableContextValue<T> = {
  table: TanStackTable<T>;
  isLoading: boolean;
  emptyMessage: string;
  rowCount: number;
  pagination?: DataTablePaginationConfig;
  meta?: PaginationMeta;
};
