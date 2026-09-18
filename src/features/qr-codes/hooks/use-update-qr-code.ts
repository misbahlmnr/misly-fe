import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { overviewKey } from "@/features/dashboard/services/client";
import {
  qrCodesQueryKey,
  updateQrCodeOnClient,
} from "@/features/qr-codes/services/client";
import { queryClient } from "@/lib/react-query";

export const useUpdateQrCode = () => {
  return useMutation({
    mutationFn: ({
      id,
      values,
      selectedDestinationUrl,
    }: {
      id: string;
      values: Parameters<typeof updateQrCodeOnClient>[1];
      selectedDestinationUrl?: string;
    }) => updateQrCodeOnClient(id, values, selectedDestinationUrl),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message, { position: "top-center" });
        return;
      }

      toast.success(result.message ?? "QR code updated successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: qrCodesQueryKey });
      queryClient.invalidateQueries({ queryKey: overviewKey });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update QR code",
        { position: "top-center" },
      );
    },
  });
};
