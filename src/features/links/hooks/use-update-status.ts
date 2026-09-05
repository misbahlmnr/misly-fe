import { useMutation } from "@tanstack/react-query";
import { linksQueryKey, updateLinkStatus } from "../services/client";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { overviewKey } from "@/features/dashboard/services/client";

export const useUpdateStatus = () => {
  return useMutation({
    mutationFn: ({ id, value }: { id: string; value: string }) =>
      updateLinkStatus(id, value),
    onSuccess: () => {
      toast.success("Link status updated successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: linksQueryKey });
      queryClient.invalidateQueries({ queryKey: overviewKey });
    },
  });
};
