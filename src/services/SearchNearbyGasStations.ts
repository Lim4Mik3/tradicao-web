import { supabase } from "@/infra/supabase";

export namespace SearchNearbyGasStations {
  export type Input = {
    latitude: number;
    longitude: number;
    radiusKm?: number;
    limit?: number;
  };

  export type GasStation = {
    id: string;
    name: string;
    email: string;
    address: any;
    filialNumber: string;
    phone: string;
    mobile: string;
    whatsapp: string;
    comercialHours: string;
    holidaysHours: string;
    apps: string[];
    services: string[];
    brands: string[];
    conveniences: string[];
    oilChanges: string[];
    images: string[];
    distanceKm: number;
    createdAt: string;
    updatedAt: string;
  };

  export type Output = {
    stations: GasStation[];
    userLocation: {
      latitude: number;
      longitude: number;
    };
  };
}

export async function SearchNearbyGasStations(
  input: SearchNearbyGasStations.Input
): Promise<SearchNearbyGasStations.Output> {
  try {
    const { latitude, longitude, radiusKm = 10, limit = 20 } = input;

    // Usando a função ST_DWithin do PostGIS para busca por proximidade
    const { data, error } = await supabase.rpc('search_nearby_gas_stations', {
      user_lat: latitude,
      user_lng: longitude,
      radius_km: radiusKm,
      result_limit: limit
    });

    if (error) {
      throw new Error(`Erro na busca por proximidade: ${error.message}`);
    }

    const stations = (data || []).map((station: any) => ({
      id: station.id,
      name: station.name,
      email: station.email,
      address: station.address,
      filialNumber: station.filial_number,
      phone: station.phone,
      mobile: station.mobile,
      whatsapp: station.whatsapp,
      comercialHours: station.comercial_hours,
      holidaysHours: station.holidays_hours,
      apps: station.apps,
      services: station.services,
      brands: station.brands,
      conveniences: station.conveniences,
      oilChanges: station.oil_changes,
      images: station.images,
      distanceKm: parseFloat(station.distance_km),
      createdAt: station.created_at,
      updatedAt: station.updated_at,
    }));

    return {
      stations,
      userLocation: {
        latitude,
        longitude,
      },
    };
  } catch (error) {
    console.error("Erro na busca por proximidade:", error);
    throw new Error("Erro na busca de postos próximos");
  }
}
