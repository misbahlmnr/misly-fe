"use client";

import { cn } from "@/lib/utils";

const pageBtn =
  "rounded-md font-label text-sm font-bold ink-border btn-hard-shadow-sm";

function getPageItems(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) items.push("ellipsis");
  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }
  if (end < totalPages - 1) items.push("ellipsis");
  items.push(totalPages);

  return items;
}

type OffsetPaginationProps = {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export function OffsetPagination({
  currentPage,
  pageCount,
  onPageChange,
}: OffsetPaginationProps) {
  const totalPages = Math.max(1, pageCount);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={cn(
          pageBtn,
          "px-4 py-2 hover:bg-tertiary-fixed disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        Prev
      </button>
      {getPageItems(currentPage, totalPages).map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 font-bold text-on-surface-variant"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={cn(
              pageBtn,
              "flex size-10 items-center justify-center",
              currentPage === item
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest hover:bg-tertiary-fixed",
            )}
          >
            {item}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={cn(
          pageBtn,
          "px-4 py-2 hover:bg-tertiary-fixed disabled:pointer-events-none disabled:opacity-40",
        )}
      >
        Next
      </button>
    </div>
  );
}
