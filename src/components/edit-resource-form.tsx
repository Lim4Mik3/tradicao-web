import type React from "react"

import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Clock } from "lucide-react"
import { useState } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { ResourceModel, ResourceCategory } from "@/models/Resource"
import { useEditResource } from "@/hooks/useEditResource"

export const options = [
  { value: 'SERVICES', label: 'Serviços', color: '#00B8D9' },
  { value: 'APPS', label: 'Aplicativos', color: '#0052CC' },
  { value: 'BRANDS', label: 'Marcas', color: '#5243AA' },
  { value: 'CONVINIENCES', label: 'Conveniências', color: '#FF5630' },
  { value: 'CHANGE_OIL', label: 'Troca de Óleo', color: '#FF8B00' },
] as const;

const resourceSchema = z.object({
  title: z.string()
    .min(1, 'O nome do recurso é obrigatório')
    .min(4, 'O nome do recurso deve ter ao menos 4 caracteres.'),
  category: z.string()
    .min(1, 'A categoria do recurso é obrigatória'),
  image: z.instanceof(File).optional()
})

type ResourceFormData = z.infer<typeof resourceSchema>

type Props = {
  resource: ResourceModel;
}

export default function EditResourceForm({ resource }: Props) {
  const [imagePreview, setImagePreview] = useState<string>(resource.image || "")
  
  const navigate = useNavigate();
  const editResource = useEditResource();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<ResourceFormData>({
    resolver: zodResolver(resourceSchema),
    mode: 'onChange',
    defaultValues: {
      title: resource.title,
      category: resource.category,
      image: undefined
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setImagePreview(url)
      setValue('image', file, { shouldValidate: true })
    }
  }

  const onSubmit = async (data: ResourceFormData) => {
    try {
      await editResource.mutateAsync({
        id: resource.id,
        title: data.title,
        category: data.category as ResourceCategory,
        image: data.image,
      });
      
      // Navegar de volta após sucesso
      navigate(-1);
    } catch (error) {
      console.error('Erro ao editar recurso:', error);
      // Aqui você pode adicionar uma notificação de erro
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-red-50 p-8 border-b">
        <h2 className="text-red-500 font-medium text-xl">Editar o recurso</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <div className="mb-6">
          <h3 className="text-gray-800 font-medium mb-4">Dados</h3>
          <div className="border-t border-gray-200 pt-4">
            <div className="mb-6">
              
              <label className="text-sm font-semibold text-gray-600 mb-1">Ícone</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                  id="icone-upload"
                />
                <label
                  htmlFor="icone-upload"
                  className={cn(
                    "flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50",
                    errors.image ? "border-red-400" : "border-gray-300"
                  )}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-red-500 text-2xl">+</span>
                  )}
                </label>
              </div>
              {errors.image && (
                <span className="text-xs text-red-400 font-semibold mt-1 self-start">
                  {errors.image.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <span
                className="text-sm font-semibold text-gray-600 mb-1"
              >
                Categoria
              </span>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    placeholder="Escolha uma categoria"
                    classNamePrefix="react-select"
                    className={cn({ 
                      "border-2 border-red-400 has-[:focus]:ring-transparent rounded-md": !!errors.category, 
                    })}
                    onChange={(option) => field.onChange(option?.value || '')}
                    value={options.find(option => option.value === field.value)}
                    options={options}
                  />
                )}
              />
              {errors.category && (
                <span className="text-xs text-red-400 font-semibold mt-1 self-start">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="mb-6">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input 
                    value={field.value}
                    hasError={errors.title?.message}
                    title="Nome do recurso"
                    placeholder="Digite o nome do recurso"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.title && (
                <span className="text-xs text-red-400 font-semibold mt-1 self-start">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="w-4 h-4 text-red-800 mr-2" />
              <p>Preencha todos os dados com cuidado.</p>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit"
                className="w-20 h-14" 
                loading={editResource.isPending}
                disabled={!isValid || editResource.isPending}
              >
                {editResource.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

