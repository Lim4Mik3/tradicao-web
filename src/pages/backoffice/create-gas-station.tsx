import { Input } from "@/components/Input";
import { PhotoInput } from "@/components/PhotoInput";
import { PrivateLayout } from "@/Layouts/PrivateLayout";

export function CreateGasStationPage() {

  return (
    <PrivateLayout>
      <div>
        <header>
          <span>
            01
          </span>

          <span>
            Preencha as informações
          </span>
        </header>
        
        <form>
          <section>
            <span>Dados básicas</span>

            <Input />

            <PhotoInput />
          </section>

        </form>

      </div>
    </PrivateLayout>
  )
}