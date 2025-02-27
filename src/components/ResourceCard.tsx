import { Bolt, Pencil, Trash2 } from "lucide-react"

const CATEGORY_MAP = {
  "SERVICES": "Serviços",
  "APPS": "Aplicativos",
  "BRANDS": "Marcas",
  "CONVINIENCES": "Conveniência",
  "CHANGE_OIL": "Troca de Óleo"
}

export default function ResourceCard({ resource }: { resource: any }) {
  return (
    <div className="max-w-[260px] w-full bg-white rounded-3xl shadow-sm h-fit">
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
          {
            resource.image
              ? (
                <img src={resource.image} alt={resource.title} className="w-10 h-10" />
              )
              : (
                <Bolt className="w-8 h-8 text-red-500 stroke-2" />
              )
          }
        </div>

        <h2 className="text-2xl text-left font-bold text-slate-800 mb-1">
          {resource.title}
        </h2>

        <span className="text-zinc-700">{CATEGORY_MAP[resource.category]}</span>
      </div>
    </div>
  )
}

