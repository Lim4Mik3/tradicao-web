import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<'button'> & {
  loading?: boolean;
  variant?: "neutral";
};

export function Button({ 
  children, 
  loading = false,
  variant,
  className, 
  ...rest 
}: Props) {
  return (
    <button 
      className={cn("px-5 py-4 bg-red-400 shadow-black text-slate-100 rounded-lg text-base hover:cursor-pointer hover:brightness-90 transition-all font-semibold", className, {
        "bg-slate-200 border border-gray-500 text-gray-950": variant === "neutral",
        "opacity-50 hover:cursor-not-allowed": loading && !rest.disabled,
        "opacity-50 pointer-events-none select-none": rest.disabled,
      })}
      {...rest}
    >
      {
        loading && !rest.disabled
          ? <div className="loader mx-auto" />
          : children
      }
    </button>
  )
}