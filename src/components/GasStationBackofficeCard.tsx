import { PencilLine, Trash } from "lucide-react";

export function GasStationBackofficeCard() {
  return (
    <div
      className="max-w-[16rem] w-full rounded-xl border border-zinc-200"
    >
      <header
        className="relative"
      >
        <img 
          alt="Posto" 
          className="object-cover rounded-t-xl h-[11rem] w-full"
          src="https://www.redetradicao.com.br/restrito/upload/fotos_unidades/2_1.png" 
        />

        <div
          className="absolute right-4 top-4 flex items-center justify-center gap-0.5"
        >
          <button
            data-tooltip="Editar"
            className="bg-white p-2 rounded-l-xl border-2 border-zinc-200 hover:brightness-90 hover:cursor-pointer transition-all"
          >
            <PencilLine 
              size={24}
              className="text-zinc-500"
            />
          </button>

          <button
            data-tooltip="Excluir"
            className="bg-white p-2 rounded-r-xl border-2 border-zinc-200 hover:brightness-90 hover:cursor-pointer transition-all"
          >
            <Trash
              size={24}
              className="text-zinc-500"
            />
          </button>
        </div>
      </header>
      <div
        className="px-4 py-6 bg-white text-zinc-900 rounded-b-xl"
      >
        <h3
          className="font-semibold text-lg"
        >
          Centro da Cidade
        </h3>
        <span
          className="text-sm text-zinc-500"
        >
          Av. Sao Carlos, 200
        </span>
      </div>
    </div>
  )
}