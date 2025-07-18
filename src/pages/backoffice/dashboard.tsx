import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { WebsiteStaticsCard } from "@/components/WebsiteStaticsCard";
import { JobsCard } from "@/components/JobsCard";
import { GasStationBackofficeCard } from "@/components/GasStationBackofficeCard";
import { useListGasStation } from "@/hooks/useListGasStation";

export function DashboardPage() {
  // Exemplo de busca rápida dos postos para mostrar estatísticas
  const { data } = useListGasStation({ limit: 5 });
  const stations = data && data.pages.flatMap((page: any) => page?.stations) || [];

  return (
    <PrivateLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 h-[calc(100%-139px)]">
        <div className="flex flex-col gap-6">
          <WebsiteStaticsCard />
          <JobsCard />
        </div>
        <div className="flex flex-col gap-6">
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold mb-4 text-blue-700">Postos Recentes</h2>
            <div className="flex flex-col gap-4">
              {stations.length === 0 ? (
                <span className="text-gray-400">Nenhum posto cadastrado.</span>
              ) : (
                stations.map(station => (
                  <GasStationBackofficeCard key={station._id} station={station} refetch={() => {}} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}