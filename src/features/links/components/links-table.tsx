"use client";

import { DataTable } from "@/components/shared/data-table";
import { linksColumns } from "@/features/links/components/links-columns";
import type { ManagedLink } from "@/features/links/types";
import type { PaginationMeta } from "@/lib/schemas/pagination";

type LinksTableProps = {
  data: ManagedLink[];
  meta: PaginationMeta;
  isLoading?: boolean;
};

export function LinksTable({ data, meta, isLoading }: LinksTableProps) {
  return (
    <DataTable
      columns={linksColumns}
      data={data}
      rowCount={meta.totalData}
      meta={meta}
      isLoading={isLoading}
      emptyMessage="No links match your filters."
      getRowId={(row) => row.id}
      pagination={{
        pageCount: meta.totalPages,
        defaultLimit: meta.limit,
        limitOptions: [10, 25, 50],
      }}
    />
  );
}
