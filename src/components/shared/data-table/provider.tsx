"use client";

import type { ReactNode } from "react";

import { DataTableContext } from "@/components/shared/data-table/context";
import { useDataTable } from "@/components/shared/data-table/hooks/use-data-table";
import type { DataTableContextValue, DataTableProps } from "@/components/shared/data-table/types";

type DataTableProviderProps<T> = DataTableProps<T> & {
  pageIndex: number;
  pageSize: number;
  children: ReactNode;
};

export function DataTableProvider<T>({
  columns,
  data,
  rowCount,
  isLoading = false,
  emptyMessage = "No data found.",
  pagination,
  meta,
  getRowId,
  pageIndex,
  pageSize,
  children,
}: DataTableProviderProps<T>) {
  const table = useDataTable({
    data,
    columns,
    rowCount,
    getRowId,
    pagination: { pageIndex, pageSize },
  });

  return (
    <DataTableContext.Provider
      value={{
        table: table as DataTableContextValue<unknown>["table"],
        isLoading,
        emptyMessage,
        rowCount,
        pagination,
        meta,
      }}
    >
      {children}
    </DataTableContext.Provider>
  );
}
