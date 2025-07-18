import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/infra/supabase";

// Função auxiliar para buscar IDs de recursos por título e categoria
async function getResourceIdsByTitlesAndCategory(titles: string[], category: string): Promise<string[]> {
  if (!titles || titles.length === 0) return [];
  
  const { data, error } = await supabase
    .from("resources")
    .select("id")
    .eq("category", category)
    .in("title", titles);

  if (error) {
    return [];
  }

  return data?.map(resource => resource.id) || [];
}

export function useGetGasStation(id: string) {
  return useQuery({
    queryKey: ["gas-station", id],
    queryFn: async () => {
      if (!id) throw new Error("ID é obrigatório");

      const { data, error } = await supabase
        .from("gas_stations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(`Erro ao buscar posto: ${error.message}`);
      }

      if (!data) {
        throw new Error("Posto não encontrado");
      }

      // Mapear dados do banco para o formato esperado pelo componente
      // Converter títulos de recursos para IDs
      const [appsIds, servicesIds, brandsIds, conveniencesIds, oilChangesIds] = await Promise.all([
        getResourceIdsByTitlesAndCategory(data.apps || [], 'APPS'),
        getResourceIdsByTitlesAndCategory(data.services || [], 'SERVICES'),
        getResourceIdsByTitlesAndCategory(data.brands || [], 'BRANDS'),
        getResourceIdsByTitlesAndCategory(data.conveniences || [], 'CONVINIENCES'),
        getResourceIdsByTitlesAndCategory(data.oil_changes || [], 'CHANGE_OIL'),
      ]);

      return {
        _id: data.id,
        id: data.id,
        name: data.name,
        email: data.email,
        filialNumber: data.filial_number,
        phone: data.phone,
        mobile: data.mobile,
        whatsapp: data.whatsapp,
        comercialHours: data.comercial_hours,
        holidaysHours: data.holidays_hours,
        apps: appsIds,
        services: servicesIds,
        brands: brandsIds,
        conveniences: conveniencesIds,
        oilChanges: oilChangesIds,
        images: data.images || [],
        address: {
          ...data.address,
          label: data.address?.label || data.address?.formatted || "",
          formatted: data.address?.formatted || data.address?.label || "",
          coordinates: data.address?.coordinates || [0, 0],
          location: {
            lat: data.address?.coordinates?.[1] || 0, // PostGIS format: [lng, lat]
            lng: data.address?.coordinates?.[0] || 0, // So coordinates[1] = lat, coordinates[0] = lng
          },
        },
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };
    },
    enabled: !!id,
  });
}
