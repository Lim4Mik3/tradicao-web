import CreateResourceForm from "@/components/create-resource-form";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { useNavigate } from "react-router-dom";

export function CreateResourcePage() {
  const navigate = useNavigate();

  return (
    <PrivateLayout>
      <CreateResourceForm />
    </PrivateLayout>
  )
}