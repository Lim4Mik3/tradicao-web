import { ResourceService } from "@/services/resourceService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return await ResourceService.delete(id);
    },
    onSuccess: () => {
      // Invalidar a query dos recursos para atualizar a lista
      queryClient.invalidateQueries({ queryKey: ['resources'] });
    },
    onError: (error) => {
      console.error('Erro ao deletar recurso:', error);
    },
  });
}