import { CreateResource } from "@/services/CreateResource";
import { useMutation } from "@tanstack/react-query";

export function useCreateResouce() {
  return useMutation({
    mutationFn: CreateResource,
  });
}