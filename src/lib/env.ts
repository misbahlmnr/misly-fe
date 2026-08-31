export function getApiUrl() {
  const url = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not set")
  }

  return url
}

function joinUrl(base: string, path: string) {
  return `${base}/${path.replace(/^\//, "")}`
}

export function apiUrl(path: string) {
  return joinUrl(getApiUrl(), path)
}
