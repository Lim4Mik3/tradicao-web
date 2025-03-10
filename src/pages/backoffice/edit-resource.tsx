import EditResourceForm from "@/components/edit-resource-form";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { ResourceModel } from "@/models/Resource";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function EditResourcePage() {
  const [resource, setResource] = useState<ResourceModel>({} as ResourceModel);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const pathname = useLocation().pathname;

  useEffect(() => {
    const [[_, cache]] = queryClient.getQueriesData({ queryKey: ['resources'] }) as any;
    const resources = cache.data.resources;

    if (resources.length > 0) {
      const resourceID = pathname.split('/').pop();

      const resource = resources.find((item: any) => item.id === resourceID);

      if (resource) {
        setResource(resource)
        setIsLoading(false)
      } else {
        navigate(-1);
      }
    }
  }, []);

  return (
    <PrivateLayout>
      {
        isLoading
          ? (
            <div style={{ '--color': "red" }} className="loader mx-auto" />
          )
          : (
            <EditResourceForm resource={resource} />
          )
      }
    </PrivateLayout>
  )
}