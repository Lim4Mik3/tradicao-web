import { httpClient } from "@/infra/httpClient";

export namespace GetResources {
  export type Output = {
    resources: Array<{
      id: string;
      title: string;
      category: string;
      image?: string;
      createdAt: string;
      updatedAt: string;
    }>;
    total: number;
    pages: number;
  };
}

export async function GetResources(category?: string): Promise<{
  error: string | null;
  data: GetResources.Output | null;
}> {
  try {
    const response = await httpClient.get('/resource', {
      params: { category, page: 1, limit: 10 },
    });

    return {
      error: null,
      data: response.data,
    };
  } catch (error) {
    console.error("error", error);
    return { error: "Erro na requisição à API", data: null };
  }
}