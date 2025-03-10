import { EditResource } from "@/services/EditResource";
import { useMutation } from "@tanstack/react-query";

export function useEditResource() {
  return useMutation({
    mutationFn: EditResource,
  });
}