import { Fuel } from "lucide-react";
import { Button } from "./Button";

export function FuelsCard() {
  return (
    <div
      className="h-full flex flex-col items-end p-8 border-l border-zinc-300"
    >
      <span
        className="flex items-center gap-4 text-2xl text-zinc-900 self-start"
      >
        <Fuel size={28} className="text-current" /> Unidades
      </span>

      <div
        className="flex flex-col items-end justify-between h-full mb-10"
      >
        <p
          className="text-3xl font-semibold mt-10 text-zinc-800"
        >
          Unidades ativas:
        </p>

        <span
          className="text-7xl text-zinc-900"
        >
          62
        </span>

        <Button>
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}