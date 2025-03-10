import { AddressAutocompleteInput } from "@/components/AddressAutocompleteInput";
import { AppsInput } from "@/components/AppDiscountInput";
import { Input } from "@/components/Input";
import { ManagersInput } from "@/components/ManagersInput";
import { PhotoInput } from "@/components/PhotoInput";
import { ServicesInput } from "@/components/ServicesInput";
import { PrivateLayout } from "@/Layouts/PrivateLayout";

export function CreateGasStationPage() {
  return (
    <PrivateLayout>
      <div
        className="bg-white rounded-lg h-full mx-auto max-w-[70%] border border-gray-300 overflow-auto"
      >
        <header
          className="py-10 px-16 bg-gradient-to-r from-red-200 to-red-100 flex items-center justify-start gap-8 text-zinc-950"
        >
          <span
            className="flex items-center justify-center w-14 aspect-square rounded-lg border border-zinc-400/20 bg-red-400 text-slate-50 text-xl font-semibold"
          >
            01
          </span>

        <span
          className="text-2xl drop-shadow-md"
        >
            Preencha as informações
          </span>
        </header>
        
        <form
          className="px-12 py-16"
        >
          <section
            className="flex flex-col "
          >
            <span
              className="text-2xl text-zinc-700 font-semibold border-b border-b-gray-300 pb-1 mb-5"
            >
              Dados básicas
            </span>

            <div
              className="flex flex-col gap-6"
            >
              <Input title="Nome da unidade" placeholder="Digite o nome da unidade" />

              <AddressAutocompleteInput title="Endereco da unidade" />

              <PhotoInput title="Imagens da unidade" />

              <ServicesInput title="Serviços da unidade" />

              <Input title="Telefone da unidade" placeholder="Digite o telefone da unidade" />

              <Input title="Celular da unidade" placeholder="Digite o celular da unidade" />

              <Input title="Whatsapp da unidade" placeholder="Digite o whatsapp da unidade" />

              <Input title="E-mail da unidade" placeholder="Digite o e-mail da unidade" />
              
              <AppsInput title="Aplicativos de desconto" onChange={payload => console.log(payload)} />

              <ManagersInput title="Gerente" onChange={(payload) => console.log({ payload })} />
            </div>
          </section>

        </form>

      </div>
    </PrivateLayout>
  )
}