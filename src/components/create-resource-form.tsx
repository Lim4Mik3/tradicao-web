import type React from "react"

import Select from 'react-select'

import { Clock } from "lucide-react"
import { useState } from "react"
import { Input } from "./Input"
import { Button } from "./Button"

export const options = [
  { value: 'SERVICES', label: 'Serviços', color: '#00B8D9' },
  { value: 'APPS', label: 'Aplicativos', color: '#0052CC' },
  { value: 'BRANDS', label: 'Marcas', color: '#5243AA' },
  { value: 'CONVINIENCES', label: 'Conveniências', color: '#FF5630' },
  { value: 'CHANGE_OIL', label: 'Troca de Óleo', color: '#FF8B00' },
] as const;

export default function CreateResourceForm() {
  const [nomeCategoria, setNomeCategoria] = useState("")
  const [icone, setIcone] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleIconeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setIcone(file)

      // Criar URL para preview
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode implementar a lógica para enviar os dados
    console.log("Dados do formulário:", { nomeCategoria, icone })
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Cabeçalho */}
      <div className="bg-red-50 p-8 border-b">
        <h2 className="text-red-500 font-medium text-xl">Adicione uma recurso</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-6">
          <h3 className="text-gray-800 font-medium mb-4">Dados</h3>
          <div className="border-t border-gray-200 pt-4">
            {/* Área de upload do ícone */}
            <div className="mb-6">
              
              <label className="text-sm font-semibold text-gray-600 mb-1">Ícone</label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconeChange}
                  className="sr-only"
                  id="icone-upload"
                />
                <label
                  htmlFor="icone-upload"
                  className="flex items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
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
                options={options}
              />
            </div>

            <div className="mb-6">
              <Input 
                title="Nome do recurso"
                placeholder="Digite o nome do recurso"
                value={nomeCategoria}
                onChange={(e) => setNomeCategoria(e.target.value)}
              />
            </div>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="w-4 h-4 text-red-800 mr-2" />
              <p>Preencha todos os dados com cuidado.</p>
            </div>

            <div className="flex justify-end">
              <Button>
                Criar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

