import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu/Menu";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function PrivateLayout({ children, className }: Props) {
  return (
    <main className={cn("h-screen w-screen bg-zinc-200 flex", className)}>
      <Menu />
      <div
        className="flex items-stretch flex-col h-full w-full"
      >
        <Header />
        {children}
      </div>
    </main>
  )
}