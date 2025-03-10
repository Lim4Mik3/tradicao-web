import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressAutocompleteInput } from "@/components/AddressAutocompleteInput";
import { BrandsInput } from "@/components/BrandsInput";
import { Input } from "@/components/Input";
import { ManagersInput } from "@/components/ManagersInput";
import { PhotoInput } from "@/components/PhotoInput";
import { ServicesInput } from "@/components/ServicesInput";
import { Switch } from "@/components/ui/switch";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { z } from "zod";
import { AppsInput } from "@/components/AppDiscountInput";
import { ConvinienceInput } from "@/components/ConvinienceInput";
import { OilChangeInput } from "@/components/OilChangeInput";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  enabled: z.boolean(),
  addressPlaceId: z.string().min(1, "Endereço é obrigatório"),
  photos: z.array(z.object({ id: z.string() })).min(3, "É necessário pelo menos 3 fotos"),
  services: z.array(z.string()).optional(),
  phone: z.string().min(10, "Telefone inválido"),
  mobile: z.string().min(10, "Celular inválido"),
  whatsapp: z.string().min(10, "Whatsapp inválido"),
  email: z.string().email("E-mail inválido"),
  apps: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  conveniences: z.array(z.string()).optional(),
  oilChanges: z.array(z.string()).optional(),
  managerId: z.string().min(1, "Gerente é obrigatório"),
});

export function CreateGasStationPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Formulário válido:", data);
  };

  return (
    <PrivateLayout>
      <div className="bg-white rounded-lg h-full mx-auto max-w-[70%] border border-gray-300 overflow-auto">
        <header className="py-10 px-16 bg-gradient-to-r from-red-200 to-red-100 flex items-center justify-start gap-8 text-zinc-950">
          <span className="flex items-center justify-center w-14 aspect-square rounded-lg border border-zinc-400/20 bg-red-400 text-slate-50 text-xl font-semibold">01</span>
          <span className="text-2xl drop-shadow-md">Preencha as informações</span>
        </header>
        
        <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-16">
          <section className="flex flex-col ">
            <span className="text-2xl text-zinc-700 font-semibold border-b border-b-gray-300 pb-1 mb-5">Dados básicas</span>
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-600 mr-1">Unidade ativa:</span>
                <Switch onCheckedChange={(selected) => setValue("enabled", selected)} />
              </div>
              {errors.enabled && <span className="text-red-500 mt-1">{String(errors.enabled.message)}</span>}
              
              <Input title="Nome da unidade" placeholder="Digite o nome da unidade" {...register("name")} />
              {errors.name && <span className="text-red-500 mt-1">{String(errors.name.message)}</span>}
              
              <Input title="Numero da unidade" placeholder="Digite o numero da filial" {...register("unityNumber")} />
              
              <AddressAutocompleteInput title="Endereço da unidade" onChange={(placeId) => setValue("addressPlaceId", placeId)} />
              {errors.addressPlaceId && <span className="text-red-500 mt-1">{String(errors.addressPlaceId.message)}</span>}

              <PhotoInput title="Imagens da unidade" onChange={(photos) => setValue("photos", photos)} />
              {errors.photos && <span className="text-red-500 mt-1">{String(errors.photos.message)}</span>}

              <ServicesInput title="Serviços da unidade" onChange={(services) => setValue("services", services)} />
              {errors.services && <span className="text-red-500 mt-1">{String(errors.services?.message)}</span>}

              <Input title="Telefone da unidade" placeholder="Digite o telefone da unidade" {...register("phone")} />
              {errors.phone && <span className="text-red-500 mt-1">{String(errors.phone.message)}</span>}

              <Input title="Celular da unidade" placeholder="Digite o celular da unidade" {...register("mobile")} />
              {errors.mobile && <span className="text-red-500 mt-1">{String(errors.mobile.message)}</span>}

              <Input title="Whatsapp da unidade" placeholder="Digite o whatsapp da unidade" {...register("whatsapp")} />
              {errors.whatsapp && <span className="text-red-500 mt-1">{String(errors.whatsapp.message)}</span>}

              <Input title="E-mail da unidade" placeholder="Digite o e-mail da unidade" {...register("email")} />
              {errors.email && <span className="text-red-500 mt-1">{String(errors.email.message)}</span>}
              
              <AppsInput title="Aplicativos de desconto" onChange={(apps) => setValue("apps", apps)} />
              <BrandsInput title="Marcas" onChange={(brands) => setValue("brands", brands)} />
              <ConvinienceInput title="Conveniências" onChange={(conveniences) => setValue("conveniences", conveniences)} />
              <OilChangeInput title="Troca de óleo" onChange={(oilChanges) => setValue("oilChanges", oilChanges)} />
              
              <Input title="Horario comercial" placeholder="Horario comercial" {...register("comercialHours")} />
              <Input title="Horario feriados" placeholder="Horario holidays" {...register("holidaysHours")} />
              
              <ManagersInput title="Gerente" onChange={(managerId) => setValue("managerId", managerId[0] || "")} />
              {errors.managerId && <span className="text-red-500 mt-1">{String(errors.managerId.message)}</span>}
            </div>
          </section>
          
          <button type="submit" className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Salvar</button>
        </form>
      </div>
    </PrivateLayout>
  );
}