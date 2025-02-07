import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function AppLayout({ children, className }: Props) {
  return (
    <main className={cn(" antialiased snap-none h-screen", className)}>
      <Header />
      {children}
      <Footer />
    </main>
  )
}