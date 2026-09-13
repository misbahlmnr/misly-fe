"use client"

import { useState } from "react"

import { AnalyticsBreakdown } from "@/features/analytics/components/analytics-breakdown"
import { AnalyticsHeader } from "@/features/analytics/components/analytics-header"
import { AnalyticsMetrics } from "@/features/analytics/components/analytics-metrics"
import { ClickChart } from "@/features/analytics/components/click-chart"
import { useGetLinkAnalytics } from "@/features/analytics/hooks/use-get-link-analytics"
import type { AnalyticsLink, TimeRange } from "@/features/analytics/types"

export function AnalyticsDetailPage({ link }: { link: AnalyticsLink }) {
  const [range, setRange] = useState<TimeRange>("30d")
  const { data, isPending, isError, error, isFetching, refetch } =
    useGetLinkAnalytics(link.id, range)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AnalyticsHeader link={link} />
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
        <AnalyticsSkeleton />
      ) : (
        <div
          className={
            isFetching ? "space-y-8 opacity-80 transition-opacity" : "space-y-8"
          }
        >
          <AnalyticsMetrics data={data} />
          <ClickChart
            series={data.series}
            range={range}
            onRangeChange={setRange}
          />
          <AnalyticsBreakdown data={data} />
        </div>
      )}
    </div>
  )
}

function AnalyticsSkeleton() {
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
  )
}
