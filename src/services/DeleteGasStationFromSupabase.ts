import { supabase } from "@/infra/supabase";

export namespace DeleteGasStationFromSupabase {
  export type Input = {
    id: string;
  };

  export type Output = null;
}

export async function DeleteGasStationFromSupabase(
  props: DeleteGasStationFromSupabase.Input
): Promise<DeleteGasStationFromSupabase.Output> {
  try {
    // Primeiro, buscar as imagens para deletar do storage
    const { data: gasStation, error: fetchError } = await supabase
      .from('gas_stations')
      .select('images')
      .eq('id', props.id)
      .single();

    if (fetchError) {
      throw new Error(`Erro ao buscar posto: ${fetchError.message}`);
    }

    // Deletar imagens do storage se existirem
    if (gasStation?.images && gasStation.images.length > 0) {
      const imagePaths = gasStation.images.map(url => {
        // Extrair o caminho da URL pública
        const urlObj = new URL(url);
        return urlObj.pathname.replace('/storage/v1/object/public/gas-station-images/', '');
      });

      const { error: storageError } = await supabase.storage
        .from('gas-station-images')
        .remove(imagePaths);

      if (storageError) {
        console.warn('Erro ao deletar imagens do storage:', storageError.message);
      }
    }

    // Deletar o posto da tabela
    const { error } = await supabase
      .from('gas_stations')
      .delete()
      .eq('id', props.id);

    if (error) {
      throw new Error(`Erro ao deletar posto: ${error.message}`);
    }

    return null;
  } catch (error) {
    console.error("Erro ao deletar posto:", error);
    throw new Error(error instanceof Error ? error.message : "Erro desconhecido");
  }
}
