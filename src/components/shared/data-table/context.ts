"use client";

import { createContext, useContext } from "react";

import type { DataTableContextValue } from "@/components/shared/data-table/types";

export const DataTableContext = createContext<DataTableContextValue<unknown> | null>(
  null,
);

export function useDataTableContext<T>() {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error("useDataTableContext must be used within DataTable");
  }

  return context as DataTableContextValue<T>;
}
