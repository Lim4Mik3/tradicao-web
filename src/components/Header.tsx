import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom"
import { CreateGasStationHeader } from "./CreateGasStationHeader";

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
  '/backoffice/services': (
    <span className="text-zinc-950 font-medium text-2xl tracking-wide">
      Serviços
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
  '/backoffice/gas-stations/create': <CreateGasStationHeader />
}

export function Header() {
  const pathname = useLocation().pathname as keyof PrivateRoutesPath;

  return (
    <header
      className="max-h-[80px] h-full bg-zinc-100 py-4 flex items-center border-b border-zinc-300 px-10"
    >
      {HEADER_TITLE_MAP[pathname]}
    </header>
  )
}