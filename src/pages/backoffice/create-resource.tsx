import CreateResourceForm from "@/components/create-resource-form";
import { PrivateLayout } from "@/Layouts/PrivateLayout";

export function CreateResourcePage() {
  return (
    <PrivateLayout>
      <CreateResourceForm />
    </PrivateLayout>
  )
}