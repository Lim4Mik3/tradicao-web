import { Button } from "@/components/Button";
import { RootLayout } from "../Layouts/root";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O E-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("A senha é obrigatória")
})

type LoginFormValues = z.infer<typeof schema>;


export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isAuthenticated, loading: authLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);

  // Pega a rota de onde o usuário veio (se foi redirecionado de uma rota protegida)
  const from = location.state?.from || '/dashboard';

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(schema)
  });

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async ({ email, password }: LoginFormValues) => {
    try {
      setLoginError(null);
      
      const result = await signIn(email, password);

      if (result.success) {
        // Redireciona para a rota que o usuário estava tentando acessar
        navigate(from, { replace: true });
      } else {
        setLoginError(result.error || 'Erro ao fazer login. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      setLoginError('Algum erro inesperado aconteceu, tente novamente mais tarde.');
    }
  }

  // Mostra loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <RootLayout className="w-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout
      className="w-screen grid grid-cols-2"
    >
      <img
        src="/posto-lp.jpeg"
        className="overlay-bg-login w-full object-cover h-screen object-left"
      />

      <section
        className="max-w-[420px] flex items-center justify-center flex-col w-full mx-auto"
      >
        <img 
          className="h-16 mb-10"
          src="/logo.png" 
          alt="Rede Tradicao" 
        />

        <h1
          className="text-zinc-700 font-semibold text-2xl tracking-tighter leading-3.5 mt-10 self-start"
        >
          Fazer login.
        </h1>
        <p
          className="text-md text-gray-500 self-start mt-4 mb-10"
        >
          Informe seu email e acesse a plataforma.
        </p>

        
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full flex items-center flex-col rounded-md"
      >
        <Input
          {...register('email')} 
          hasError={errors.email?.message}
          autoComplete="email"
          placeholder="email@redetradicao.com.br" 
          className="w-full"
        />
        {errors.email && (
          <p className="text-xs text-red-400 font-semibold mt-1 self-start">{errors.email.message}</p>
        )}

        <Input
          {...register('password')} 
          type="password"
          hasError={errors.password?.message}
          autoComplete="current-password"
          placeholder="Sua senha" 
          className="w-full mt-4"
        />
        {errors.password && (
          <p className="text-xs text-red-400 font-semibold mt-1 self-start">{errors.password.message}</p>
        )}

        {loginError && (
          <div className="w-full mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{loginError}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full mt-6"
          loading={isSubmitting}
        >
          Acessar
        </Button>
      </form>

      <div className="w-full mt-6 text-center">
        <Link 
          to="/signup" 
          className="text-sm text-blue-600 hover:text-blue-500 font-medium block mb-3"
        >
          Não tem uma conta? Cadastre-se aqui
        </Link>
        
        <Link 
          to="/forgot-password" 
          className="text-sm text-gray-600 hover:text-gray-500 font-medium"
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <div
        className="flex items-center gap-5 mt-14 w-8 h-8 self-start"
      >
        <img src="alert.svg" />
        <p
          className="text-[#ed394e] text-sm tracking-wide"
        >Acesso restrito à administradores.</p>
      </div>

      </section>
    </RootLayout>
  )
}