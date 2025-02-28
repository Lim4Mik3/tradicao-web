import { DeleteResource } from "@/services/DeleteResource";
import { useMutation } from "@tanstack/react-query";

export function useDeleteResource() {
  return useMutation({
    mutationFn: DeleteResource,
  });
}