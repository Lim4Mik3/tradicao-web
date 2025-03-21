import PersonalInfoSection from "@/components/personal-info-section"
import ProfileHeader from "@/components/profile-header"
import { PrivateLayout } from "@/Layouts/PrivateLayout"
import { useState } from "react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "Jack Adams",
    title: "Product Designer",
    location: "Los Angeles, California, USA",
    imageUrl: "https://randomuser.me/api/portraits/men/89.jpg",
    firstName: "Jack",
    lastName: "Adams",
    email: "jackadams@gmail.com",
    phone: "(213) 555-1234",
    bio: "Product Designer",
    country: "United States of America",
    cityState: "California,USA",
    postalCode: "ERT 62574",
    taxId: "AS564178969",
  })

  const updateProfile = (_: string, data: any) => {
    setProfileData((prev) => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <PrivateLayout>
      <div
        className=""
      >
        <h1 className="text-2xl font-semibold text-zinc-800 mb-4">Seu perfil</h1>

        <ProfileHeader
          name={profileData.name}
          title={profileData.title}
          location={profileData.location}
          imageUrl={profileData.imageUrl}
          onSave={(data) => updateProfile("header", data)}
        />

        <PersonalInfoSection
          name={profileData.firstName}
          email={profileData.email}
          phone={profileData.phone}
          onSave={(data) => updateProfile("personal", data)}
        />

      </div>
    </PrivateLayout>
  )
}

