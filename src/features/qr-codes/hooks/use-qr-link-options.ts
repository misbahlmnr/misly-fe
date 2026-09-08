import { useQuery } from "@tanstack/react-query";

import { getLinksOnClient, linksQueryKey } from "@/features/links/services/client";

export const useQrLinkOptions = () => {
  return useQuery({
    queryKey: [...linksQueryKey, "qr-options"],
    queryFn: () => getLinksOnClient({ page: 1, limit: 100 }),
  });
};
