"use client"

import type React from "react"

import { Fragment, useState } from "react"
import { Check, X } from "lucide-react"
import EditButton from "./edit-button"
import ProfileSection from "./profile-section"
import { Input } from "./Input"

interface PersonalInfoSectionProps {
  name: string
  email: string
  phone: string
  onSave: (data: Partial<PersonalInfoSectionProps>) => void
}

export default function PersonalInfoSection({
  name,
  email,
  phone,
  onSave,
}: PersonalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    onSave(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name,
      email,
      phone,
    })
    setIsEditing(false)
  }

  return (
    <ProfileSection
      title="Informações pessoais"
      actionButton={
        isEditing ? (
          <div className="flex gap-4">
            <button onClick={handleCancel} className="text-gray-400 hover:text-red-600 transition-colors hover:cursor-pointer">
              <span className="flex items-center gap-1">
                <X size={16} />
                <span>Cancelar</span>
              </span>
            </button>

            <button onClick={handleSave} className="text-green-700 hover:text-green-600 transition-colors hover:cursor-pointer">
              <span className="flex items-center gap-1">
                <Check size={16} />
                <span>Salvar</span>
              </span>
            </button>
          </div>
        ) : (
          <EditButton onClick={() => setIsEditing(true)} />
        )
      }
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          {isEditing ? (
            <Input variant name="name" title="Nome" onChange={handleChange} value={formData.name} />
          ) : (
            <Fragment>
              <p className="text-zinc-800 font-medium text-sm mb-1">Nome</p>
              <p className="text-gray-700 text-md mb-1">{formData.name}</p>
            </Fragment>
          )}
        </div>
        <div>
          {isEditing ? (
            <Input variant name="phone" title="Telefone" onChange={handleChange} value={formData.phone} />
          ) : (
            <Fragment>
              <p className="text-zinc-800 font-medium text-sm mb-1">Telefone</p>
              <p className="text-gray-700 text-md mb-1">{formData.phone}</p>
            </Fragment>
          )}
        </div>
        <div>
          <p className="text-zinc-800 font-medium text-sm mb-1">E-mail</p>
          <p className="text-gray-700 text-md mb-1">{email}</p>
        </div>
        <div>
          <p className="text-zinc-800 font-medium text-sm mb-1">Cargo</p>
          <p className="text-gray-700 text-md mb-1">ADMISTRADOR</p>
        </div>
      </div>
    </ProfileSection>
  )
}

