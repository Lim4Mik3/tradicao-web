import EditResourceForm from "@/components/edit-resource-form";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { useGetResource } from "@/hooks/useResourcesQueries";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";

export function EditResourcePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: resource, isLoading, error } = useGetResource(id!);

  if (error) {
    return (
      <PrivateLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar recurso</p>
            <Button onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>
        </div>
      </PrivateLayout>
    );
  }

  if (isLoading) {
    return (
      <PrivateLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div style={{ '--color': "red" }} className="loader mx-auto" />
        </div>
      </PrivateLayout>
    );
  }

  if (!resource) {
    return (
      <PrivateLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Recurso não encontrado</p>
            <Button onClick={() => navigate(-1)}>
              Voltar
            </Button>
          </div>
        </div>
      </PrivateLayout>
    );
  }

  return (
    <PrivateLayout>
      <EditResourceForm resource={resource} />
    </PrivateLayout>
  )
}