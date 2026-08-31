"use client";

import { DataTableProvider } from "@/components/shared/data-table/provider";
import { DataTablePagination } from "@/components/shared/data-table/pagination/pagination";
import { DataTableToolbar } from "@/components/shared/data-table/toolbar/toolbar";
import { DataTableBody } from "@/components/shared/data-table/table-body";
import { DataTableHeader } from "@/components/shared/data-table/table-header";
import { useTablePagination } from "@/components/shared/data-table/hooks/use-table-pagination";
import type { DataTableProps } from "@/components/shared/data-table/types";
import { Table } from "@/components/ui/table";

export function DataTable<T>({
  toolbar,
  pagination,
  ...props
}: DataTableProps<T>) {
  const defaultLimit = pagination?.defaultLimit ?? 10;
  const { page, limit } = useTablePagination(defaultLimit);

  return (
    <DataTableProvider
      {...props}
      pagination={pagination}
      pageIndex={page - 1}
      pageSize={limit}
    >
      {toolbar ? <DataTableToolbar>{toolbar}</DataTableToolbar> : null}
      <div className="overflow-hidden rounded-xl bg-surface-container-lowest ink-border shadow-hard">
        <div className="overflow-x-auto">
          <Table>
            <DataTableHeader />
            <DataTableBody />
          </Table>
        </div>
        {pagination ? <DataTablePagination /> : null}
      </div>
    </DataTableProvider>
  );
}
