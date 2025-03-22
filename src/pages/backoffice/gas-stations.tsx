import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { useListGasStation } from "@/hooks/useListGasStation";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GasStationBackofficeCard } from "@/components/GasStationBackofficeCard";
import ModalVariant from "@/components/modal-variant";

export function GasStationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate();

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isLoading, 
    isError, 
    isRefetching,
    error,
    refetch
  } = useListGasStation({ term: searchTerm });

  const stations = data && data.pages.flatMap((page: any) => page?.stations) || [];

  return (
    <PrivateLayout>
      <div
        className="flex items-center justify-between"
      >
        <div className="flex flex-col items-start gap-1">
          <Input 
            placeholder="Busque por uma unidade"
            className="py-4 max-w-[450px]"
            onChange={({ target }) => setSearchTerm(target.value)}
            value={searchTerm}
          />
          {
            searchTerm && (
              <span className="text-sm text-gray-500 font-semibold opacity-50">
                Resultados para: {searchTerm}
              </span>
            )
          }
        </div>

        <Button
          className="flex items-center justify-center gap-4 max-w-[300px] w-full"
          onClick={() => navigate(ROUTES_NAME.CREATE_GAS_STATION)}
        >
          <Plus />
          
          Adicionar uma unidade
        </Button>
      </div>

      <div className="overflow-auto h-full py-10 my-10 pb-20">
        <div
          className="bg-amber-300 h-[100%] flex flex-wrap gap-4 items-start"
        >
          {stations.map((station) => (
            <GasStationBackofficeCard 
              key={station._id} 
              station={station} 
              refetch={refetch}
            />
          ))}
        </div>
      </div>
    </PrivateLayout>
  )
}