import { GetResources } from '@/services/GetResources'
import { useQuery } from '@tanstack/react-query'

export function useGetResources() {
  return useQuery({
    queryKey: ['resources'],
    queryFn: GetResources,
  })
}