import { restApiPaths } from "@/config/api";
import { api, ApiError } from "@/lib/api";
import { mapApiOverview } from "../schema";
import type { Overview } from "../types";

export const getOverviewOnServer = async (): Promise<Overview> => {
  const response = await api<unknown>(restApiPaths.overview["backend-get"], {
    method: "GET",
  });

  try {
    return mapApiOverview(response ?? {});
  } catch {
    throw new ApiError("Invalid overview response", 502);
  }
};
