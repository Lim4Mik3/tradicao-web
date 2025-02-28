import { cn } from "@/lib/utils";
import { type ComponentProps, forwardRef } from "react"

type InputProps = ComponentProps<"input"> & {
  hasError?: boolean;
  isLoading?: boolean;
  title?: string;
  variant?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  className, 
  isLoading,
  hasError, 
  variant,
  title,
  ...rest 
}, ref) => {
  return (
    <div className="flex flex-col w-full">
      { title && (
        <span
          className={cn("text-sm font-semibold text-gray-600 mb-1", {
            "text-zinc-950": variant
          })}
        >
          {title}
        </span>
      )}
      <div
        className={cn("flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-200 rounded-md shadow-sm has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-red-300 gap-4", className, {
          "border-2 border-red-400 has-[:focus]:ring-transparent": hasError,
          "pointer-events-none opacity-70 select-none": isLoading
        })}
      >
        <input
          ref={ref}
          className={cn("placeholder:text-gray-400 w-full outline-0 text-gray-900", {
            "pointer-events-none opacity-70 select-none": isLoading
          })}
          {...rest}
        />

        { isLoading && (<div style={{ "--color": "red" }} className="loader" />) }
      </div>
    </div>
  )
})

Input.displayName = "Input"

