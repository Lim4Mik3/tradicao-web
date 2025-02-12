
import Ipiranga from '@/assets/Logos-Parceiros/Ipiranga.png';
import IpirangaJetOil from '@/assets/Logos-Parceiros/Ipiranga_JetOil.png';
import RodOil from '@/assets/Logos-Parceiros/RodOil.png';
import ShellHelix from '@/assets/Logos-Parceiros/Shell_Helix.png';
import brMania from '@/assets/Logos-Parceiros/Vibra_BRMania.png';
import { Carousel } from '@/components/Carousel';

export function ParceirosHomeSection() {
  return (
    <>
      <section className='p-6 md:p-0 max-w-[1200px] mt-10 m-auto justify-center flex items-center flex-col'>
        <div className='flex mb-6 mt-6' >
          <h3 className="text-3xl font-bold text-[#850B10]">
            Os melhores estão ao nosso lado
          </h3>
        </div>
      </section>

      <Carousel className='w-[1200px] m-auto mb-20' infinite responsive={[{ breakpoint: 780, settings: { slidesToShow: 1 } }]} speed={1500} cssEase='linear' slidesToShow={4} slidesToScroll={1} autoplay autoplaySpeed={2000}>
        <div>
          <img src={brMania} alt="brMania" width={120} height={120} />
        </div>
        <div>
          <img src={Ipiranga} alt="Ipiranga" width={120} height={120} />
        </div>
        <div>
          <img src={IpirangaJetOil} alt="IpirangaJetOil" width={120} height={120} />
        </div>
        <div>
          <img src={RodOil} alt="RodOil" width={120} height={120} />
        </div>
        <div>
          <img src={ShellHelix} alt="ShellHelix" width={120} height={120} />
        </div>

      </Carousel>
    </>

  );
}
