import { z } from "zod"

import {
  getDnsRecords,
  isValidDomain,
  normalizeHost,
} from "@/features/settings/lib/dns"

export function createCustomDomainSchema(
  existingHosts: string[],
  currentHost?: string
) {
  const taken = new Set(
    existingHosts
      .filter((host) => host !== currentHost)
      .map((host) => normalizeHost(host))
  )

  return z.object({
    host: z
      .string()
      .trim()
      .min(1, "Domain is required")
      .transform(normalizeHost)
      .refine(isValidDomain, "Enter a valid domain, like links.example.com")
      .refine(
        (host) => !getDnsRecords(host).isApex,
        "Use a subdomain like links.example.com"
      )
      .refine(
        (host) => !taken.has(host),
        "This domain is already connected"
      ),
  })
}

export type CustomDomainValues = {
  host: string
}
