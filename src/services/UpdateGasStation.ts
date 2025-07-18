import { supabase } from "@/infra/supabase";

export type UpdateGasStationInput = {
  id: string;
  data: {
    name: string;
    filialNumber: string;
    address: {
      label: string;
      location: {
        lat: number;
        lng: number;
      };
    };
    photos?: Array<{ id: string; file: File }>;
    services?: string[];
    phone: string;
    comercialHours: string;
    holidaysHours: string;
    mobile: string;
    whatsapp: string;
    email: string;
    apps?: string[];
    brands?: string[];
    conveniences?: string[];
    oilChanges?: string[];
  };
};

export async function UpdateGasStation({ id, data }: UpdateGasStationInput): Promise<{
  error: string | null;
  data: any;
}> {
  try {
    // Debug dos dados de entrada
    console.log('📝 Dados de entrada UpdateGasStation:', {
      id,
      name: data.name,
      phone: data.phone,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,
      lengths: {
        phone: data.phone?.length,
        mobile: data.mobile?.length,
        whatsapp: data.whatsapp?.length,
        email: data.email?.length
      }
    });
    
    // Mapear os dados conforme o modelo GasStation
    const addressDetails = {
      label: data.address.label,
      location: data.address.location,
      // Manter campos compatíveis com o modelo
      route: "",
      street_number: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      placeId: "",
      formatted: data.address.label,
      // PostGIS padrão: [longitude, latitude]
      coordinates: [data.address.location.lng, data.address.location.lat] as [number, number],
    };

    // Preparar dados para update no formato do banco
    const updateData = {
      name: data.name,
      filial_number: data.filialNumber,
      address: addressDetails,
      phone: data.phone,
      mobile: data.mobile,
      whatsapp: data.whatsapp,
      email: data.email,
      comercial_hours: data.comercialHours,
      holidays_hours: data.holidaysHours,
      apps: data.apps || [],
      services: data.services || [],
      brands: data.brands || [],
      conveniences: data.conveniences || [],
      oil_changes: data.oilChanges || [],
      // Para PostGIS - formato POINT(longitude latitude)
      location: `POINT(${data.address.location.lng} ${data.address.location.lat})`,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("gas_stations")
      .update(updateData)
      .eq("id", id);

    if (error) {
      throw new Error(`Erro ao atualizar posto: ${error.message}`);
    }

    return { error: null, data: true };
  } catch (error) {
    console.error("Erro ao atualizar posto de gasolina:", error);
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido ao atualizar posto",
      data: null,
    };
  }
}
