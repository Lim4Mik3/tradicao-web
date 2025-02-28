import type { ReactNode } from "react"

interface ProfileSectionProps {
  title: string
  children: ReactNode
  actionButton?: ReactNode
}

export default function ProfileSection({ title, children, actionButton }: ProfileSectionProps) {
  return (
    <div className="border rounded-lg border-gray-300 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-zinc-950">{title}</h3>
          {actionButton}  
        </div>
        {children}
      </div>
    </div>
  )
}

