export const overviewUser = {
  name: "Misbah",
} as const;

export const overviewStatItems = [
  {
    id: "links",
    key: "totalLinks",
    label: "Total Links",
    icon: "link",
    iconWrap: "bg-surface-container-low text-primary",
  },
  {
    id: "clicks",
    key: "totalClicks",
    label: "Total Clicks",
    icon: "chart",
    iconWrap: "bg-secondary-container text-secondary",
  },
  {
    id: "qr",
    key: "totalQrCodes",
    label: "QR Codes",
    icon: "qr",
    iconWrap: "bg-tertiary-fixed text-tertiary",
  },
] as const;
