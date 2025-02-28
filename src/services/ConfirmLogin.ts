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
    const response = await httpClient.post('/verify-login', { 
      email: props.email,
      code: props.code,
    });

    if (response.status !== 200) throw new Error();

    return response;
  } catch (error) {
    console.error("erro", error);
  }
}