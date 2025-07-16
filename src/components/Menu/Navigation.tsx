import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { cn } from "@/lib/utils";
import { Component, Fuel, LayoutDashboard, Monitor, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <nav
      className="flex flex-col justify-center gap-4 p-6 my-auto"
    >
      <button data-tooltip="Dashboard" className={cn("hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-600 transition-all text-zinc-700", {
        "text-red-500 bg-red-800/10": pathname.startsWith(ROUTES_NAME.DASHBOARD)
      })}
        onClick={() => navigate(ROUTES_NAME.DASHBOARD)}
      >
        <LayoutDashboard 
          size={26}
          className="hover:brightness-75 transition-all text-current"
        />
      </button>

      {/* <button data-tooltip="Website" className={cn("hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-600 transition-all text-zinc-700", {
        "text-red-500 bg-red-800/10": pathname.startsWith(ROUTES_NAME.WEBSITE)
      })}
        onClick={() => navigate(ROUTES_NAME.WEBSITE)}
      >
        <Monitor size={26} className="hover:brightness-75 text-current" />
      </button> */}

      <button data-tooltip="Unidades" className={cn("hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-600 transition-all text-zinc-700", {
        "text-red-500 bg-red-800/10": pathname.startsWith(ROUTES_NAME.GAS_STATIONS)
      })}
        onClick={() => navigate(ROUTES_NAME.GAS_STATIONS)}
      >
        <Fuel size={26} className="hover:brightness-75 text-current" />
      </button>

      <button data-tooltip="Recursos" className={cn("hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-600 transition-all text-zinc-900", {
        "text-red-500 bg-red-800/10": pathname.startsWith(ROUTES_NAME.RESOURCES)
      })}
        onClick={() => navigate(ROUTES_NAME.RESOURCES)}
      >
        <Component size={26} className="hover:brightness-75 text-current" />
      </button>
{/* 
      <button data-tooltip="Vagas" className={cn("hover:brightness-110 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 hover:text-red-600 transition-all text-zinc-900", {
        "text-red-500 bg-red-800/10": pathname.startsWith(ROUTES_NAME.USERS)
      })}
        onClick={() => navigate(ROUTES_NAME.USERS)}
      >
        <UsersRound size={26} className="hover:brightness-75 text-current" />
      </button> */}
    </nav>
  )
}