import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = ComponentProps<'button'> & {
  loading?: boolean;
};

export function Button({ 
  children, 
  loading = false, 
  className, 
  ...rest 
}: Props) {
  return (
    <button 
      className={cn("px-5 py-4 bg-red-400 rounded-lg text-base hover:cursor-pointer hover:brightness-90 transition-all font-semibold h-[55px]", className, {
        "opacity-50 hover:cursor-not-allowed": loading && !rest.disabled,
        "opacity-50 pointer-events-none select-none": rest.disabled
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