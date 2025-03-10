import { httpClient } from "@/infra/httpClient";

export namespace EditResource {
  export type Input = {
    id: string;
    title: string;
    category: string;
    image?: File;
  };

  export type Output = {
    status: string;
    imageUrl?: string;
  };
}

export async function EditResource(input: EditResource.Input): Promise<{
  error: string | null;
  data: EditResource.Output | null;
}> {
  const { title, category, image } = input;

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (image) {
      formData.append("file", image);
    }

    const response = await httpClient.put(`/resource/${input.id}`, formData);

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Erro ao editar um recurso:", error);
    return { error: "Erro na requisição à API", data: null };
  }
}