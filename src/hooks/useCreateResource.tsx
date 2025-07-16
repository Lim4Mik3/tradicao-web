import { ResourceService } from "@/services/resourceService";
import { ResourceCategory } from "@/models/Resource";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateResourceData {
  title: string;
  category: ResourceCategory;
  image: File;
}

export function useCreateResouce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateResourceData) => {
      return await ResourceService.create(data);
    },
    onSuccess: () => {
      // Invalidar a query dos recursos para atualizar a lista
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
    onError: (error) => {
      console.error('Erro ao criar recurso:', error);
    },
  });
}