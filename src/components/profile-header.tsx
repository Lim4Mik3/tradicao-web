import type React from "react"

import { Fragment, useState } from "react"
import { Upload } from "lucide-react"
import EditButton from "./edit-button"
import ModalVariant from "./modal-variant"
import { Input } from "./Input"

interface ProfileHeaderProps {
  name: string
  title: string
  location: string
  imageUrl: string
  onSave: (data: Partial<ProfileHeaderProps>) => void
}

export default function ProfileHeader({ name, title, location, imageUrl, onSave }: ProfileHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name,
    title,
    location,
    imageUrl,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    onSave(formData)
    setIsModalOpen(false)
  }

  return (
    <div className="border rounded-lg border-gray-300 overflow-hidden mb-8">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4 ">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-zinc-700/30">
            <img src={imageUrl || "/placeholder.svg"} alt={name} className="object-cover" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900">{name}</h2>
            <p className="text-zinc-700">{title}</p>
            <p className="text-zinc-700 text-sm">{location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

