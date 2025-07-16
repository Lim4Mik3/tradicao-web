import { GetGasStationsFromSupabase } from '@/services/GetGasStationsFromSupabase';
import { useQuery } from '@tanstack/react-query';

interface UseGetGasStationsParams {
  limit?: number;
  offset?: number;
}

export function useGetGasStations(params: UseGetGasStationsParams = {}) {
  const { limit = 15, offset = 0 } = params;
  
  return useQuery({
    queryKey: ['gas-stations-supabase', limit, offset],
    staleTime: 0,
    queryFn: () => GetGasStationsFromSupabase({ limit, offset }),
  });
}