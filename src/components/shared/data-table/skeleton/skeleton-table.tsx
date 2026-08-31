import { TableBody, TableCell, TableRow } from "@/components/ui/table";

type SkeletonTableProps = {
  columns: number;
  rows?: number;
};

export function SkeletonTable({ columns, rows = 5 }: SkeletonTableProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={`skeleton-row-${rowIndex}`}>
          {Array.from({ length: columns }).map((__, colIndex) => (
            <TableCell key={`skeleton-cell-${rowIndex}-${colIndex}`}>
              <div className="h-4 animate-pulse rounded-md bg-surface-container" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
