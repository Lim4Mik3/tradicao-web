import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateGasStation, UpdateGasStationInput } from "@/services/UpdateGasStation";

export function useEditGasStation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateGasStationInput) => {
      return await UpdateGasStation(input);
    },
    onSuccess: (_, variables) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['gas-stations'] });
      queryClient.invalidateQueries({ queryKey: ['gas-station', variables.id] });
      queryClient.invalidateQueries({ queryKey: ['list-gas-stations'] });
    },
    onError: (error) => {
    },
  });
}
