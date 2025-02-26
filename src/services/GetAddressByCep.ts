import { httpClient } from "@/infra/httpClient";

export namespace GetAddressByCep {
  export type Input = {
    cep: string;
  };

  export type Output = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    estado: string;
    ddd: string;
    siafi: string;
  };
}

export async function GetAddressByCep(input: GetAddressByCep.Input): Promise<{
  error: string | null;
  data: GetAddressByCep.Output | null;
}> {
  const { cep } = input;

  const cleanCep = cep.replace(/\D/g, "");
  
  if (cleanCep.length !== 8) {
    return { error: "CEP inválido (deve ter 8 dígitos)", data: null };
  }

  try {
    const response = await httpClient.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

    // Tratativas de status HTTP
    switch (response.status) {
      case 200:
        // Sucesso: verifica se o CEP existe
        if (response.data.erro) {
          return { error: "CEP não encontrado", data: null };
        }
        return {
          error: null,
          data: response.data as GetAddressByCep.Output,
        };
      case 400:
        return { error: "Requisição inválida (CEP mal formatado)", data: null };
      case 404:
        return { error: "Recurso não encontrado", data: null };
      case 429:
        return { error: "Limite de requisições excedido", data: null };
      case 500:
        return { error: "Erro interno no servidor da API", data: null };
      default:
        return { error: `Erro inesperado (status: ${response.status})`, data: null };
    }
  } catch (error) {
    // Tratamento de erros de rede ou outros
    console.error("Erro ao buscar endereço:", error);
    return { error: "Erro na requisição à API", data: null };
  }
}