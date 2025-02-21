import { cn } from "@/lib/utils";
import { Component, Fuel, LayoutDashboard, Monitor, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <nav
      className="flex flex-col justify-center gap-4"
    >
      <button data-tooltip="Dashboard" className={cn("hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-600 transition-all", {
        "text-red-500 bg-red-800/10": pathname === '/dashboard'
      })}
        onClick={() => navigate('/dashboard')}
      >
        <LayoutDashboard 
          size={26}
          className="hover:brightness-75 transition-all text-current"
        />
      </button>

      <button data-tooltip="Website" className="hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-400 text-gray-900/80 transition-all"
        onClick={() => navigate('/website')}
      >
        <Monitor size={26} className="hover:brightness-75 text-current" />
      </button>

      <button data-tooltip="Unidades" className="hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-400 text-gray-900/80 transition-all"
        onClick={() => navigate('/gas-stations')}
      >
        <Fuel size={26} className="hover:brightness-75 text-current" />
      </button>

      <button data-tooltip="Serviços" className="hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-400 text-gray-900/80 transition-all"
        onClick={() => navigate('/services')}
      >
        <Component size={26} className="hover:brightness-75 text-current" />
      </button>

      <button data-tooltip="Vagas" className="hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-400 text-gray-900/80 transition-all"
        onClick={() => navigate('/jobs')}
      >
        <UsersRound size={26} className="hover:brightness-75 text-current" />
      </button>
    </nav>
  )
}