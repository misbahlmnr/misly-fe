import type { QrCodeItem, QrScanAnalytics } from "@/features/qr-codes/types"
import {
  comparisonLabel,
  createMockSeries,
  rangeTotal,
  type TimeRange,
} from "@/lib/time-series"

const locationShares = [
  { name: "Indonesia", share: 42 },
  { name: "United States", share: 28 },
  { name: "Singapore", share: 15 },
  { name: "UK", share: 9 },
] as const

const deviceShares = [
  { name: "iPhone", share: 68, icon: "iphone" },
  { name: "Android", share: 27, icon: "android" },
  { name: "Tablet", share: 5, icon: "tablet" },
] as const

const sourceShares = [
  { name: "Camera App", share: 62, icon: "camera" },
  { name: "Google Lens", share: 21, icon: "lens" },
  { name: "Instagram", share: 9, icon: "instagram" },
  { name: "Other", share: 8, icon: "other" },
] as const

const changeByRange: Record<TimeRange, { scans: number; scanners: number }> = {
  "7d": { scans: 5.8, scanners: 3.6 },
  "30d": { scans: 12.4, scanners: 8.4 },
  all: { scans: 21.1, scanners: 16.5 },
}

/** Mock QR analytics until the API is wired. Replace with a fetch by id + range. */
export function getQrScanAnalytics(
  item: QrCodeItem,
  range: TimeRange = "30d",
): QrScanAnalytics {
  const totalScans = rangeTotal(item.scans, range)
  const series = createMockSeries({
    total: totalScans,
    range,
    seed: item.id,
  })
  const seriesTotal = series.reduce((sum, point) => sum + point.value, 0)
  const peakPoint = series.reduce(
    (current, point) => (point.value >= current.value ? point : current),
    series[0] ?? { date: item.createdAt, value: 0 },
  )
  const topDevice = deviceShares[0]
  const topDeviceShare = Math.max(...deviceShares.map((entry) => entry.share))
  const topSourceShare = Math.max(...sourceShares.map((entry) => entry.share))

  return {
    range,
    comparisonLabel: comparisonLabel(range),
    totalScans: seriesTotal,
    uniqueScanners: Math.round(seriesTotal * 0.76),
    scansChange: changeByRange[range].scans,
    scannersChange: changeByRange[range].scanners,
    topDevice: { name: topDevice.name, share: topDevice.share },
    peakTime: {
      label: formatPeakLabel(peakPoint.date, range),
      scans: peakPoint.value,
    },
    locations: locationShares.map((entry) => ({ ...entry })),
    devices: deviceShares.map((entry) => ({
      ...entry,
      featured: entry.share === topDeviceShare,
    })),
    sources: sourceShares.map((entry) => ({
      ...entry,
      featured: entry.share === topSourceShare,
    })),
    series,
  }
}

function formatPeakLabel(iso: string, range: TimeRange) {
  const date = new Date(`${iso}T00:00:00`)
  if (range === "all") {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
