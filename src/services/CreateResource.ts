import { httpClient } from "@/infra/httpClient";

export namespace CreateResource {
  export type Input = {
    title: string;
    category: string;
    image?: string;
  };

  export type Output = {};
}

export async function CreateResource(input: CreateResource.Input): Promise<{
  error: string | null;
  data: CreateResource.Output | null;
}> {
  const { title, category, image } = input;

  try {
    const response = await httpClient.post('/resources/create', {
      title,
      category,
      image
    }, { headers: { 'protected': true } });

    return response.data;
  } catch (error) {
    // Tratamento de erros de rede ou outros
    console.error("Erro ao criar um recurso:", error);
    return { error: "Erro na requisição à API", data: null };
  }
}