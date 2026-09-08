const DOMAIN_PATTERN =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i

export const CNAME_TARGET = "cname.misly.link"

export function normalizeHost(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.$/, "")
}

export function isValidDomain(host: string) {
  return DOMAIN_PATTERN.test(host)
}

export function getDnsRecords(host: string) {
  const hostname = normalizeHost(host)
  const labels = hostname.split(".").filter(Boolean)
  const isApex = labels.length <= 2

  return {
    type: "CNAME" as const,
    name: isApex ? "@" : labels[0] ?? "",
    value: CNAME_TARGET,
    isApex,
  }
}
