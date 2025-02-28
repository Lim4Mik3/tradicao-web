import { httpClient } from "@/infra/httpClient";

export namespace CreateResource {
  export type Input = {
    title: string;
    category: string;
    image?: File;
  };

  export type Output = {
    status: string;
    imageUrl?: string;
  };
}

export async function CreateResource(input: CreateResource.Input): Promise<{
  error: string | null;
  data: CreateResource.Output | null;
}> {
  const { title, category, image } = input;

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (image) {
      formData.append("file", image);
    }

    const response = await httpClient.post("/resource", formData, {
      headers: {
        "protected": true,
      },
    });

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Erro ao criar um recurso:", error);
    return { error: "Erro na requisição à API", data: null };
  }
}