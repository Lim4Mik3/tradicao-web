import { Button } from "@/components/Button";
import { RootLayout } from "../Layouts/root";
import { OTPInput } from 'input-otp'
import { Slot } from "@/components/Slot";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { ConfirmLoginServiceService } from "@/services/ConfirmLogin";
import { LOCAL_STORAGE_KEYS } from "@/constants/LOCAL_STORAGE_KEYS";

export function ConfirmLoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email] = useState(() => {
    const initial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.REQUEST_LOGIN) || "{}").email

    if (!initial) redirect('/login');

    return initial;
  });
  const [code, setCode] = useState('');

  const handleConfirmLogin = async () => {
    setIsLoading(true);

    try {
      const result = await ConfirmLoginServiceService({
          code,
          email
      }) as Record<string, any>;

      if (result.status === 200) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.SESSION, JSON.stringify({
          token: result.data.token, 
        }))

        localStorage.removeItem(LOCAL_STORAGE_KEYS.REQUEST_LOGIN);
        
        navigate('/dashboard');
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
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
          className="text-zinc-700 font-semibold text-2xl tracking-tighter leading-3.5 mt-10 mb-6"
        >
          Confirme o Login
        </h1>
        <p
          className="text-md text-gray-500 text-center"
        >
          Enviamos o código de validação para seu e-mail cadastrado.
        </p>

        
      <form
        className="w-full flex items-center flex-col rounded-md"
      >
        <OTPInput
          autoFocus
          maxLength={6}
          containerClassName="group my-10 flex items-center has-[:disabled]:opacity-30"
          onChange={setCode}
          render={({ slots }) => (
            <>
              <div className="flex gap-1">
                {slots.slice(0, 3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
        
              <div className="mx-4 w-2 h-2 rounded-full bg-gray-900/40" />
        
              <div className="flex gap-1">
                {slots.slice(3).map((slot, idx) => (
                  <Slot key={idx} {...slot} />
                ))}
              </div>
            </>
          )}
        />

        <Button
          type="button"
          className="w-full mt-4"
          disabled={code.length < 6}
          loading={isLoading}
          onClick={handleConfirmLogin}
        >
          Confirmar Login
        </Button>
      </form>
      </section>
    </RootLayout>
  )
}