import { httpClient } from "@/infra/httpClient";

export namespace GetGasStation {
  export type Input = { };

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
      apps: string[];
      services: string[];
      brands: string[];
      conveniences: string[];
      oilChanges: string[];
      manager: string;
      images: string[];
      createdAt: string;
      updatedAt: string;
    }>;
  };
}

export async function GetGasStation(): Promise<GetGasStation.Output> {
  try {
    const response = await httpClient.get<GetGasStation.Output>('/gas-station');
    
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar postos:", error);
    return { error: "Erro na requisição à API", data: null } as any; // Type assertion temporária para erro
  }
}