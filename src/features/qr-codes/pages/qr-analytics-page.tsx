"use client";

import { useState } from "react";

import { QrAnalyticsBreakdown } from "@/features/qr-codes/components/qr-analytics-breakdown";
import { QrAnalyticsHeader } from "@/features/qr-codes/components/qr-analytics-header";
import { QrAnalyticsMetrics } from "@/features/qr-codes/components/qr-analytics-metrics";
import { QrScanChart } from "@/features/qr-codes/components/qr-scan-chart";
import { useGetQrAnalytics } from "@/features/qr-codes/hooks/use-get-qr-analytics";
import type { QrCodeItem } from "@/features/qr-codes/types";
import type { TimeRange } from "@/lib/time-series";

export function QrAnalyticsPage({ item }: { item: QrCodeItem }) {
  const [range, setRange] = useState<TimeRange>("30d");
  const { data, isPending, isError, error, isFetching, refetch } =
    useGetQrAnalytics(item.id, range);

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <QrAnalyticsHeader item={item} />
      {isError ? (
        <div className="space-y-3 rounded-lg bg-surface-container-lowest p-6 ink-border shadow-hard">
          <p className="font-body text-outline">
            {error instanceof Error
              ? error.message
              : "Failed to load analytics. Please try again."}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="font-label text-sm font-bold text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      ) : isPending || !data ? (
        <QrAnalyticsSkeleton />
      ) : (
        <div
          className={
            isFetching ? "space-y-8 opacity-80 transition-opacity" : "space-y-8"
          }
        >
          <QrAnalyticsMetrics data={data} />
          <QrScanChart
            series={data.series}
            range={range}
            onRangeChange={setRange}
          />
          <QrAnalyticsBreakdown data={data} />
        </div>
      )}
    </div>
  );
}

function QrAnalyticsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl bg-surface-container ink-border"
          />
        ))}
      </div>
      <div className="h-[420px] animate-pulse rounded-xl bg-surface-container ink-border" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-xl bg-surface-container ink-border"
          />
        ))}
      </div>
    </div>
  );
}
