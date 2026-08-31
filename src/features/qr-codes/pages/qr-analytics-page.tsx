"use client"

import { useState } from "react"

import { QrAnalyticsBreakdown } from "@/features/qr-codes/components/qr-analytics-breakdown"
import { QrAnalyticsHeader } from "@/features/qr-codes/components/qr-analytics-header"
import { QrAnalyticsMetrics } from "@/features/qr-codes/components/qr-analytics-metrics"
import { QrScanChart } from "@/features/qr-codes/components/qr-scan-chart"
import { getQrScanAnalytics } from "@/features/qr-codes/constants"
import type { QrCodeItem } from "@/features/qr-codes/types"
import type { TimeRange } from "@/lib/time-series"

export function QrAnalyticsPage({ item }: { item: QrCodeItem }) {
  const [range, setRange] = useState<TimeRange>("30d")
  const data = getQrScanAnalytics(item, range)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <QrAnalyticsHeader item={item} />
      <QrAnalyticsMetrics data={data} />
      <QrScanChart
        series={data.series}
        range={range}
        onRangeChange={setRange}
      />
      <QrAnalyticsBreakdown data={data} />
    </div>
  )
}
