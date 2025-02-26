import { Button } from "@/components/Button";
import { GasStationBackofficeCard } from "@/components/GasStationBackofficeCard";
import { Input } from "@/components/Input";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function GasStationsPage() {
  const navigate = useNavigate();

  return (
    <PrivateLayout>
      <div
        className="flex items-center justify-between"
      >
        <Input 
          placeholder="Busque por uma unidade"
          className="py-4 max-w-[450px]"
        />

        <Button
          className="flex items-center justify-center gap-4 max-w-[300px] w-full"
          onClick={() => navigate(ROUTES_NAME.CREATE_GAS_STATION)}
        >
          <Plus />
          
          Adicionar uma unidade
        </Button>
      </div>


      <div
        className="mt-14 h-[calc(100%-80px)] flex items-start gap-10 flex-wrap justify-center overflow-y-auto py-10"
      >
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />

        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
        <GasStationBackofficeCard />
      </div>
    </PrivateLayout>
  )
}