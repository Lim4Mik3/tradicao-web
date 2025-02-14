import Banner1 from '@/assets/Banners/Banner_01.png';
import Banner2 from '@/assets/Banners/Banner_02.png';
import Banner3 from '@/assets/Banners/Banner_03.png';
import Banner4 from '@/assets/Banners/Banner_04.png';
import { Carousel } from '@/components/Carousel';

function MultipleItems() {

  return (
    <Carousel className='md:max-w-[1200px] max-w-[320px] m-auto mt-6 flex gap-3 mb-20' dots infinite speed={500} slidesToShow={2} responsive={[{ breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1, } }]} slidesToScroll={1} autoplay>
      <div>
        <img className='rounded-xl md:w-[570px] md:h-[300px]' src={Banner1} alt="Banner 1" />
      </div>
      <div>
        <img className='rounded-xl md:w-[570px] md:h-[300px]' src={Banner2} alt="Banner 2" />
      </div>
      <div>
        <img className='rounded-xl md:w-[570px] md:h-[300px]' src={Banner3} alt="Banner 3" />
      </div>
      <div>
        <img className='rounded-xl md:w-[570px] md:h-[300px]' src={Banner4} alt="Banner 4" />
      </div>

    </Carousel>
  );
}

export { MultipleItems };

