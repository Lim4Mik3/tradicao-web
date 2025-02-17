import App1 from '@/assets/Banners/Banner_App_01.png';
import App2 from '@/assets/Banners/Banner_App_02.png';
import App3 from '@/assets/Banners/Banner_App_03.png';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export function AppHomeSection() {
  return (
    <section className="flex p-6 md:p-0 gap-24 flex-col md:flex-row md:h-[860px] items-center justify-center md:gap-[80px]">
      <div className='flex flex-col md:max-w-[500px] gap-3'>
        <div className='bg-[#C1C1C166]/40 rounded-full py-[6px] px-[38px] '>
          <p className='uppercase text-sm text-black font-bold'>Aplicativo rede tradição</p>
        </div>
        <p className='text-[#850B10] font-bold text-4xl md:text-[46px] leading-[69px]'>Obtenha descontos, cashback e  vantagens em seus abastecimentos na rede de postos Tradição </p>
        <p>Tecnologia e comodidade, juntos.</p>
        <p>Baixe o aplicativo agora na sua loja preferida.</p>
        <div>
          <Button variant='default' className='uppercase bg-[#D24248] text-white'>Obtenha o aplicativo</Button>
        </div>

      </div>
      <Carousel >
        <CarouselContent className='flex items-center max-w-[320px]  md:max-w-[450px] md:h-[850px]'>
          <CarouselItem><img src={App1} alt="App Home" /></CarouselItem>
          <CarouselItem><img src={App2} alt="App Home" /></CarouselItem>
          <CarouselItem><img src={App3} alt="App Home" /></CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='disabled:text-gray-400' />
        <CarouselNext className='disabled:text-gray-400' />
      </Carousel>
    </section>
  );
}
