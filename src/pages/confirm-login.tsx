import { FakeDash } from '@/components/FakeDash';
import { Slot } from '@/components/Slot';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { OTPInput } from 'input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RootLayout } from '../Layouts/root';

const schema = z.object({
  code: z.string().email('E-mail inválido').nonempty('O E-mail é obrigatório'),
});

type LoginFormValues = z.infer<typeof schema>;

export function ConfirmLogin() {
  const { handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const handleLogin = async () => {};

  return (
    <RootLayout className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex items-center flex-col bg-white w-[420px] rounded-md p-4"
      >
        <img className="h-16" src="/logo.png" alt="Rede Tradicao" />

        <h1 className="text-zinc-700 font-semibold text-lg tracking-tighter leading-3.5 my-10">
          Informe seu e-mail para entrar na plataforma.
        </h1>

        <OTPInput
          maxLength={6}
          containerClassName="group flex items-center has-[:disabled]:opacity-30"
          render={({ slots }) => (
            <>
              <div className="flex">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>

              <FakeDash />

              <div className="flex">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />
        {/* { errors.email && (
          <p className="text-xs text-red-400 font-semibold mt-1 self-start">{errors.email.message}</p>
        )} */}

        <Button type="submit" className="w-full mt-4">
          Login
        </Button>
      </form>
    </RootLayout>
  );
}
