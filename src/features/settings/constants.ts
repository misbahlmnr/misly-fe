import type { CustomDomain } from "@/features/settings/types"

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

export const initialCustomDomains: CustomDomain[] = [
  {
    id: "1",
    host: "links.example.com",
    addedLabel: "Added just now",
    status: "pending",
    verifyAttempts: 0,
  },
]

export const dnsSetupGuides = [
  {
    label: "Cloudflare",
    href: "https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/",
  },
  {
    label: "Namecheap",
    href: "https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-can-i-set-up-a-cname-record-for-my-domain/",
  },
  {
    label: "GoDaddy",
    href: "https://www.godaddy.com/help/add-a-cname-record-19236",
  },
] as const
