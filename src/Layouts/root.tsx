import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props =  {
  children: React.ReactNode;
} & ComponentProps<'main'>;

export function RootLayout({ children, className }: Props) {
  return (
    <main className={cn("h-screen", className)}>
      {children}
    </main>
  )
}