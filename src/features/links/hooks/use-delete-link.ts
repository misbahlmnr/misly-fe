import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { overviewKey } from "@/features/dashboard/services/client";
import { queryClient } from "@/lib/react-query";
import { deleteLink, linksQueryKey } from "../services/client";

export const useDeleteLink = () => {
  return useMutation({
    mutationFn: (id: string) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: linksQueryKey });
      queryClient.invalidateQueries({ queryKey: overviewKey });
      toast.success("Link deleted successfully", { position: "top-center" });
    },
    onError: () => {
      toast.error("Failed to delete link", { position: "top-center" });
    },
  });
};
