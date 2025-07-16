import { Menu } from "@/components/Menu/Menu";
import { LogoutButton } from "@/components/LogoutButton";
import { useAuth } from "@/hooks/useAuth";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function PrivateLayout({ children, className }: Props) {
  const { user } = useAuth();

  return (
    <main className={cn("h-screen w-screen bg-zinc-200 flex overflow-hidden", className)}>
      <Menu />
      <div
        className="flex items-stretch flex-col max-h-[100vh] h-full w-full"
      >
        <div className="bg-white border-b border-gray-200 px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
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
          
          <LogoutButton className="text-sm py-1 px-3" />
        </div>
        
        <div
          className="py-4 h-full w-full max-w-[90%] mx-auto overflow-hidden"
        >
          {children}
        </div>
      </div>
    </main>
  )
}