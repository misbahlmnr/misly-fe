import { useQuery } from "@tanstack/react-query";

import { useLinksTableParams } from "@/components/shared/data-table";
import { getLinksOnClient, linksQueryKey } from "../services/client";

export const useGetLinks = () => {
  const params = useLinksTableParams(10);

  return useQuery({
    queryKey: [...linksQueryKey, params],
    queryFn: () => getLinksOnClient(params),
  });
};
