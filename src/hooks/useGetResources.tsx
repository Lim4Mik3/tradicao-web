import { GetResources } from '@/services/GetResources';
import { useQuery } from '@tanstack/react-query';

export function useGetResources(category?: string) {
  return useQuery({
    queryKey: ['resources', category],
    queryFn: () => GetResources(category),
  });
}