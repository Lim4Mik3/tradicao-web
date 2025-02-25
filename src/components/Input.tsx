import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef } from "react"

type InputProps = ComponentProps<"input"> & {
  hasError?: boolean;
  title?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  className, 
  hasError, 
  title,
  ...rest 
}, ref) => {
  return (
    <div className="flex flex-col w-full">
      { title && (
        <span
          className="text-sm font-semibold text-gray-600 mb-1"
        >
          {title}
        </span>
      )}
      <input
        ref={ref}
        className={cn("px-5 py-4 bg-white border border-gray-200 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 text-gray-900", className, { 
          "border-2 border-red-400 focus:ring-transparent": hasError 
        })}
        {...rest}
      />
    </div>
  )
})

Input.displayName = "Input"

