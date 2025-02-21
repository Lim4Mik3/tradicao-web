import { useLocation } from "react-router-dom"

const HEADER_TITLE_MAP = {
  '/dashboard': "Dashboard",
  '/website': "Website",
  '/gas-stations': "Unidades Postos",
  '/services': "Serviços",
  '/Jobs': "Vagas"
}

export function Header() {
  const pathname = useLocation().pathname as keyof typeof HEADER_TITLE_MAP;

  return (
    <header
      className="h-[80px] bg-zinc-100 py-4 px-10 flex items-center border-b border-zinc-300"
    >
      <span
        className="text-zinc-950 font-medium text-2xl tracking-wide"
      >
        {HEADER_TITLE_MAP[pathname]}
      </span>
    </header>
  )
}