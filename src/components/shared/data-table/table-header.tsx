"use client";

import { flexRender } from "@tanstack/react-table";

import { useDataTableContext } from "@/components/shared/data-table/context";
import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTableHeader<T>() {
  const { table } = useDataTableContext<T>();

  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
