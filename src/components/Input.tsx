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
      className={cn("px-3 py-2 bg-white borde-2 border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900", className, { 
        "border-red-400 focus:border-red-400 ": hasError 
      })}
      {...rest}
    />
  )
})

Input.displayName = "Input"

