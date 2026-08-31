"use client";

import {
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

import type { TablePaginationState } from "@/components/shared/data-table/types";

type UseDataTableOptions<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  rowCount: number;
  pagination: TablePaginationState;
  getRowId?: (row: T) => string;
};

export function useDataTable<T>({
  data,
  columns,
  rowCount,
  pagination,
  getRowId,
}: UseDataTableOptions<T>) {
  return useReactTable({
    data,
    columns,
    rowCount,
    getRowId,
    state: { pagination },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });
}
