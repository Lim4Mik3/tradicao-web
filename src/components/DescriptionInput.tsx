import type React from "react"

import { useFormContext } from "react-hook-form"
import { useState } from "react"

export function DescriptionInput() {
  const { register, watch } = useFormContext()
  const description = watch("cityDescription")
  const [charCount, setCharCount] = useState(0)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= 250) {
      setCharCount(value.length)
    }
  }

  return (
    <div className="space-y-2">
      <label htmlFor="cityDescription" className="block text-sm font-medium text-gray-700">
        Descrição da cidade
      </label>
      <div className="relative">
        <textarea
          {...register("cityDescription", { required: true, maxLength: 250 })}
          id="cityDescription"
          rows={4}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute bottom-2 right-2 text-xs text-gray-400">Máximo {250 - charCount} caracteres</span>
      </div>
    </div>
  )
}

