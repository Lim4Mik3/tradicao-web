import { supabase } from "@/infra/supabase";
import { normalizeString } from "@/utils/normalizeString";

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
  let { term, page = 1, limit = 100 } = input;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Normaliza o termo para busca sem acentuação
  if (term) {
    term = normalizeString(term);
  }

  let query = supabase
    .from("gas_stations")
    .select("*", { count: "exact" })
    .range(from, to)
    .order("created_at", { ascending: false });

  if (term && term.length >= 3) {
    // Busca por nome OU por partes do endereço (cidade, bairro, rua) - frontend, ignorando acento
    // Busca todos e filtra manualmente
    const { data, error, count } = await supabase
      .from("gas_stations")
      .select("*", { count: "exact" });

    if (error) {
      throw new Error("Erro na busca de postos de gasolina");
    }

    // Normaliza termo para comparação
    const normalizedTerm = term;
    const filtered = (data || []).filter((station: any) => {
      const fields = [
        station.name,
        station.address?.city,
        station.address?.neighborhood,
        station.address?.route,
      ];
      return fields.some(f => f && normalizeString(f).includes(normalizedTerm));
    });

    const stations = filtered.slice(from, to + 1).map((station: any) => ({
      _id: station.id,
      name: station.name,
      email: station.email,
      address: station.address,
      filialNumber: station.filial_number,
      apps: station.apps || [],
      phone: station.phone || "",
      services: station.services || [],
      brands: station.brands || [],
      comercial_hours: station.comercial_hours || "",
      holidays_hours: station.holidays_hours || "",
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
    phone: station.phone || "",
    services: station.services || [],
    brands: station.brands || [],
    comercial_hours: station.comercial_hours || "",
    holidays_hours: station.holidays_hours || "",
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