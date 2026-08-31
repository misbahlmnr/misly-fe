import { useQuery } from "@tanstack/react-query";
import { getOverviewOnClient, overviewKey } from "../services/client";

export const useGetOverview = () => {
  return useQuery({
    queryKey: overviewKey,
    queryFn: () => getOverviewOnClient(),
  });
};
