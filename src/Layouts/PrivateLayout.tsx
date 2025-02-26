import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu/Menu";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ComponentProps } from "react";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

const client = new QueryClient()

export function PrivateLayout({ children, className }: Props) {

  return (
    <main className={cn("h-screen w-screen bg-zinc-200 flex", className)}>
      <QueryClientProvider client={client}>
        <Menu />
        <div
          className="flex items-stretch flex-col max-h-[100vh] h-full w-full"
        >
          <Header />
          <div
            className="py-16 pl-20 h-full w-full max-w-[90%] mx-auto overflow-hidden"
          >
            {children}
          </div>
        </div>
      </QueryClientProvider>
    </main>
  )
}