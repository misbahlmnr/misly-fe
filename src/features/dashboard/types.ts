import type { ManagedLink } from "@/features/links/schema";

export type Overview = {
  stats: {
    totalLinks: number;
    totalClicks: number;
    totalQrCodes: number;
  };
  recentLinks: ManagedLink[];
};

export type OverviewApiResponse = {
  success: boolean;
  message?: string;
  data?: Overview;
};
