import Banner1 from '@/assets/Banners/Banner_01.png';
import Banner2 from '@/assets/Banners/Banner_02.png';
import Banner3 from '@/assets/Banners/Banner_03.png';
import Banner4 from '@/assets/Banners/Banner_04.png';
import { Carousel } from '@/components/Carousel';

function MultipleItems() {

  return (
    <Carousel dots infinite speed={500} slidesToShow={3} slidesToScroll={1} autoplay>
      <div>
        <img src={Banner1} alt="Banner 1" />
      </div>
      <div>
        <img src={Banner2} alt="Banner 2" />
      </div>
      <div>
        <img src={Banner3} alt="Banner 3" />
      </div>
      <div>
        <img src={Banner4} alt="Banner 4" />
      </div>

    </Carousel>
  );
}

export { MultipleItems };

