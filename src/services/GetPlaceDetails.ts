import { httpClient } from "@/infra/httpClient";

export namespace GetPlaceDetails {
  export type Input = {
    placeId: string;
  };

  export type Output = {
    placeId: string;
    formatted: string;
    route: string;
    street_number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    coordinates: [number, number];
  };
}

export async function GetPlaceDetails(
  input: GetPlaceDetails.Input
): Promise<GetPlaceDetails.Output> {
  try {
    const response = await httpClient.get<GetPlaceDetails.Output>(
      `/address/details?placeId=${input.placeId}`
    );

    return response.data;
  } catch (error) {
    throw new Error("Erro na requisição à API de endereços");
  }
}
