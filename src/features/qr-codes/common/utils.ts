import { QrCodeItem } from "../schema";

export const filterQrCodes = (
  items: QrCodeItem[],
  query: string,
  status: string,
) => {
  const q = query.trim().toLowerCase();

  const filtered = items.filter((item: QrCodeItem) => {
    const matchesQuery =
      q.length === 0 ||
      item.title.toLowerCase().includes(q) ||
      item.shortUrl.toLowerCase().includes(q) ||
      item.destinationUrl.toLowerCase().includes(q);

    const matchesStatus =
      status === "all" ||
      (status === "customized" && item.customized) ||
      (status === "default" && !item.customized);

    return matchesQuery && matchesStatus;
  });

  return filtered;
};

export const sortQrCodes = (items: QrCodeItem[], sort: string) => {
  return [...items].sort((a, b) => {
    if (sort === "oldest") return a.createdAt.localeCompare(b.createdAt);
    if (sort === "scans-high") return b.scans - a.scans;
    if (sort === "scans-low") return a.scans - b.scans;

    return b.createdAt.localeCompare(a.createdAt);
  });
};
