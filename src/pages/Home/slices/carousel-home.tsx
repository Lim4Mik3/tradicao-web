import Banner1 from '@/assets/Banners/Banner_01.png';
import Banner2 from '@/assets/Banners/Banner_02.png';
import Banner3 from '@/assets/Banners/Banner_03.png';
import Banner4 from '@/assets/Banners/Banner_04.png';
import { Carousel } from '@/components/Carousel';

function MultipleItems() {

  return (
    <Carousel className='mt-10 p-6 md:p-0' dots infinite speed={500} slidesToShow={3} slidesToScroll={1} autoplay>
      <div >
        <img className='rounded-4xl' src={Banner1} alt="Banner 1" />
      </div>
      <div>
        <img className='rounded-4xl' src={Banner2} alt="Banner 2" />
      </div>
      <div>
        <img className='rounded-4xl' src={Banner3} alt="Banner 3" />
      </div>
      <div>
        <img className='rounded-4xl' src={Banner4} alt="Banner 4" />
      </div>

    </Carousel>
  );
}

export { MultipleItems };

