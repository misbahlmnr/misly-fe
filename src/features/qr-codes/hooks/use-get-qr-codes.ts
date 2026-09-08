import { useQuery } from "@tanstack/react-query";

import {
  getQrCodesOnClient,
  qrCodesQueryKey,
} from "@/features/qr-codes/services/client";

export const useGetQrCodes = () => {
  return useQuery({
    queryKey: qrCodesQueryKey,
    queryFn: getQrCodesOnClient,
  });
};
