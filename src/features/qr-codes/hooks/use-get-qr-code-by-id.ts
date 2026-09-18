import { useQuery } from "@tanstack/react-query";
import { getQrCodeByIdOnClient } from "../services/client";

export const useGetQrCodeById = (id: string) => {
  return useQuery({
    queryKey: ["qr-code", id],
    queryFn: () => getQrCodeByIdOnClient(id),
  });
};
