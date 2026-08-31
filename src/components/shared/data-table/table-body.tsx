"use client";

import { flexRender } from "@tanstack/react-table";

import { useDataTableContext } from "@/components/shared/data-table/context";
import { SkeletonTable } from "@/components/shared/data-table/skeleton/skeleton-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

export function DataTableBody<T>() {
  const { table, isLoading, emptyMessage } = useDataTableContext<T>();
  const columns = table.getAllColumns().length;

  if (isLoading) {
    return <SkeletonTable columns={columns} rows={5} />;
  }

  const rows = table.getRowModel().rows;

  if (rows.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell
            colSpan={columns}
            className="p-8 text-center font-label text-outline"
          >
            {emptyMessage}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
