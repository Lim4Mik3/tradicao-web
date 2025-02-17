import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RootLayout } from "../Layouts/root";

const schema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O E-mail é obrigatório")
})

type LoginFormValues = z.infer<typeof schema>;


export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(schema)
  });

  const handleLogin = async () => {
    try {
      // const result = await MakeLogin({ email: params.email });

    } catch (error) {

    }
  }

  return (
    <RootLayout
      className="flex items-center justify-center"
    >

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex items-center flex-col bg-white w-[420px] rounded-md p-4"
      >
        <img
          className="h-16"
          src="/logo.png"
          alt="Rede Tradicao"
        />

        <h1
          className="text-zinc-700 font-semibold text-lg tracking-tighter leading-3.5 my-10"
        >
          Informe seu e-mail para entrar na plataforma.
        </h1>

        <Input
          {...register('email')}
          hasError={!!errors.email}
          autoComplete="off"
          placeholder="seu-email@redetradicao.com.br"
          className="w-full"
        />
        {errors.email && (
          <p className="text-xs text-red-400 font-semibold mt-1 self-start">{errors.email.message}</p>
        )}

        <Button
          type="submit"
          className="w-full mt-4"
        >
          Login
        </Button>
      </form>
    </RootLayout>
  )
}