export const planUsage = {
  free: {
    links: { used: 8, limit: 10 },
    qr: { used: 3, limit: 5 },
  },
  pro: {
    links: { used: 24, limit: 1000 },
    qr: { used: 8, limit: 100 },
  },
} as const

export const customDomain = {
  host: "links.example.com",
  addedLabel: "Added just now",
  status: "Pending",
  dns: {
    type: "CNAME",
    name: "links",
    value: "cname.misly.link",
  },
} as const
