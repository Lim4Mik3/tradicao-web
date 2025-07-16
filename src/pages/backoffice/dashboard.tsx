import { FuelsCard } from "@/components/FuelsCard";
import { PrivateLayout } from "@/Layouts/PrivateLayout";

export function DashboardPage() {
  return (
    <PrivateLayout>
      <div
        className="grid grid-cols-3 place-items-stretch gap-10 mt-16 h-[calc(100%-139px)]"
      >
        <FuelsCard />
      </div>
    </PrivateLayout>
  )
}