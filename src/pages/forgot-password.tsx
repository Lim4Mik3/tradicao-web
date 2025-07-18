import { Button } from "@/components/Button";
import { RootLayout } from "../Layouts/root";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "@/services/AuthService";

const schema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O E-mail é obrigatório")
});

type ForgotPasswordFormValues = z.infer<typeof schema>;

export function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(schema)
  });

  const handleForgotPassword = async ({ email }: ForgotPasswordFormValues) => {
    try {
      setError(null);
      
      const result = await resetPassword(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Erro ao enviar email de recuperação');
      }
    } catch (error) {
      setError('Algum erro inesperado aconteceu, tente novamente mais tarde.');
    }
  };

  if (success) {
    return (
      <RootLayout className="w-screen grid grid-cols-2">
        <img
          src="/posto-lp.jpeg"
          className="overlay-bg-login w-full object-cover h-screen object-left"
        />

        <section className="max-w-[420px] flex items-center justify-center flex-col w-full mx-auto">
          <img 
            className="h-16 mb-10"
            src="/logo.png" 
            alt="Rede Tradicao" 
          />

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-zinc-700 font-semibold text-2xl tracking-tighter leading-tight mb-4">
              Email enviado!
            </h1>
            
            <p className="text-md text-gray-500 mb-8">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
            
            <Link 
              to="/login" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
            >
              Voltar ao login
            </Link>
          </div>
        </section>
      </RootLayout>
    );
  }

  return (
    <RootLayout className="w-screen grid grid-cols-2">
      <img
        src="/posto-lp.jpeg"
        className="overlay-bg-login w-full object-cover h-screen object-left"
      />

      <section className="max-w-[420px] flex items-center justify-center flex-col w-full mx-auto">
        <img 
          className="h-16 mb-10"
          src="/logo.png" 
          alt="Rede Tradicao" 
        />

        <h1 className="text-zinc-700 font-semibold text-2xl tracking-tighter leading-3.5 mt-10 self-start">
          Recuperar senha
        </h1>
        
        <p className="text-md text-gray-500 self-start mt-4 mb-10">
          Informe seu email e enviaremos instruções para redefinir sua senha.
        </p>

        <form
          onSubmit={handleSubmit(handleForgotPassword)}
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

          {error && (
            <div className="w-full mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-6"
            loading={isSubmitting}
          >
            Enviar instruções
          </Button>
        </form>

        <div className="w-full mt-6 text-center">
          <Link 
            to="/login" 
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Voltar ao login
          </Link>
        </div>

        <div className="flex items-center gap-5 mt-14 w-8 h-8 self-start">
          <img src="alert.svg" />
          <p className="text-[#ed394e] text-sm tracking-wide">
            Acesso restrito à administradores.
          </p>
        </div>
      </section>
    </RootLayout>
  );
}
