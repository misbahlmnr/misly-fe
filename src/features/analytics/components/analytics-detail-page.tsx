"use client"

import { useState } from "react"

import { AnalyticsBreakdown } from "@/features/analytics/components/analytics-breakdown"
import { AnalyticsHeader } from "@/features/analytics/components/analytics-header"
import { AnalyticsMetrics } from "@/features/analytics/components/analytics-metrics"
import { ClickChart } from "@/features/analytics/components/click-chart"
import { getLinkAnalytics } from "@/features/analytics/constants"
import type { AnalyticsLink, TimeRange } from "@/features/analytics/types"

export function AnalyticsDetailPage({ link }: { link: AnalyticsLink }) {
  const [range, setRange] = useState<TimeRange>("30d")
  const data = getLinkAnalytics(link, range)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <AnalyticsHeader link={link} />
      <AnalyticsMetrics data={data} />
      <ClickChart
        series={data.series}
        range={range}
        onRangeChange={setRange}
      />
      <AnalyticsBreakdown data={data} />
    </div>
  )
}
