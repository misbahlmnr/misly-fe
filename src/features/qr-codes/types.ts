import type { TimeRange, TimeSeriesPoint } from "@/lib/time-series";

export type {
  CreateQrPayload,
  CreateQrValues,
  QrCodeItem,
  QrCornerDotType,
  QrCornerSquareType,
  QrDotType,
  QrStylePreset as QrStyle,
  QrStyles,
} from "./schema";

export type QrEditorTab = "content" | "appearance" | "branding";

export type QrLinkSource = "existing" | "new";

export type QrScanAnalytics = {
  range: TimeRange;
  comparisonLabel: string;
  totalScans: number;
  uniqueScanners: number;
  scansChange: number;
  scannersChange: number;
  topDevice: { name: string; share: number };
  peakTime: { label: string; scans: number };
  locations: { name: string; share: number }[];
  devices: { name: string; share: number; icon: string; featured?: boolean }[];
  sources: { name: string; share: number; icon: string; featured?: boolean }[];
  series: TimeSeriesPoint[];
};
