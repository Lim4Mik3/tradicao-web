import { supabase } from "@/infra/supabase";

export namespace DeleteGasStationImages {
  export type Input = {
    gasStationId: string;
  };

  export type Output = {
    success: boolean;
    deletedCount: number;
  };
}

export async function DeleteGasStationImages(
  input: DeleteGasStationImages.Input
): Promise<DeleteGasStationImages.Output> {
  try {
    const { gasStationId } = input;
    
    // Listar todos os arquivos da pasta do posto
    const { data: files, error: listError } = await supabase.storage
      .from('gas-station-images')
      .list(`gas-stations/${gasStationId}`);

    if (listError) {
      console.error('Erro ao listar imagens:', listError);
      return { success: false, deletedCount: 0 };
    }

    if (!files || files.length === 0) {
      return { success: true, deletedCount: 0 };
    }

    // Deletar todos os arquivos
    const filePaths = files.map(file => `gas-stations/${gasStationId}/${file.name}`);
    
    const { error: deleteError } = await supabase.storage
      .from('gas-station-images')
      .remove(filePaths);

    if (deleteError) {
      console.error('Erro ao deletar imagens:', deleteError);
      return { success: false, deletedCount: 0 };
    }

    return { success: true, deletedCount: files.length };
  } catch (error) {
    console.error("Erro ao deletar imagens do posto:", error);
    return { success: false, deletedCount: 0 };
  }
}
