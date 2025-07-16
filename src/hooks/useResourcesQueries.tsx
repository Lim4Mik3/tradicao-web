import { ResourceService } from "@/services/resourceService";
import { ResourceCategory } from "@/models/Resource";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Hook para buscar todos os recursos
export function useGetResources() {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      return await ResourceService.findAll();
    },
  });
}

// Hook para buscar um recurso por ID
export function useGetResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async () => {
      return await ResourceService.findById(id);
    },
    enabled: !!id,
  });
}

// Hook para buscar recursos por categoria
export function useGetResourcesByCategory(category: ResourceCategory) {
  return useQuery({
    queryKey: ['resources', 'category', category],
    queryFn: async () => {
      return await ResourceService.findByCategory(category);
    },
    enabled: !!category,
  });
}

// Hook para atualizar um recurso
export function useUpdateResource() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: {
        title?: string;
        category?: ResourceCategory;
        image?: File;
      }
    }) => {
      return await ResourceService.update(id, data);
    },
    onSuccess: (updatedResource) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      queryClient.invalidateQueries({ queryKey: ['resource', updatedResource.id] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar recurso:', error);
    },
  });
}

// Hook para deletar um recurso
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
