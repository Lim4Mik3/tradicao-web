import { CreateGasStation } from "@/services/CreateGasStation";
import { useMutation } from "@tanstack/react-query";

export function useCreateGasStation() {
  return useMutation({
    mutationFn: CreateGasStation,
  });
}