import { Menu } from "@/components/Menu/Menu";
import { LogoutButton } from "@/components/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function PrivateLayout({ children, className }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <main className={cn("h-screen w-screen bg-zinc-200 flex overflow-hidden", className)}>
      <div
        className="flex items-stretch flex-col max-h-[100vh] h-full w-full"
      >
        <div className=" border-b border-gray-200 px-4 py-4 grid grid-cols-3 place-items-center bg-white">
          <div className="flex items-center justify-center gap-3 mr-auto">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {user?.email}
              </p>
              <p className="text-xs text-gray-500">
                Administrador
              </p>
            </div>
          </div>

          <div className="text-black">
            {/* <Link
              to={ROUTES_NAME.DASHBOARD}
              className={cn(
                "px-3 py-2 rounded text-sm font-medium transition-colors",
                location.pathname === ROUTES_NAME.DASHBOARD
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Dashboard
            </Link> */}
            <Link
              to={ROUTES_NAME.GAS_STATIONS}
              className={cn(
                "px-3 py-2 rounded text-sm font-medium transition-colors",
                location.pathname === ROUTES_NAME.GAS_STATIONS
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Postos
            </Link>
            <Link
              to={ROUTES_NAME.RESOURCES}
              className={cn(
                "px-3 py-2 rounded text-sm font-medium transition-colors",
                location.pathname === ROUTES_NAME.RESOURCES
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              Recursos
            </Link>
            
          </div>

          <LogoutButton className="text-sm py-1 px-3 ml-auto" />
        </div>
        
        <div
          className="py-10 px-1 h-full w-full max-w-[60vw] mx-auto overflow-hidden"
        >
          {children}
        </div>
      </div>
    </main>
  )
}