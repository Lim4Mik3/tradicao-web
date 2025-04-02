import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/Layouts/app';

export function PostosPage() {
  return (
    <AppLayout>
      <section className="max-w-[1200px] p-6 md:p-0 gap-24 m-auto justify-center flex items-center flex-col">
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-start text-7xl text-[#B00000]">
            Postos
          </h2>
          <Separator />
        </div>
      </section>
    </AppLayout>
  );
}
