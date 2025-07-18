import { supabase } from "@/infra/supabase";

export namespace GetGasStation {
  export type Input = {
    term?: string;
    page?: number;
    limit?: number;
  };

  export type Output = {
    page: number;
    stations: Array<{
      _id: string;
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
        street_number: string | null;
      };
      filialNumber: string;
      apps: string[];
      services: string[];
      brands: string[];
      conveniences: string[];
      oilChanges: string[];
      location: {
        type: string;
        coordinates: [number, number];
      };
      images: string[];
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export async function ListGasStation(
  input: GetGasStation.Input
): Promise<GetGasStation.Output> {
  const { term, page = 1, limit = 100 } = input;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("gas_stations")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

  if (term && term.length >= 3) {
    // Busca por nome OU por partes do endereço (cidade, bairro, rua)
    query = query.or(
      `name.ilike.%${term}%,address->>city.ilike.%${term}%,address->>neighborhood.ilike.%${term}%,address->>route.ilike.%${term}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Erro na busca de postos de gasolina");
  }

  const stations = (data || []).map((station: any) => ({
    _id: station.id,
    name: station.name,
    email: station.email,
    address: station.address,
    filialNumber: station.filial_number,
    apps: station.apps || [],
    services: station.services || [],
    brands: station.brands || [],
    conveniences: station.conveniences || [],
    oilChanges: station.oil_changes || [],
    location: {
      type: "Point",
      coordinates: station.address?.coordinates || [0, 0],
    },
    images: station.images || [],
    createdAt: station.created_at,
    updatedAt: station.updated_at,
  }));

  return {
    page,
    stations,
  };
}