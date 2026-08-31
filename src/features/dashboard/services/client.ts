import axios from "axios";

import { restApiPaths } from "@/config/api";
import type { Overview, OverviewApiResponse } from "../types";

export const overviewKey = ["overview"] as const;

export const getOverviewOnClient = async (): Promise<Overview> => {
  const response = await axios.get<OverviewApiResponse>(
    restApiPaths.overview["frontend-get"],
    {
      validateStatus: () => true,
    },
  );

  const body = response.data;

  if (response.status < 200 || response.status >= 300 || !body?.success) {
    throw new Error(body?.message ?? "Failed to get overview");
  }

  return (
    body.data ?? {
      stats: { totalLinks: 0, totalClicks: 0, totalQrCodes: 0 },
      recentLinks: [],
    }
  );
};
