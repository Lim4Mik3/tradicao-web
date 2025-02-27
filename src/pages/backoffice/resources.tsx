import { Button } from "@/components/Button";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ResourceCard from "@/components/ResourceCard";

import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { useGetResources } from "@/hooks/useGetResources";

export function ResourcesPage() {
  const navigate = useNavigate();
  const getResources = useGetResources();

  const resources = getResources.data?.data;
  const isEmpty = resources && resources.length === 0;
  const resourceList = !getResources.isLoading && !isEmpty && resources;

  console.log(resourceList)

  return (
    <PrivateLayout>
      <div>
        <Button
          className="flex items-center justify-center gap-4 max-w-[300px] w-full"
          onClick={() => navigate(ROUTES_NAME.CREATE_RESOURCE)}
        >
          <Plus />
          
          Criar um recurso
        </Button>
      </div>

      {
        isEmpty && (
          <span>Nao existe nenhum recurso criado ainda.</span>
        )
      }

      {
        getResources.isLoading && (
          <div style={{ '--color': "red" }} className="loader mx-auto" />
        )
      }

      {
        resourceList && (
          <div className="h-[70vh] grid grid-cols-5 gap-y-8 mt-10 overflow-auto">
            { resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            )) }
          </div>
        )
      }
    </PrivateLayout>
  )
}