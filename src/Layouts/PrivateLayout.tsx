import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu/Menu";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function PrivateLayout({ children, className }: Props) {

  return (
    <main className={cn("h-screen w-screen bg-zinc-200 flex overflow-hidden", className)}>
      <Menu />
      <div
        className="flex items-stretch flex-col max-h-[100vh] h-full w-full"
      >
        <Header />
        <div
          className="py-4 h-full w-full bg-purple-500 max-w-[90%] mx-auto overflow-hidden"
        >
          {children}
        </div>
      </div>
    </main>
  )
}