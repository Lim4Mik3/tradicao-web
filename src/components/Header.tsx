import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom"
import { CreateGasStationHeader } from "./CreateGasStationHeader";
import { CreateResourceHeader } from "./CreateResourceHeader";
import { EditResourceHeader } from "./EditResourceHeader";

type Values<T extends Record<string, string>> = {
  [K in T[keyof T]]: string;
};


type PrivateRoutesPath = Omit<
  Values<typeof ROUTES_NAME>,
  | "/login"
  | "/confirm-login"
  | "/backoffice"
>;

type HeaderTitleMap = Record<keyof PrivateRoutesPath, ReactNode>;

const HEADER_TITLE_MAP: HeaderTitleMap = {
  '/backoffice/dashboard': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Dashboard
    </span>
  ),
  '/backoffice/gas-stations': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Postos de Gasolina
    </span>
  ),
  '/backoffice/resources': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Recursos
    </span>
  ),
  '/backoffice/users': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Usuários
    </span>
  ),
  '/backoffice/website': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Website
    </span>
  ),
  '/backoffice/profile': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Perfil
    </span>
  ),
  '/backoffice/gas-stations/create': <CreateGasStationHeader />,
  '/backoffice/resources/create': <CreateResourceHeader />,
  '/backoffice/resources/edit/:id': <EditResourceHeader />
}

export function Header() {
  const pathname = useLocation().pathname as keyof PrivateRoutesPath;
  let headerChildren: ReactNode = null;

  Object.entries(HEADER_TITLE_MAP).forEach(([key, value]) => {
    if (key.includes(":")) {
      if (pathname.startsWith(key.slice(0, key.indexOf(":")))) {
        headerChildren = value;
      }
    } else {
      if (key === pathname) {
        headerChildren = value;
      }
    }
  })

  return (
    <header
      className="max-h-[80px] h-full bg-zinc-100 py-4 flex items-center border-b border-zinc-300 px-10"
    >
      {headerChildren}
    </header>
  )
}