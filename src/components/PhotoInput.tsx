import type React from "react"

import { Plus } from "lucide-react"
import { ComponentProps, useState } from "react"

type Props = ComponentProps<'input'>;

export function PhotoInput(props: Props) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setPreview(reader.result as string)
      }

      reader.readAsDataURL(file)
      props.onChange && props.onChange(e);
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="cityPhoto" className="block text-sm font-medium text-gray-700">
        Foto da cidade
      </label>
      <div className="border-2 border-dashed rounded-md p-4">
        <input
          type="file"
          id="cityPhoto"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          {...props}
        />
        {preview ? (
          <div className="relative">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover rounded-md" />
            <button
              type="button"
              onClick={() => {
                setPreview(null)
              }}
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
            >
              ×
            </button>
          </div>
        ) : (
          <label
            htmlFor="cityPhoto"
            className="flex flex-col items-center justify-center h-48 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            <Plus className="w-6 h-6 mb-2" />
            <span className="text-sm">Adicionar uma foto</span>
          </label>
        )}
      </div>
    </div>
  )
}

