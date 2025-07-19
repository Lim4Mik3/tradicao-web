import App1 from '@/assets/Banners/Banner_App_01.png';
import App2 from '@/assets/Banners/Banner_App_02.png';
import App3 from '@/assets/Banners/Banner_App_03.png';
import { Carousel } from '@/components/Carousel';

import AppStore from '@/../public/app-store-icon.png';
import GooglePlay from '@/../public/play-store-icon.png';

export function AppHomeSection() {
  return (

    <section className="p-6 gap-12 md:gap-2 md:flex md:flex-row md:p-0 max-w-[1200px] mt-10 m-auto justify-center ">
      <div className="flex flex-col md:max-w-[500px] gap-3">
        <div className="bg-[#C1C1C166]/40 rounded-full py-[6px] px-[38px] inline-flex w-fit">
          <span className="uppercase text-xs text-black font-semibold tracking-wide">
            Aplicativo rede tradição
          </span>
        </div>
        <p className="text-[#850B10] font-bold text-4xl md:text-[46px] leading-[69px]">
          Obtenha vantagens e muito cashback utilizando o app da Tua Rede!
        </p>
        <p className='text-[#1C1C1C]'>Tecnologia e comodidade, juntos.</p>
        <p className='text-[#1C1C1C]'>Baixe o aplicativo agora na sua loja preferida.</p>
        <div className='flex items-center gap-4 mt-4'>
          <a href="https://apps.apple.com/br/app/rede-tradi%C3%A7%C3%A3o/id1556703028" target="_blank" rel="noreferrer">
            <img className="w-[115px] h-[35px]" src={AppStore} alt="App Store" />
          </a>

          <a href="https://play.google.com/store/apps/details?id=com.argosistemas.redetradicao&hl=pt_BR" target="_blank" rel="noreferrer">
            <img className="w-[115px] h-[35px]" src={GooglePlay} alt="Google Play" />
          </a>
        </div>
      </div>

      <Carousel
        className="md:max-w-[500px] mt-20 md:mt-0 max-w-[320px] m-auto mb-20"
        dots
        infinite
        speed={500}
        slidesToShow={1}
        responsive={[
          { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]}
        slidesToScroll={1}
        autoplay
      >
        <div >
          <img className="rounded-xl md:w-[480px] md:h-[500px]" src={App1} alt="App Home" />
        </div>
        <div>
          <img className="rounded-xl md:w-[480px] md:h-[500px]" src={App2} alt="App Home" />
        </div>
        <div>
          <img className="rounded-xl md:w-[480px] md:h-[500px]" src={App3} alt="App Home" />
        </div>
      </Carousel>
    </section>
  );
}
