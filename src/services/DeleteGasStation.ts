import { httpClient } from "@/infra/httpClient";

export namespace DeleteGasStation {
  export type Input = {
    id: string;
  };

  export type Output = null;
}

export async function DeleteGasStation(
  props: DeleteGasStation.Input
) {
  try {
    await httpClient.delete(`/admin/gas-station/${props.id}`);

    return null;
  } catch (error) {
    console.error("erro", error);
  }
}