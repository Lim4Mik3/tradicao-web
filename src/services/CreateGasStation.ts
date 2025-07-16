import { supabase } from "@/infra/supabase";
import { GasStationModel } from "@/models/GasStation";
import { UploadGasStationImages } from "./UploadGasStationImages";
import { DeleteGasStationImages } from "./DeleteGasStationImages";

export namespace CreateGasStation {
  export type Input = {
    name: string;
    filialNumber: string;
    addressPlaceId: string;
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
    // 1. Usar placeId diretamente - endereço básico
    const addressDetails = {
      route: "A ser preenchido",
      street_number: "",
      neighborhood: "A ser preenchido",
      city: "A ser preenchido",
      state: "A ser preenchido", 
      country: "Brasil",
      postal_code: "",
      placeId: input.addressPlaceId,
      formatted: "Endereço selecionado via Google Places",
      coordinates: [-23.5505, -46.6333] as [number, number] // [latitude, longitude] - São Paulo
    };

    // 2. Criar o modelo do posto de gasolina
    const gasStationModel = GasStationModel.create({
      name: input.name,
      email: input.email,
      filialNumber: input.filialNumber,
      phone: input.phone,
      mobile: input.mobile,
      whatsapp: input.whatsapp,
      comercialHours: input.comercialHours,
      holidaysHours: input.holidaysHours,
      address: addressDetails,
      apps: input.apps || [],
      services: input.services || [],
      brands: input.brands || [],
      conveniences: input.conveniences || [],
      oilChanges: input.oilChanges || [],
      images: [], // Será preenchido após o upload
    });

    // Salvar o ID para possível limpeza
    gasStationId = gasStationModel.id;

    // 3. Fazer upload das imagens se existirem
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
        // Continue mesmo se o upload falhar
      }
    }

    // 4. Salvar no Supabase
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
    
    // Limpar imagens em caso de erro
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