"use client";

import { BarChart3, Search, ScanQrCode, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateQrButton } from "@/features/qr-codes/components/create-qr-button";
import { QrCard } from "@/features/qr-codes/components/qr-card";
import { qrCodes, qrSummary } from "@/features/qr-codes/constants";

const statusItems = [
  { label: "All Status", value: "all" },
  { label: "Customized", value: "customized" },
  { label: "Default", value: "default" },
];

const sortItems = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Most Scans", value: "scans-high" },
  { label: "Least Scans", value: "scans-low" },
];

export function QrCodesPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = qrCodes.filter((item) => {
      const matchesQuery =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.shortUrl.toLowerCase().includes(q);
      const matchesStatus =
        status === "all" ||
        (status === "customized" && item.customized) ||
        (status === "default" && !item.customized);

      return matchesQuery && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
      if (sort === "scans-high") return b.scans - a.scans;
      if (sort === "scans-low") return a.scans - b.scans;
      return b.createdAt.localeCompare(a.createdAt);
    });
  }, [query, status, sort]);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
            QR Codes
          </h1>
          <p className="font-body text-lg text-outline">
            Create, customize, and manage QR codes for your shortened links.
          </p>
        </div>
        <CreateQrButton />
      </div>

      <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-container-lowest p-4 ink-border shadow-hard md:flex-row">
        <div className="relative w-full flex-1">
          <Search
            className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-on-surface-variant"
            strokeWidth={2.25}
          />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search QR codes..."
            className="pr-4 pl-10"
          />
        </div>
        <div className="flex w-full gap-4 md:w-auto">
          <Select
            items={statusItems}
            value={status}
            onValueChange={(value) => {
              if (value) setStatus(value);
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
              if (value) setSort(value);
            }}
          >
            <SelectTrigger className="md:w-40" aria-label="Sort QR codes">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SummaryCard
          label="Total QR Codes"
          value={String(qrSummary.total)}
          icon={
            <ScanQrCode
              className="size-6 text-primary"
              strokeWidth={2.25}
              color="currentColor"
            />
          }
          iconWrap="bg-primary-fixed"
        />
        <SummaryCard
          label="Total Scans"
          value={qrSummary.totalScans.toLocaleString()}
          icon={
            <BarChart3
              className="size-6 text-secondary"
              strokeWidth={2.25}
              color="currentColor"
            />
          }
          iconWrap="bg-secondary-container"
        />
        <SummaryCard
          label="Most Scanned"
          value={qrSummary.mostScanned.title}
          valueClass="text-2xl truncate pr-2"
          icon={
            <Trophy
              className="size-6 text-tertiary"
              strokeWidth={2.25}
              color="currentColor"
            />
          }
          iconWrap="bg-tertiary-fixed"
          hint={`${qrSummary.mostScanned.scans.toLocaleString()} scans`}
        />
      </div>

      {items.length === 0 ? (
        <p className="text-center font-label font-bold text-outline">
          No QR codes match your filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <QrCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  valueClass = "text-3xl",
  icon,
  iconWrap,
  hint,
}: {
  label: string;
  value: string;
  valueClass?: string;
  icon: React.ReactNode;
  iconWrap: string;
  hint?: string;
}) {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="mb-1 text-sm font-bold text-on-surface-variant">
            {label}
          </p>
          <h3
            className={`font-headline font-bold text-on-surface ${valueClass}`}
          >
            {value}
          </h3>
          {hint ? (
            <p className="mt-1 text-sm font-bold text-on-surface-variant">
              {hint}
            </p>
          ) : null}
        </div>
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-full ink-border ${iconWrap}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
