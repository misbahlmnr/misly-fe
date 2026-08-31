"use client";

import { useDataTableContext } from "@/components/shared/data-table/context";
import { useTablePagination } from "@/components/shared/data-table/hooks/use-table-pagination";
import { OffsetPagination } from "@/components/shared/data-table/pagination/offset-pagination";
import { TableLimit } from "@/components/shared/data-table/pagination/limit";

export function DataTablePagination() {
  const { pagination, meta, rowCount } = useDataTableContext();
  const defaultLimit = pagination?.defaultLimit ?? 10;
  const { page, limit, setPage, setLimit } = useTablePagination(defaultLimit);

  if (!pagination) return null;

  const pageCount = Math.max(1, pagination.pageCount);
  const total = meta?.totalData ?? rowCount;
  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-on-surface bg-surface-container-lowest p-4 md:flex-row md:p-6">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <span className="font-label text-sm font-bold text-outline">
          Showing {startItem}–{endItem} of {total}
        </span>
        <TableLimit
          value={limit}
          options={pagination.limitOptions}
          onChange={setLimit}
        />
      </div>
      <OffsetPagination
        currentPage={page}
        pageCount={pageCount}
        onPageChange={setPage}
      />
    </div>
  );
}
