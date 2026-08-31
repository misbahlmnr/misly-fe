import type { QrCodeItem, QrScanAnalytics } from "@/features/qr-codes/types"
import {
  comparisonLabel,
  createMockSeries,
  rangeTotal,
  type TimeRange,
} from "@/lib/time-series"

export const qrCodes: QrCodeItem[] = [
  {
    id: "summer-sale",
    title: "Summer Sale",
    shortUrl: "mis.ly/summer24",
    destinationUrl: "https://example.com/campaigns/summer-sale",
    scans: 1240,
    createdLabel: "Created 2d ago",
    createdAt: "2024-10-28",
    style: "default",
    customized: false,
    featured: true,
    linkSlug: "summer-sale",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    shortUrl: "mis.ly/alex-work",
    destinationUrl: "https://misbah.dev/portfolio",
    scans: 892,
    createdLabel: "Created 1w ago",
    createdAt: "2024-10-22",
    style: "brand",
    customized: true,
    logo: "work",
    linkSlug: "portfolio",
  },
  {
    id: "github",
    title: "GitHub",
    shortUrl: "mis.ly/git-alex",
    destinationUrl: "https://github.com/misbahlmnr",
    scans: 450,
    createdLabel: "Created 1mo ago",
    createdAt: "2024-09-15",
    style: "circular",
    customized: true,
    linkSlug: "github",
  },
  {
    id: "website",
    title: "Personal Website",
    shortUrl: "mis.ly/hello",
    destinationUrl: "https://example.com",
    scans: 1260,
    createdLabel: "Created 3mo ago",
    createdAt: "2024-07-21",
    style: "default",
    customized: false,
    linkSlug: "website",
  },
]

export const qrSummary = {
  total: 8,
  totalScans: 3842,
  mostScanned: { title: "Summer Sale", scans: 1240 },
} as const

export const qrLinkOptions = [
  {
    value: "summer-sale",
    shortUrl: "misly.link/summer24",
    title: "Summer Sale Landing Page",
  },
  {
    value: "ig-bio",
    shortUrl: "misly.link/ig-bio",
    title: "Instagram Bio Link",
  },
  {
    value: "promo50",
    shortUrl: "misly.link/promo50",
    title: "50% Off Promo Code",
  },
  {
    value: "portfolio",
    shortUrl: "misly.link/alex-work",
    title: "Portfolio",
  },
  {
    value: "github",
    shortUrl: "misly.link/git-alex",
    title: "GitHub",
  },
  {
    value: "website",
    shortUrl: "misly.link/hello",
    title: "Personal Website",
  },
] as const

export function getQrCode(id: string) {
  return qrCodes.find((item) => item.id === id)
}

export function getQrLinkOption(value: string) {
  return qrLinkOptions.find((item) => item.value === value)
}

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
