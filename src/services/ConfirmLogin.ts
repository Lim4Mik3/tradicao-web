import { httpClient } from "@/infra/httpClient";

export namespace ConfirmLoginService {
  export type Input = {
    email: string;
    code: string;
  };

  export type Output = unknown;
}

export async function ConfirmLoginServiceService(props: ConfirmLoginService.Input): Promise<ConfirmLoginService.Output> {
  try {
    const response = await httpClient.post('/auth/confirm-login', { 
      email: props.email,
      code: props.code,
    });

    if (response.status !== 200) throw new Error();

    return response;
  } catch (error) {
    // Removido console.error
  }
}