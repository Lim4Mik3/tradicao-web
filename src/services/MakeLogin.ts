import { signInWithPassword, AuthService } from "@/services/AuthService";

export namespace MakeLogin {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = AuthService.AuthResponse;
}

/**
 * Função de login integrada com Supabase
 * @deprecated Use diretamente o AuthService.signInWithPassword ou o hook useAuth
 */
export async function MakeLogin(props: MakeLogin.Input): Promise<MakeLogin.Output> {
  try {
    const result = await signInWithPassword({
      email: props.email,
      password: props.password,
    });

    return result;
  } catch (error) {
    return {
      success: false,
      error: "Erro inesperado ao fazer login",
    };
  }
}