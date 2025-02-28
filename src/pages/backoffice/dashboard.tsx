import { FuelsCard } from "@/components/FuelsCard";
import { JobsCard } from "@/components/JobsCard";
import { WebsiteStaticsCard } from "@/components/WebsiteStaticsCard";
import { PrivateLayout } from "@/Layouts/PrivateLayout";

export function DashboardPage() {
  return (
    <PrivateLayout>
      <h1
        className="text-4xl text-zinc-900 font-light"
      >
        <b className="font-semibold">Bem vindo</b>, Leonardo Oliveira
      </h1>
      <span
        className="text-sm text-zinc-600 mt-1 inline-block mr-1"
      >
        Você é um
      </span>
      <span className="inline-block px-2 py-1 text-zinc-900 tracking-wide text-xs rounded-full bg-green-300">ADMINISTRADOR</span>

      <div
        className="grid grid-cols-3 place-items-stretch gap-10 mt-16 h-[calc(100%-139px)]"
      >
        <WebsiteStaticsCard />

        <FuelsCard />

        <JobsCard />
      </div>
    </PrivateLayout>
  )
}