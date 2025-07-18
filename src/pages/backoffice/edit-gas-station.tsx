import { useParams, useNavigate } from "react-router-dom";
import { useGetGasStation } from "@/hooks/useGetGasStation";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { Button } from "@/components/Button";
import { LoadingScreen } from "@/components/LoadingScreen";
import CreateGasStationForm from "./create-gas-station";

export function EditGasStationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: station, isLoading, error } = useGetGasStation(id!);

  if (error) {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar posto</p>
            <Button onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>
        </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!station) {
    return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Posto não encontrado</p>
            <Button onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>
        </div>
    );
  }

  return (
      <CreateGasStationForm station={station} isEdit />
  );
}

export default EditGasStationPage;
