import BannerHome from '@/assets/Banners/Banner_Inicial_Site.png';

export function BannerHomeSection() {
  return (
    <section className="flex bg-[#FE1112] items-center justify-center">
      <img src={BannerHome} alt="Banner Home" height={740} width={1200} />
    </section>
  );
}
