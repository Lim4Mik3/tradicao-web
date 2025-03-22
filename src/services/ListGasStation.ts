import { httpClient } from "@/infra/httpClient";

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
      apps: Array<{
        _id: string;
        title: string;
        category: string;
        image: string;
        createdAt: string;
        updatedAt: string;
      }>;
      services: Array<{
        _id: string;
        title: string;
        category: string;
        image: string;
        createdAt: string;
        updatedAt: string;
      }>;
      brands: Array<{
        _id: string;
        title: string;
        category: string;
        image: string;
        createdAt: string;
        updatedAt: string;
      }>;
      conveniences: Array<{
        _id: string;
        title: string;
        category: string;
        image: string;
        createdAt: string;
        updatedAt: string;
      }>;
      oilChanges: Array<{
        _id: string;
        title: string;
        category: string;
        image: string;
        createdAt: string;
        updatedAt: string;
      }>;
      manager: string;
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
  try {
    const { term, page = 1, limit = 15 } = input;

    const queryParams = new URLSearchParams();

    if (term) queryParams.append("term", term);
    
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const response = await httpClient.get<GetGasStation.Output>(
      `/admin/gas-station?${queryParams.toString()}`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar postos:", error);
    throw new Error("Erro na requisição à API");
  }
}