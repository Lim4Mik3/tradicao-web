import { AppLayout } from '@/Layouts/app';
import { AppHomeSection } from './slices/app-home';
import { BannerHomeSection } from './slices/banner-home';
import { MultipleItems } from './slices/carousel-home';
import { CarreiraSection } from './slices/carreira-home';
import { ParceirosHomeSection } from './slices/parceiros-home';
import { TrajetoriaHomeSection } from './slices/trajetoria-home';

export function HomePage() {
  return (
    <AppLayout>
      <BannerHomeSection />
      <MultipleItems />
      <ParceirosHomeSection />
      <AppHomeSection />
      <TrajetoriaHomeSection />
      <CarreiraSection />
    </AppLayout>
  );
}
