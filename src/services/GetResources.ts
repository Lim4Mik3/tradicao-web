import { httpClient } from "@/infra/httpClient";

export namespace GetResources {
  export type Output = {};
}

export async function GetResources(): Promise<{
  error: string | null;
  data: [] | null;
}> {
  try {
    const response = await httpClient.get('/resource');

    return {
      error: null,
      data: response.data.resources,
    };
  } catch (error) {
    console.error("error", error);
    return { error: "Erro na requisição à API", data: null };
  }
}