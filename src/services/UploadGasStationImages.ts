import { supabase } from "@/infra/supabase";

export namespace UploadGasStationImages {
  export type Input = {
    gasStationId: string;
    images: File[];
  };

  export type Output = {
    urls: string[];
  };
}

export async function UploadGasStationImages(
  input: UploadGasStationImages.Input
): Promise<UploadGasStationImages.Output> {
  try {
    const { gasStationId, images } = input;
    const uploadPromises = images.map(async (file, index) => {
      const fileExtension = file.name.split('.').pop();
      const fileName = `${gasStationId}_${index}_${Date.now()}.${fileExtension}`;
      const filePath = `gas-stations/${gasStationId}/${fileName}`;

      const { error } = await supabase.storage
        .from('gas-station-images')
        .upload(filePath, file);

      if (error) {
        throw new Error(`Erro ao fazer upload da imagem ${index}: ${error.message}`);
      }

      // Obter URL pública da imagem
      const { data: urlData } = supabase.storage
        .from('gas-station-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    });

    const urls = await Promise.all(uploadPromises);

    return { urls };
  } catch (error) {
    console.error("Erro ao fazer upload das imagens:", error);
    throw new Error("Erro no upload das imagens para o Supabase Storage");
  }
}
