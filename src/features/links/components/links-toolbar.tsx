"use client";

import { Search } from "lucide-react";

import {
  useTableFilter,
  useTableSearch,
  useTableSorting,
} from "@/components/shared/data-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statusItems = [
  { label: "Active", value: "active" },
  { label: "Hidden", value: "hidden" },
];

const sortItems = [
  { label: "Newest First", value: "newest" },
  { label: "Most Clicks", value: "clicks" },
  { label: "Oldest First", value: "oldest" },
];

export function LinksToolbar() {
  const { value: query, onSearch } = useTableSearch();
  const { value: status, setValue: onStatusChange } = useTableFilter(
    "status",
    "active",
  );
  const { value: sort, setValue: onSortChange } = useTableSorting(
    "sort",
    "newest",
  );

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-container-lowest p-4 ink-border shadow-hard md:flex-row">
      <div className="relative w-full flex-1">
        <Search
          className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-on-surface-variant"
          strokeWidth={2.25}
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search links..."
          className="pr-4 pl-10"
        />
      </div>
      <div className="flex w-full gap-4 md:w-auto">
        <Select
          items={statusItems}
          value={status}
          onValueChange={(value) => {
            if (value) onStatusChange(value);
          }}
        >
          <SelectTrigger className="md:w-40" aria-label="Filter by status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          items={sortItems}
          value={sort}
          onValueChange={(value) => {
            if (value) onSortChange(value);
          }}
        >
          <SelectTrigger className="md:w-40" aria-label="Sort links">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {sortItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
