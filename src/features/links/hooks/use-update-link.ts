import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { overviewKey } from "@/features/dashboard/services/client";
import type { CreateLinkValues } from "@/features/links/schema";
import { queryClient } from "@/lib/react-query";
import { linksQueryKey, updateLinkOnClient } from "../services/client";

export const useUpdateLink = () => {
  return useMutation({
    mutationFn: ({ id, values }: { id: string; values: CreateLinkValues }) =>
      updateLinkOnClient(id, values),
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
