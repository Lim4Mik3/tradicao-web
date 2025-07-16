import { DeleteGasStationFromSupabase } from "@/services/DeleteGasStationFromSupabase";
import { useMutation } from "@tanstack/react-query";

export function useDeleteGasStation() {
  return useMutation({
    mutationFn: DeleteGasStationFromSupabase,
  });
}