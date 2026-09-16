import { useMemo } from "react";
import { QrCodeItem } from "../schema";

export const useQrSummary = (items: QrCodeItem[]) => {
  const totalQrCodes = items.length;
  const totalScans = items.reduce((acc, curr) => acc + curr.scans, 0);
  const mostScanned = items.reduce<QrCodeItem | null>((acc, curr) => {
    if (!acc || curr.scans > acc.scans) return curr;
    return acc;
  }, null);

  const hasScans = Boolean(mostScanned && mostScanned.scans > 0);

  return useMemo(
    () => ({
      total: totalQrCodes,
      totalScans,
      mostScannedTitle: hasScans && mostScanned ? mostScanned.title : "—",
      mostScannedHint:
        hasScans && mostScanned
          ? `${mostScanned.scans.toLocaleString()} scans`
          : undefined,
    }),
    [totalQrCodes, totalScans, mostScanned, hasScans],
  );
};
