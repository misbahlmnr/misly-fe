import { useMutation } from "@tanstack/react-query";
import { deleteQrCodeOnClient } from "../services/client";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";

export const useDeleteQrCode = () => {
  return useMutation({
    mutationFn: (id: string) => deleteQrCodeOnClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });

      toast.success("QR code deleted successfully", { position: "top-center" });
    },
  });
};
