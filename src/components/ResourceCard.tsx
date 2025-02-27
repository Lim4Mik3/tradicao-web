import { Calendar, Pencil, Trash2 } from "lucide-react"

export default function ResourceCard() {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-3xl shadow-sm">
      <div className="p-4 flex items-center justify-end border-b">
        <button className="p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer">
          <Pencil className="w-5 h-5 text-gray-500" />
        </button>

        <button className="p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer">
          <Trash2 className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <Calendar className="w-8 h-8 text-orange-500 stroke-2" />
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-1">
          Eventos
          <br />
          Organizados
        </h2>

        <span className="text-zinc-700">Categoria de Servicos</span>
      </div>
    </div>
  )
}

