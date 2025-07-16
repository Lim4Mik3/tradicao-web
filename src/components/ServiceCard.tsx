import { cn } from "@/lib/utils"
import { useId } from "react"
import { ResourceModel } from "@/models/Resource"

type ServiceCardProps = {
  resource: ResourceModel
  isSelected: boolean
  onToggle: () => void
}

export function ServiceCard({ resource, isSelected, onToggle }: ServiceCardProps) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={cn("relative bg-slate-50 rounded-2xl flex flex-col hover:opacity-90 transition-all cursor-pointer border border-slate-100 w-[180px] aspect-square", {
          "opacity-100 border-red-600/40 bg-red-50": isSelected
        })}
    >
      <input id={id} type="checkbox" className="peer hidden" checked={isSelected} onChange={onToggle} />

      <div className="flex-1 p-6 relative">
        <img
          alt={resource.title}
          className="w-8 h-8 object-cover rounded-md opacity-90"
          src={resource.image || '/placeholder.png'}
        />

        <div className="absolute top-6 right-6">
          <div
            className={`
            w-5 h-5 rounded-md border transition-colors
            ${isSelected ? "bg-red-500 border-red-500" : "bg-white border-slate-200"}
          `}
          >
            {isSelected && (
              <svg viewBox="0 0 14 14" fill="none" className="w-full h-full text-white p-[2px]">
                <path
                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <h3 className="text-[#1B2B4D] text-xl font-medium leading-tight">{resource.title}</h3>
      </div>
    </label>
  )
}

