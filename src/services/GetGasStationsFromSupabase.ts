import { supabase } from "@/infra/supabase";

export namespace GetGasStationsFromSupabase {
  export type Input = {
    limit?: number;
    offset?: number;
  };

  export type Output = {
    pagination: {
      page: number;
      limit: number;
      total: number;
    };
    stations: Array<{
      id: string;
      name: string;
      email: string;
      address: {
        route: string;
        neighborhood: string;
        city: string;
        coordinates: [number, number];
        country: string;
        formatted: string;
        placeId: string;
        postal_code: string;
        state: string;
        street_number: string;
      };
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
      location: {
        type: string;
        coordinates: [number, number];
      };
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export async function GetGasStationsFromSupabase(
  input: GetGasStationsFromSupabase.Input = {}
): Promise<GetGasStationsFromSupabase.Output> {
  try {
    const { limit = 15, offset = 0 } = input;

    let query = supabase
      .from('gas_stations')
      .select('*', { count: 'exact' });

    const { data, error, count } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar postos: ${error.message}`);
    }

    const stations = (data || []).map(station => ({
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
      location: {
        type: "Point",
        coordinates: station.address.coordinates
      },
      createdAt: station.created_at,
      updatedAt: station.updated_at,
    }));

    const page = Math.floor(offset / limit) + 1;

    return {
      pagination: {
        page,
        limit,
        total: count || 0,
      },
      stations,
    };
  } catch (error) {
    throw new Error("Erro na busca de postos de gasolina");
  }
}
