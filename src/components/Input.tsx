import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef } from "react"

type InputProps = ComponentProps<"input"> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  className, 
  hasError, 
  ...rest 
}, ref) => {
  return (
    <input
      ref={ref}
      className={cn("px-5 py-4 bg-white borde-2 border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-900", className, { 
        "border-2 border-red-400 focus:ring-transparent": hasError 
      })}
      {...rest}
    />
  )
})

Input.displayName = "Input"

