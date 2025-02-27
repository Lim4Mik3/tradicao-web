import { Button } from "@/components/Button";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ResourceCard from "@/components/ResourceCard";

import { PrivateLayout } from "@/Layouts/PrivateLayout";

export function ResourcesPage() {
  const navigate = useNavigate();

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

      <ResourceCard />
    </PrivateLayout>
  )
}