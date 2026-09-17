"use client";

import { BarChart3, Search, ScanQrCode, Trophy } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { CreateQrButton } from "@/features/qr-codes/components/create-qr-button";
import { QrCard } from "@/features/qr-codes/components/qr-card";
import { QrCodesPageSkeleton } from "@/features/qr-codes/components/skeleton/qr-codes-page-skeleton";
import { useGetQrCodes } from "@/features/qr-codes/hooks/use-get-qr-codes";
import type { QrCodeItem } from "@/features/qr-codes/types";
import SelectFilter from "../components/select-filter";
import SummaryCard from "../components/qr-summary-card";
import { filterQrCodes, sortQrCodes } from "../common/utils";
import { useQrSummary } from "../hooks/use-qr-summary";

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
  const { data = [], isLoading } = useGetQrCodes();

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sort, setSort] = useState("newest");

  const filteredItems = useMemo(
    () => filterQrCodes(data, query, status),
    [data, query, status],
  );

  const shortItems = useMemo(
    () => sortQrCodes(filteredItems, sort),
    [filteredItems, sort],
  );

  const summary = useQrSummary(shortItems);

  if (isLoading) {
    return <QrCodesPageSkeleton />;
  }

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
          <SelectFilter
            items={statusItems}
            value={status}
            onChange={(value: string | null) => {
              if (value) setStatus(value);
            }}
            ariaLabel="Filter by status"
          />

          <SelectFilter
            items={sortItems}
            value={sort}
            onChange={(value: string | null) => {
              if (value) setSort(value);
            }}
            ariaLabel="Sort QR codes"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <SummaryCard
          label="Total QR Codes"
          value={String(summary.total)}
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
          value={summary.totalScans.toLocaleString()}
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
          value={summary.mostScannedTitle}
          valueClass="text-2xl truncate pr-2"
          icon={
            <Trophy
              className="size-6 text-tertiary"
              strokeWidth={2.25}
              color="currentColor"
            />
          }
          iconWrap="bg-tertiary-fixed"
          hint={summary.mostScannedHint}
        />
      </div>

      {shortItems.length === 0 ? (
        <p className="text-center font-label font-bold text-outline">
          {data.length === 0
            ? "No QR codes yet."
            : "No QR codes match your filters."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
          {shortItems.map((item: QrCodeItem) => (
            <QrCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
