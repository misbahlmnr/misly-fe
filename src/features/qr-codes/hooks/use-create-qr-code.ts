import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { overviewKey } from "@/features/dashboard/services/client";
import {
  createQrCodeOnClient,
  qrCodesQueryKey,
} from "@/features/qr-codes/services/client";
import { queryClient } from "@/lib/react-query";

export const useCreateQrCode = () => {
  return useMutation({
    mutationFn: ({
      values,
      selectedDestinationUrl,
    }: {
      values: Parameters<typeof createQrCodeOnClient>[0];
      selectedDestinationUrl?: string;
    }) => createQrCodeOnClient(values, selectedDestinationUrl),
    onSuccess: (result) => {
      if (!result.success) {
        toast.error(result.message, { position: "top-center" });
        return;
      }

      toast.success(result.message ?? "QR code created successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: qrCodesQueryKey });
      queryClient.invalidateQueries({ queryKey: overviewKey });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create QR code",
        { position: "top-center" },
      );
    },
  });
};
