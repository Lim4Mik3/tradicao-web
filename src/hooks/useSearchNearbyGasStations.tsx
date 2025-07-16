import { useQuery } from '@tanstack/react-query';
import { SearchNearbyGasStations } from '@/services/SearchNearbyGasStations';

interface UseSearchNearbyGasStationsParams {
  latitude: number;
  longitude: number;
  radiusKm?: number;
  limit?: number;
  enabled?: boolean;
}

export function useSearchNearbyGasStations({
  latitude,
  longitude,
  radiusKm = 10,
  limit = 20,
  enabled = true
}: UseSearchNearbyGasStationsParams) {
  return useQuery({
    queryKey: ['nearby-gas-stations', latitude, longitude, radiusKm, limit],
    queryFn: () => SearchNearbyGasStations({
      latitude,
      longitude,
      radiusKm,
      limit
    }),
    enabled: enabled && !!(latitude && longitude),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}
