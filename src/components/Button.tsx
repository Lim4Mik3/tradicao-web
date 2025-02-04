import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<'button'>;

export function Button({ children, className, ...rest }: Props) {
  return (
    <button 
      className={cn("px-4 py-2 bg-red-400 rounded-sm text-base hover:cursor-pointer hover:brightness-90 transition-al font-semibold", className)}
      {...rest}
    >
      {children}
    </button>
  )
}