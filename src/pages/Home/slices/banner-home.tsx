import BannerHome from '@/assets/Banners/Banner_Inicial_Site.png';

export function BannerHomeSection() {
  return (
    <section className="flex bg-[#FE1112] items-center justify-center">
      <img src={BannerHome} alt="Banner Home" className='md:w-[1200px] md:h-[500px]' />
    </section>
  );
}
