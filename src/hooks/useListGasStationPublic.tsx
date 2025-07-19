import { ListGasStation } from "@/services/ListGasStation";
import { SearchNearbyGasStations } from "@/services/SearchNearbyGasStations";
import { debounce } from "@/utils/debounce";
import { normalizeString } from "@/utils/normalizeString";
import { useQuery } from "@tanstack/react-query";

interface UseGasStationsPublicParams {
  term?: string;
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
  radiusKm?: number;
}

export const useListGasStationPublic = ({ 
  term, 
  userLocation, 
  radiusKm = 25 
}: UseGasStationsPublicParams) => {
  const debouncedFetch = debounce(async (params: { 
    term?: string; 
    userLocation?: { latitude: number; longitude: number } | null;
  }) => {
    // Se temos localização do usuário e não há busca por texto, buscar por proximidade
    if (params.userLocation && (!params.term || params.term.length === 0)) {
      const result = await SearchNearbyGasStations({
        latitude: params.userLocation.latitude,
        longitude: params.userLocation.longitude,
        radiusKm,
        limit: 100,
      });

      if (!result.stations || result.stations.length === 0) {
        // Se não encontrou nada por proximidade, busca geral
        const allResult = await ListGasStation({
          term: undefined,
          page: 1,
          limit: 100,
        });
        return allResult;
      }

      // Converter formato para compatibilidade
      return {
        page: 1,
        stations: result.stations.map(station => ({
          _id: station.id,
          name: station.name,
          email: station.email,
          address: station.address,
          filialNumber: station.filialNumber,
          apps: station.apps || [],
          services: station.services || [],
          brands: station.brands || [],
          phone: station.phone,
          conveniences: station.conveniences || [],
          oilChanges: station.oilChanges || [],
          location: {
            type: "Point" as const,
            coordinates: station.address?.coordinates || [0, 0],
          },
          images: station.images || [],
          createdAt: station.createdAt,
          updatedAt: station.updatedAt,
          distanceKm: station.distanceKm, // Adicionar distância
        }))
      };
    }
    
    // Busca por texto normal
    let normalizedTerm = params.term ? normalizeString(params.term) : undefined;
    const result = await ListGasStation({
      term: normalizedTerm,
      page: 1,
      limit: 100,
    });

    return result;
  }, 500);

  return useQuery({
    queryKey: ["gas-station-public", term, userLocation],
    queryFn: async () => {
      // Se o termo é muito curto e não temos localização, retornar lista vazia
      if (term && term.length < 3 && !userLocation) {
        return { page: 1, stations: [] };
      }

      return await debouncedFetch({ term, userLocation });
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
    enabled: !term || term.length >= 3 || term.length === 0 || !!userLocation,
  });
};
