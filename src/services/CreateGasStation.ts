import { supabase } from "@/infra/supabase";
import { GasStationModel } from "@/models/GasStation";
import { UploadGasStationImages } from "./UploadGasStationImages";
import { DeleteGasStationImages } from "./DeleteGasStationImages";

export namespace CreateGasStation {
  export type Input = {
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

  export type Output = {
    status: string;
    data?: {
      id: string;
      name: string;
      filialNumber: string;
    };
  };
}

export async function CreateGasStation(input: CreateGasStation.Input): Promise<{
  error: string | null;
  data: CreateGasStation.Output | null;
}> {
  let gasStationId: string | null = null;
  try {
    // Debug dos dados de entrada
    console.log('📝 Dados de entrada CreateGasStation:', {
      name: input.name,
      phone: input.phone,
      mobile: input.mobile,
      whatsapp: input.whatsapp,
      email: input.email,
      lengths: {
        phone: input.phone?.length,
        mobile: input.mobile?.length,
        whatsapp: input.whatsapp?.length,
        email: input.email?.length
      }
    });
    
    // Novo address
    const addressDetails = {
      label: input.address.label,
      location: input.address.location,
      // Preenche campos extras como vazio para compatibilidade
      route: "",
      street_number: "",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
      postal_code: "",
      placeId: "",
      formatted: "",
      // PostGIS padrão: [longitude, latitude] - consistente com POINT(lng lat)
      coordinates: [input.address.location.lng ?? 0, input.address.location.lat ?? 0] as [number, number],
    };

    // Criar o modelo do posto de gasolina
    const gasStationModel = GasStationModel.create({
      name: input.name,
      email: input.email,
      filialNumber: input.filialNumber,
      address: addressDetails,
      phone: input.phone,
      mobile: input.mobile,
      whatsapp: input.whatsapp,
      comercialHours: input.comercialHours,
      holidaysHours: input.holidaysHours,
      apps: input.apps || [],
      services: input.services || [],
      brands: input.brands || [],
      conveniences: input.conveniences || [],
      oilChanges: input.oilChanges || [],
      images: [], // Será preenchido após o upload
    });

    gasStationId = gasStationModel.id;

    // Upload de imagens
    let imageUrls: string[] = [];
    if (input.photos && input.photos.length > 0) {
      try {
        const uploadResult = await UploadGasStationImages({
          gasStationId: gasStationModel.id,
          images: input.photos.map(photo => photo.file),
        });
        imageUrls = uploadResult.urls;
        gasStationModel.images = imageUrls;
      } catch (uploadError) {
        console.warn("Erro no upload de imagens, continuando sem imagens:", uploadError);
      }
    }

    // Salvar no Supabase
    const gasStationData = gasStationModel.toJson();
    const { data, error } = await supabase
      .from('gas_stations')
      .insert([gasStationData])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao salvar posto no banco: ${error.message}`);
    }

    return {
      error: null,
      data: {
        status: "success",
        data: {
          id: data.id,
          name: data.name,
          filialNumber: data.filial_number,
        },
      },
    };
  } catch (error) {
    console.error("Erro ao criar posto de gasolina:", error);
    if (gasStationId) {
      try {
        await DeleteGasStationImages({ gasStationId });
        console.log("Imagens limpas com sucesso após erro");
      } catch (cleanupError) {
        console.error("Erro ao limpar imagens:", cleanupError);
      }
    }
    return {
      error: error instanceof Error ? error.message : "Erro desconhecido ao criar posto",
      data: null,
    };
  }
}