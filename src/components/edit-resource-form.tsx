import type React from "react"

import Select from 'react-select'

import { Clock } from "lucide-react"
import { useState } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { ResourceModel } from "@/models/Resource"
import { useEditResource } from "@/hooks/useEditResource"

export const options = [
  { value: 'SERVICES', label: 'Serviços', color: '#00B8D9' },
  { value: 'APPS', label: 'Aplicativos', color: '#0052CC' },
  { value: 'BRANDS', label: 'Marcas', color: '#5243AA' },
  { value: 'CONVINIENCES', label: 'Conveniências', color: '#FF5630' },
  { value: 'CHANGE_OIL', label: 'Troca de Óleo', color: '#FF8B00' },
] as const;

type Props = {
  resource: ResourceModel;
}

export default function EditResourceForm({ resource }: Props) {
  const [category, setCategory] = useState(resource.category)
  const [title, setTitle] = useState(resource.title)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [image, setImage] = useState<{
    url: string,
    file: File
  }>({ url: resource.image } as any);

  const navigate = useNavigate();
  const editResource = useEditResource();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      const url = URL.createObjectURL(file)
      setImage({ url, file });
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let errors = {}

    if (!title) {
      errors = { ...errors, title: 'O nome do recurso é obrigatório' }
    }

    if (title.length < 2) {
      errors = { ...errors, title: 'O nome do recurso deve ter ao menos 2 caracteres.' }
    }

    if (!category) {
      errors = { ...errors, category: 'A categoria do recurso é obrigatória' }
    }

    if (Object.keys(errors).length > 0) {
      return setErrors(errors)
    } else {
      setErrors({});
    }

    await editResource.mutateAsync({
      id: resource.id,
      title,
      category,
      image: image.file,
    })

    navigate(-1);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-red-50 p-8 border-b">
        <h2 className="text-red-500 font-medium text-xl">Editar o recurso</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
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
                  className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  {image.url ? (
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-red-500 text-2xl">+</span>
                  )}
                </label>
              </div>
            </div>

            <div className="mb-6">
              <span
                className="text-sm font-semibold text-gray-600 mb-1"
              >
                Categoria
              </span>
              <Select
                placeholder="Escolha uma categoria"
                classNamePrefix="react-select"
                className={cn({ 
                  "border-2 border-red-400 has-[:focus]:ring-transparent rounded-md": !!errors.category, 
                })}
                onChange={(option) => option?.value ? setCategory(option.value) : undefined}
                defaultInputValue={(() => {
                  const option = options.find((item) => item.value === category);
                  
                  return option ? option.label : undefined;
                })()}
                options={options}
              />
              { errors.category && (
                <span className="text-xs text-red-400 font-semibold mt-1 self-start">
                  {errors.category}
                </span>
              )}
            </div>

            <div className="mb-6">
              <Input 
                value={title}
                hasError={!!errors.title}
                title="Nome do recurso"
                placeholder="Digite o nome do recurso"
                onChange={(e) => setTitle(e.target.value)}
              />
              { errors.title && (
                <span className="text-xs text-red-400 font-semibold mt-1 self-start">
                  {errors.title}
                </span>
              )}
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="w-4 h-4 text-red-800 mr-2" />
              <p>Preencha todos os dados com cuidado.</p>
            </div>

            <div className="flex justify-end">
              <Button 
                className="w-20 h-14" 
                onClick={handleSubmit} 
                loading={editResource.isPending}
              >
                Salvar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

