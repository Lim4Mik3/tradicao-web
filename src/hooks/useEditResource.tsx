import { ResourceService } from "@/services/resourceService";
import { ResourceCategory } from "@/models/Resource";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditResourceData {
  id: string;
  title?: string;
  category?: ResourceCategory;
  image?: File;
}

export function useEditResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditResourceData) => {
      const { id, ...updateData } = data;
      return await ResourceService.update(id, updateData);
    },
    onSuccess: (updatedResource) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      queryClient.invalidateQueries({ queryKey: ['resource', updatedResource.id] });
    },
    onError: (error) => {
    },
  });
}