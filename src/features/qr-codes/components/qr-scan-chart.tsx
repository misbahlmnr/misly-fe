"use client"

import { TimeSeriesChart } from "@/components/shared/time-series-chart"
import { timeRangeOptions, type TimeRange, type TimeSeriesPoint } from "@/lib/time-series"
import { cn } from "@/lib/utils"

export function QrScanChart({
  series,
  range,
  onRangeChange,
}: {
  series: TimeSeriesPoint[]
  range: TimeRange
  onRangeChange: (range: TimeRange) => void
}) {
  return (
    <div className="w-full rounded-xl bg-surface-container-lowest p-6 ink-border shadow-hard md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="font-headline text-headline-sm font-bold text-on-surface">
            Scan Activity
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Track how your QR code performs over time.
          </p>
        </div>
        <div className="flex items-center self-stretch overflow-x-auto rounded-lg bg-surface-container-low p-1 ink-border shadow-hard-pressed md:self-auto">
          {timeRangeOptions.map((item) => {
            const active = range === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onRangeChange(item.id)}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-bold whitespace-nowrap transition-colors",
                  active
                    ? "bg-primary text-on-primary ink-border shadow-hard-pressed"
                    : "text-on-surface-variant hover:bg-surface-container-highest",
                )}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <TimeSeriesChart
        points={series}
        range={range}
        valueLabel="Scans"
      />
    </div>
  )
}
