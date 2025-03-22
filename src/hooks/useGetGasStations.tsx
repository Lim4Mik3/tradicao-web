import { GetGasStation } from '@/services/GetGasStations';
import { useQuery } from '@tanstack/react-query';

export function useGetGasStations() {
  return useQuery({
    queryKey: ['gas-stations'],
    staleTime: 0,
    queryFn: () => GetGasStation(),
  });
}