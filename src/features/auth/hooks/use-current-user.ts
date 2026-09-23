import { useQuery } from "@tanstack/react-query";

import {
  currentUserQueryKey,
  getCurrentUserOnClient,
} from "@/features/auth/services/client";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUserOnClient,
  });
};
