import type { ManagedLink, RecentLink } from "@/features/links/types";

export const domains = [
  process.env.NEXT_PUBLIC_APP_URL as string,
  "mybrand.co",
] as const;

export const defaultDomain = domains[0];

export const PAGE_SIZE = 4;

const featuredLinks: ManagedLink[] = [
  {
    id: "summer-sale",
    title: "Summer Sale",
    slug: "summer-sale",
    destinationUrl: "https://example.com/campaigns/summer-sale",
    clicks: 1240,
    createdAt: "2024-10-24",
    createdLabel: "Oct 24, 2024",
    createdShort: "Oct 24",
    status: "active",
  },
  {
    id: "portfolio",
    title: "Portfolio",
    slug: "portfolio",
    destinationUrl: "https://misbah.dev/portfolio",
    clicks: 856,
    createdAt: "2024-10-18",
    createdLabel: "Oct 18, 2024",
    createdShort: "Oct 18",
    status: "active",
  },
  {
    id: "github",
    title: "GitHub",
    slug: "github",
    destinationUrl: "https://github.com/misbahlmnr",
    clicks: 342,
    createdAt: "2024-09-05",
    createdLabel: "Sep 05, 2024",
    createdShort: "Sep 05",
    status: "active",
  },
  {
    id: "website",
    title: "Personal Website",
    slug: "website",
    destinationUrl: "https://example.com",
    clicks: 128,
    createdAt: "2024-08-21",
    createdLabel: "Aug 21, 2024",
    createdShort: "Aug 21",
    status: "active",
  },
];

const extraLinks: ManagedLink[] = Array.from({ length: 20 }, (_, index) => {
  const n = index + 5;
  const day = 20 - (index % 18);
  const archived = index % 7 === 0;

  return {
    id: `link-${n}`,
    title: `Campaign ${n}`,
    slug: `campaign-${n}`,
    destinationUrl: `https://example.com/campaigns/${n}`,
    clicks: Math.max(12, 110 - index * 4),
    createdAt: `2024-07-${String(day).padStart(2, "0")}`,
    createdLabel: `Jul ${String(day).padStart(2, "0")}, 2024`,
    createdShort: `Jul ${String(day).padStart(2, "0")}`,
    status: archived ? "archived" : "active",
  };
});

export const managedLinks: ManagedLink[] = [...featuredLinks, ...extraLinks];

export function getManagedLink(slug: string) {
  return managedLinks.find((link) => link.slug === slug);
}

export const recentLinks: RecentLink[] = featuredLinks
  .slice(0, 3)
  .map((link) => ({
    id: link.id,
    title: link.title,
    slug: link.slug,
    clicks: link.clicks,
    createdLabel: link.createdShort,
  }));
