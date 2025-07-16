import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressAutocompleteInput } from "@/components/AddressAutocompleteInput";
import { BrandsInput } from "@/components/BrandsInput";
import { Input } from "@/components/Input";
import { PhotoInput } from "@/components/PhotoInput";
import { ServicesInput } from "@/components/ServicesInput";
import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { z } from "zod";
import { AppsInput } from "@/components/AppDiscountInput";
import { ConvinienceInput } from "@/components/ConvinienceInput";
import { OilChangeInput } from "@/components/OilChangeInput";
import { useCreateGasStation } from "@/hooks/useCreateGasStation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";
import { toast } from "react-toastify";

const schema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(4, "Nome deve ter ao menos 4 caracteres"),
  filialNumber: z
    .string()
    .min(1, "Número da filial é obrigatório"),
  addressPlaceId: z
    .string({ required_error: "Endereço é obrigatório" })
    .min(1, "Endereço é obrigatório"),
  photos: z.array(z.object({
    id: z.string(),
    file: z.instanceof(File, { message: "O campo file deve ser um arquivo válido" }),
  })).optional(),
  services: z.array(z.string()).optional(),
  phone: z.string().min(10, "Telefone deve ter ao menos 10 dígitos"),
  comercialHours: z.string().min(1, "Horário comercial é obrigatório"),
  holidaysHours: z.string().min(1, "Horário em feriados é obrigatório"),
  mobile: z.string().min(10, "Celular deve ter ao menos 10 dígitos"),
  whatsapp: z.string().min(10, "WhatsApp deve ter ao menos 10 dígitos"),
  email: z.string().email("E-mail inválido"),
  apps: z.array(z.string()).optional(),
  brands: z.array(z.string()).optional(),
  conveniences: z.array(z.string()).optional(),
  oilChanges: z.array(z.string()).optional(),
});

type GasStationFormData = z.infer<typeof schema>;

export function CreateGasStationPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<GasStationFormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      services: [],
      apps: [],
      brands: [],
      conveniences: [],
      oilChanges: [],
    },
  }); 

  const navigate = useNavigate();
  const createGasStation = useCreateGasStation();

  const onSubmit = async (data: GasStationFormData) => {
    try {
      const result = await createGasStation.mutateAsync(data);

      if (result.error === null) { 
        toast.success("🎉 Posto de gasolina criado com sucesso!");
        navigate("/backoffice/gas-stations");
      } else {
        toast.error(`❌ Erro ao criar posto: ${result.error}`);
      }
    } catch (error) {
      console.error('Erro ao criar posto:', error);
      toast.error("❌ Erro inesperado ao criar posto. Tente novamente.");
    }
  };

  return (
    <PrivateLayout>
      <div className="bg-white rounded-lg h-full mx-auto border border-gray-300 overflow-auto max-w-[60vw]">
        <form onSubmit={handleSubmit(onSubmit)} className="px-12 py-16 ">
          <section className="flex flex-col">
            <span className="text-2xl text-zinc-700 font-semibold border-b border-b-gray-300 pb-1 mb-5">Dados básicos</span>
            <div className="flex flex-col gap-6 py-6">

              <Input 
                title="Nome da unidade"
                placeholder="Digite o nome da unidade" 
                hasError={errors.name?.message}
                {...register("name")} 
              />
              
              <Input 
                title="Número da filial" 
                placeholder="Digite o número da filial" 
                hasError={errors.filialNumber?.message}
                {...register("filialNumber")} 
              />
              
              <Controller
                name="addressPlaceId"
                control={control}
                render={({ field }) => (
                  <AddressAutocompleteInput 
                    title="Endereço da unidade" 
                    onChange={field.onChange} 
                    hasError={errors.addressPlaceId?.message}
                  />
                )}
              />

              <Controller
                name="photos"
                control={control}
                render={({ field }) => (
                  <PhotoInput 
                    title="Imagens da unidade" 
                    hasError={errors.photos?.message}
                    onChange={field.onChange} 
                  />
                )}
              />

              <Controller
                name="services"
                control={control}
                render={({ field }) => (
                  <ServicesInput 
                    title="Serviços da unidade" 
                    onChange={field.onChange} 
                  />
                )}
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
                title="WhatsApp da unidade" 
                placeholder="Digite o WhatsApp da unidade" 
                hasError={errors.whatsapp?.message}
                {...register("whatsapp")} 
              />

              <Input 
                title="E-mail da unidade" 
                hasError={errors.email?.message}
                placeholder="Digite o e-mail da unidade" 
                {...register("email")} 
              />
              
              <Controller
                name="apps"
                control={control}
                render={({ field }) => (
                  <AppsInput 
                    title="Aplicativos de desconto" 
                    onChange={field.onChange} 
                  />
                )}
              />

              <Controller
                name="brands"
                control={control}
                render={({ field }) => (
                  <BrandsInput 
                    title="Marcas" 
                    onChange={field.onChange} 
                  />
                )}
              />

              <Controller
                name="conveniences"
                control={control}
                render={({ field }) => (
                  <ConvinienceInput 
                    title="Conveniências" 
                    onChange={field.onChange} 
                  />
                )}
              />

              <Controller
                name="oilChanges"
                control={control}
                render={({ field }) => (
                  <OilChangeInput 
                    title="Troca de óleo" 
                    onChange={field.onChange} 
                  />
                )}
              />
              
              <Input 
                title="Horário comercial" 
                placeholder="Ex: Segunda a Sexta: 06:00 às 22:00" 
                hasError={errors.comercialHours?.message}
                {...register("comercialHours")} 
              />

              <Input 
                title="Horário feriados" 
                placeholder="Ex: Sábados e Domingos: 07:00 às 20:00" 
                hasError={errors.holidaysHours?.message}
                {...register("holidaysHours")} 
              />
            </div>
          </section>
          
          <Button 
            type="submit" 
            className="mt-10 w-40" 
            loading={createGasStation.isPending}
            disabled={!isValid || createGasStation.isPending}
          >
            {createGasStation.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>
    </PrivateLayout>
  );
}