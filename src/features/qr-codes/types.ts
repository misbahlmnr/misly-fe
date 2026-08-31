import type { TimeRange, TimeSeriesPoint } from "@/lib/time-series"

export type QrStyle = "default" | "brand" | "circular"

export type QrCodeItem = {
  id: string
  title: string
  shortUrl: string
  destinationUrl: string
  scans: number
  createdLabel: string
  createdAt: string
  style: QrStyle
  customized: boolean
  featured?: boolean
  logo?: "work" | "m"
  linkSlug?: string
}

export type QrEditorTab = "content" | "appearance" | "branding"

export type QrLinkSource = "existing" | "new"

export type QrScanAnalytics = {
  range: TimeRange
  comparisonLabel: string
  totalScans: number
  uniqueScanners: number
  scansChange: number
  scannersChange: number
  topDevice: { name: string; share: number }
  peakTime: { label: string; scans: number }
  locations: { name: string; share: number }[]
  devices: { name: string; share: number; icon: string; featured?: boolean }[]
  sources: { name: string; share: number; icon: string; featured?: boolean }[]
  series: TimeSeriesPoint[]
}

export type CreateQrValues = {
  title: string
  source: QrLinkSource
  linkId: string
  destinationUrl: string
  style: QrStyle
  logo: "none" | "work" | "m"
  format: "png" | "svg" | "pdf"
}
