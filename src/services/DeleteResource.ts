import { httpClient } from "@/infra/httpClient";

export namespace DeleteResource {
  export type Input = {
    resourceId: string;
  };

  export type Output = {};
}

export async function DeleteResource(input: DeleteResource.Input): Promise<{
  error: string | null;
  data: DeleteResource.Output | null;
}> {
  const { resourceId } = input;

  try {
    const response = await httpClient.delete(`/resource/${resourceId}`);

    return response.data;
  } catch (error) {
    return { error: "Erro na requisição à API", data: null };
  }
}