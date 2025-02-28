import { Monitor } from "lucide-react";
import { Button } from "./Button";

export function WebsiteStaticsCard() {
  return (
    <div
      className="h-full flex flex-col items-end p-8 pl-0"
    >
      <span
        className="flex items-center gap-4 text-2xl text-zinc-900 self-start"
      >
        <Monitor size={28} className="text-current" /> Website
      </span>

      <div
        className="flex flex-col items-end justify-between h-full mb-10"
      >
        <p
          className="text-3xl font-semibold mt-10 text-zinc-800"
        >
          Total de acessos:
        </p>

        <span
          className="text-7xl text-zinc-900"
        >
          734
        </span>

        <Button>
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}