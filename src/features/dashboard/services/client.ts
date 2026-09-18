import axios from "axios";

import { restApiPaths } from "@/config/api";
import type { Overview, OverviewApiResponse } from "../types";

export const overviewKey = ["overview"] as const;

const fallbackOverview: Overview = {
  stats: { totalLinks: 0, totalClicks: 0, totalQrCodes: 0 },
  recentLinks: [],
};

export const getOverviewOnClient = async (): Promise<Overview> => {
  const res = await axios.get<OverviewApiResponse>(
    restApiPaths.overview["frontend-get"],
    {
      validateStatus: () => true,
    },
  );

  if (res.status < 200 || res.status >= 300 || !res.data?.success) {
    throw new Error(res.data?.message ?? "Failed to get overview");
  }

  return res.data.data ?? fallbackOverview;
};
