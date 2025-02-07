import { httpClient } from "@/infra/httpClient";

export namespace MakeLogin {
  export type Input = {
    email: string;
  };

  export type Output = unknown;
}

export async function MakeLogin(props: MakeLogin.Input): Promise<MakeLogin.Output> {
  try {
    const response = await httpClient.post('/login', { email: props.email });

    if (response.status !== 200) throw new Error();

    return response.data;
  } catch (error) {
    console.error("erro", error);
  }
}