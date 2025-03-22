import { DeleteGasStation } from "@/services/DeleteGasStation";
import { useMutation } from "@tanstack/react-query";

export function useDeleteGasStation() {
  return useMutation({
    mutationFn: DeleteGasStation,
  });
}