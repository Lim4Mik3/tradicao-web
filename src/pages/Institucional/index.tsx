import Claudia from '@/assets/Diretores/Claudia.png';
import Eluir from '@/assets/Diretores/Eluir.png';
import Fabio from '@/assets/Diretores/Fabio.png';
import Marcio from '@/assets/Diretores/Marcio.png';
import Matheus from '@/assets/Diretores/Matheus.png';
import Milena from '@/assets/Diretores/Milena.png';
import Banner from '@/assets/Institucional/BannerInstitucional.jpg';
import { Carousel } from '@/components/Carousel';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/Layouts/app';

export function InstitucionalPage() {
  return (
    <AppLayout>
      <section className='max-w-[1200px] p-6 md:p-0 gap-24 m-auto justify-center flex items-center flex-col'>
        <div className='flex w-full flex-col items-start mt-24 justify-start '>
          <h1 className='font-bold text-[#313131] text-4xl text-start md:text-7xl'>Facilitando o teu dia!</h1>
        </div>

        <div className='flex w-full'>
          <img src={Banner} alt="logo" className='object-top w-full' />
        </div>
        <div className='flex flex-col gap-6'>
          <h2 className='font-bold text-start text-7xl text-[#B00000]'>A Rede Tradição</h2>
          <p className='text-xl leading-8'>
            A Rede Tradição começou sua trajetória em setembro de 2015, no norte do Rio Grande do Sul, com o propósito de oferecer produtos e serviços de qualidade que realmente fizessem a diferença no dia a dia das pessoas. Inicialmente, marcamos presença nas cidades de Sananduva e Novo Barreiro, em parceria com a Cia Shell, consolidando nosso compromisso com excelência e proximidade
          </p>
          <p className='text-xl leading-8'>Em janeiro de 2016, demos um passo importante rumo à expansão com a aquisição de uma unidade na BR-386, em Soledade, um dos principais corredores logísticos do estado. Poucos meses depois, em abril, ampliamos ainda mais nossa atuação com uma nova unidade na RS-126, em Sananduva.
          </p>
          <p className='text-xl leading-8'>O ano de 2018 trouxe uma grande transformação para a nossa marca. Sob nova gestão, abraçamos a inovação e nos tornamos ainda mais focados em você, nosso cliente. Com isso, adotamos uma nova identidade: Rede Tradição – A Tua Rede de Postos, refletindo nosso compromisso de oferecer não apenas produtos e serviços, mas também experiências que facilitam e enriquecem o dia a dia dos nossos clientes.</p>
          <p className='text-xl leading-8'>
            Hoje, a Rede Tradição se orgulha de operar com 53 unidades no Rio Grande do Sul, 18 em Santa Catarina e 2 no Paraná, além de contar com nosso Centro Administrativo em Marau – RS. Cada uma dessas unidades reflete nosso propósito de atender com excelência e humanização, sempre priorizando a sua satisfação.

          </p>
          <p className='text-xl leading-8 font-bold italic'>
            Rede Tradição, a Tua Rede de Postos. Facilitando Teu Dia.
          </p>
          <Separator />
        </div>
        <div className='flex flex-col md:flex-row gap-24 mb-24'>
          <div className='flex flex-col items-center gap-2'>
            <span className='uppercase font-light text-[#979797] text-[64px] leading-[89px]'>Anos</span>
            <span className='font-normal text-7xl'>7</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='uppercase font-light text-[#979797] text-[64px] leading-[89px]'>Postos</span>
            <span className='font-normal text-7xl'>70+</span>
          </div>
          <div className='flex flex-col items-center gap-2'>
            <span className='uppercase font-light text-[#979797] text-[64px] leading-[89px]'>Clientes</span>
            <span className='font-normal text-7xl'>200mil+</span>
          </div>
        </div>

      </section>
      <Carousel className='w-[1200px] m-auto p-6 md:p-0 mb-20' infinite dots speed={1500} slidesToShow={4} slidesToScroll={1} autoplay >
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Marcio} alt="logo" />
            <span className='text-lg'>Marcio Andre Pagnussat</span>
            <span>CEO</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Eluir} alt="logo" />
            <span className='text-lg'>Elui Seiffert</span>
            <span>Diretor de Expansão</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Claudia} alt="logo" />
            <span className='text-lg'>Cláudia Pereto Pagnussat</span>
            <span> Diretora Administrativa</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Milena} alt="logo" />
            <span className='text-lg'>Milena Pereto Pagnussat</span>
            <span>Diretora Administrativa</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Fabio} alt="logo" />
            <span className='text-lg'>Fábio Remedi Trindade</span>
            <span>Diretor Operacional</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Matheus} alt="logo" />
            <span className='text-lg'>Matheus Brugnera</span>
            <span>Diretor Comercial</span>
          </Card>
        </div>
      </Carousel>
    </AppLayout>
  );
}
