import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { overviewKey } from "@/features/dashboard/services/client";
import { queryClient } from "@/lib/react-query";
import { createLinkOnClient, linksQueryKey } from "../services/client";

export const useCreateLink = () => {
  return useMutation({
    mutationFn: createLinkOnClient,
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message, { position: "top-center" });
        return;
      }

      toast.success(result.message, { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: linksQueryKey });
      queryClient.invalidateQueries({ queryKey: overviewKey });
    },
  });
};
