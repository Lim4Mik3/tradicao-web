import { Pencil } from "lucide-react"

interface EditButtonProps {
  onClick?: () => void
}

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <button className="text-gray-600 hover:text-gray-600 duration-300 hover:cursor-pointer py-2 px-4 rounded-lg hover:bg-black/20 transition-all" onClick={onClick}>
      <span className="flex items-center gap-2">
        <Pencil size={16} />
        <span>Editar</span>
      </span>
    </button>
  )
}

