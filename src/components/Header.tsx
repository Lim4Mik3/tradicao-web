import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { useLocation } from "react-router-dom"

type Values<T extends Record<string, string>> = {
  [K in T[keyof T]]: string;
};


type PrivateRoutesPath = Omit<
  Values<typeof ROUTES_NAME>,
  | "/login"
  | "/confirm-login"
  | "/backoffice"
>;

type HeaderTitleMap = Record<keyof PrivateRoutesPath, string>;

const HEADER_TITLE_MAP: HeaderTitleMap = {
  '/backoffice/dashboard': 'Dashboard',
  '/backoffice/gas-stations': 'Postos de Gasolina',
  '/backoffice/services': 'Serviços',
  '/backoffice/users': "Usuários",
  '/backoffice/website': 'Website'
}

export function Header() {
  const pathname = useLocation().pathname as keyof PrivateRoutesPath;

  return (
    <header
      className="max-h-[80px] h-full bg-zinc-100 py-4 flex items-center border-b border-zinc-300 px-10"
    >
      <span
        className="text-zinc-950 font-medium text-2xl tracking-wide"
      >
        {HEADER_TITLE_MAP[pathname]}
      </span>
    </header>
  )
}