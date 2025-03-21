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
import { useCreateGasStation } from "@/hooks/useCreateGasStation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";

const schema = z.object({
  name: z
    .string()
    .min(4, "Nome é obrigatório"),
  filialNumber: z
    .string()
    .min(1, "Número da filial é obrigatório")
    .nonempty("Número da filial é obrigatório"),
  enabled: z.boolean().default(true),
  addressPlaceId: z
    .string({ required_error: "Endereço é obrigatório" })
    .min(1, "Endereço é obrigatório")
    .nonempty("Endereço é obrigatório"),
  photos: z.array(z.object({
    id: z.string(),
    file: z.instanceof(File, { message: "O campo file deve ser um arquivo válido" }),
  })),
  services: z.array(z.string()).optional(),
  phone: z.string().min(10, "Telefone inválido"),
  comercialHours: z.string().min(1, "Horário comercial é obrigatório"),
  holidaysHours: z.string().min(1, "Horário em feriados é obrigatório"),
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
  } = useForm<z.TypeOf<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate()

  const createGasStation = useCreateGasStation()

  const onSubmit = async (data: any) => {
    const result = await createGasStation.mutateAsync(data);

    if (result.error === null) {
      navigate("/backoffice/gas-stations");
    }
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
                <Switch 
                  defaultChecked
                  onCheckedChange={(selected) => setValue("enabled", selected)} 
                />
              </div>

              <Input 
                title="Nome da unidade"
                placeholder="Digite o nome da unidade" 
                hasError={errors.name?.message}
                {...register("name")} 
              />
              
              <Input 
                title="Numero da filial" 
                placeholder="Digite o numero da filial" 
                hasError={errors.filialNumber?.message}
                {...register("filialNumber")} 
              />
              
              <AddressAutocompleteInput 
                title="Endereço da unidade" 
                onChange={(placeId) => setValue("addressPlaceId", placeId)} 
                hasError={errors.addressPlaceId?.message}
              />

              <PhotoInput 
                title="Imagens da unidade" 
                hasError={errors.photos?.message}
                onChange={(photos) => setValue("photos", photos)} 
                // onChange={(photos) => { photos.map((image) => console.log(image.file.name)) }} 
              />

              <ServicesInput 
                title="Serviços da unidade" 
                onChange={(services) => setValue("services", services)} 
              />

              <Input 
                title="Telefone da unidade" 
                hasError={errors.phone?.message}
                placeholder="Digite o telefone da unidade" 
                {...register("phone")} 
              />

              <Input 
                title="Celular da unidade" 
                placeholder="Digite o celular da unidade" 
                hasError={errors.mobile?.message}
                {...register("mobile")} 
              />

              <Input 
                title="Whatsapp da unidade" 
                placeholder="Digite o whatsapp da unidade" 
                hasError={errors.whatsapp?.message}
                {...register("whatsapp")} 
              />

              <Input 
                title="E-mail da unidade" 
                hasError={errors.email?.message}
                placeholder="Digite o e-mail da unidade" 
                {...register("email")} 
              />
              
              <AppsInput 
                title="Aplicativos de desconto" 
                onChange={(apps) => setValue("apps", apps)} 
              />

              <BrandsInput 
                title="Marcas" 
                onChange={(brands) => setValue("brands", brands)} 
              />

              <ConvinienceInput 
                title="Conveniências" 
                onChange={(conveniences) => setValue("conveniences", conveniences)} 
              />

              <OilChangeInput 
                title="Troca de óleo" 
                onChange={(oilChanges) => setValue("oilChanges", oilChanges)} 
              />
              
              <Input 
                title="Horario comercial" 
                placeholder="Horario comercial" 
                hasError={errors.comercialHours?.message}
                {...register("comercialHours")} 
              />

              <Input 
                title="Horario feriados" 
                placeholder="Horario holidays" 
                hasError={errors.holidaysHours?.message}
                {...register("holidaysHours")} 
              />
              
              <ManagersInput 
                title="Gerente" 
                hasError={errors.managerId?.message}
                onChange={(managerId) => setValue("managerId", managerId)} 
              />
            </div>
          </section>
          
          <Button type="submit" className="mt-20" loading={createGasStation.isPending}>
            Salvar
          </Button>
        </form>
      </div>
    </PrivateLayout>
  );
}