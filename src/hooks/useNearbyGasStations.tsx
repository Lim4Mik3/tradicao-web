import { SearchNearbyGasStations } from "@/services/SearchNearbyGasStations";
import { useQuery } from "@tanstack/react-query";

interface UseNearbyGasStationsParams {
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  limit?: number;
  enabled?: boolean;
}

export const useNearbyGasStations = ({
  latitude,
  longitude,
  radiusKm = 10,
  limit = 20,
  enabled = true,
}: UseNearbyGasStationsParams) => {
  return useQuery({
    queryKey: ["nearby-gas-stations", latitude, longitude, radiusKm, limit],
    queryFn: () => {
      if (!latitude || !longitude) {
        throw new Error("Latitude e longitude são obrigatórias");
      }
      return SearchNearbyGasStations({
        latitude,
        longitude,
        radiusKm,
        limit,
      });
    },
    enabled: enabled && !!latitude && !!longitude,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
  });
};
