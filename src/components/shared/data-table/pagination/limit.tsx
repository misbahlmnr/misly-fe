"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TableLimitProps = {
  value: number;
  options?: number[];
  onChange: (value: number) => void;
};

export function TableLimit({
  value,
  options = [10, 25, 50],
  onChange,
}: TableLimitProps) {
  const items = options.map((option) => ({
    label: `${option} / page`,
    value: String(option),
  }));

  return (
    <Select
      items={items}
      value={String(value)}
      onValueChange={(nextValue) => {
        if (nextValue) onChange(Number(nextValue));
      }}
    >
      <SelectTrigger className="w-32" aria-label="Rows per page">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
