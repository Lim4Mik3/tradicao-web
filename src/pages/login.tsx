import { Button } from "@/components/Button";
import { RootLayout } from "../Layouts/root";
import { Input } from "@/components/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MakeLogin } from "@/services/MakeLogin";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "@/constants/LOCAL_STORAGE_KEYS";

const schema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O E-mail é obrigatório")
})

type LoginFormValues = z.infer<typeof schema>;


export function LoginPage() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(schema)
  });

  const handleLogin = async ({ email }: LoginFormValues) => {
    try {
      const result = await MakeLogin({ email }) as Record<string, unknown>;

      if (result.status === 200) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.REQUEST_LOGIN, JSON.stringify({
          email,
        }))

        navigate('/confirm-login')
      }
    } catch (error) {
      console.error(error)
      alert("Algum erro inesperado aconteceu, tente novamente mais tarde.")
    }
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
          autoComplete="off"
          placeholder="email@redetradicao.com.br" 
          className="w-full"
        />
        { errors.email && (
          <p className="text-xs text-red-400 font-semibold mt-1 self-start">{errors.email.message}</p>
        )}

        <Button
          type="submit"
          className="w-full mt-4"
          loading={isSubmitting}
        >
          Acessar
        </Button>
      </form>

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