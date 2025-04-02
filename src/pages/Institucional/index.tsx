import Claudia from '@/assets/Diretores/Claudia.png';
import Cristiano from '@/assets/Diretores/Cristiano_Pena.png';
import Eluir from '@/assets/Diretores/Eluir.png';
import Everton from '@/assets/Diretores/Everton_Moreno.png';
import Fabio from '@/assets/Diretores/Fabio.png';
import Luciano from '@/assets/Diretores/Luciano_Dall-Alba.png';
import Marcio from '@/assets/Diretores/Marcio.png';
import Matheus from '@/assets/Diretores/Matheus.png';
import Milena from '@/assets/Diretores/Milena.png';
import Paulo from '@/assets/Diretores/Paulo_Ricardo_Sampaio.png';
import Banner from '@/assets/Institucional/BannerInstitucional.jpg';
import { Carousel } from '@/components/Carousel';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AppLayout } from '@/Layouts/app';

export function InstitucionalPage() {
  return (
    <AppLayout>
      <section className="max-w-[1200px] p-6 md:p-0 gap-24 m-auto justify-center flex items-center flex-col">
        <div className="flex w-full flex-col items-start mt-24 justify-start ">
          <h1 className="font-bold text-[#313131] text-4xl text-start md:text-7xl">
            Facilitando o teu dia!
          </h1>
        </div>

        <div className="flex w-full">
          <img src={Banner} alt="logo" className="object-top w-full" />
        </div>
        <div className="flex flex-col gap-6">
          <h2 className="font-bold text-start text-7xl text-[#B00000]">
            A Rede Tradição
          </h2>
          <p className="text-xl leading-8 text-zinc-800">
            A Rede Tradição começou sua trajetória em setembro de 2015, no norte
            do Rio Grande do Sul, com o propósito de oferecer produtos e
            serviços de qualidade que realmente fizessem a diferença no dia a
            dia das pessoas. Inicialmente, marcamos presença nas cidades de
            Sananduva e Novo Barreiro, em parceria com a Cia Shell, consolidando
            nosso compromisso com excelência e proximidade.
          </p>
          <p className="text-xl leading-8 text-zinc-800">
            Em janeiro de 2016, demos um passo importante rumo à expansão com a
            aquisição de uma unidade na BR-386, em Soledade, um dos principais
            corredores logísticos do estado. Poucos meses depois, em abril,
            ampliamos ainda mais nossa atuação com uma nova unidade na RS-126,
            em Sananduva.
          </p>
          <p className="text-xl leading-8 text-zinc-800">
            O ano de 2018 trouxe uma grande transformação para a nossa marca.
            Sob nova gestão, abraçamos a inovação e nos tornamos ainda mais
            focados em você, nosso cliente. Com isso, adotamos uma nova
            identidade: Rede Tradição – A Tua Rede de Postos, refletindo nosso
            compromisso de oferecer não apenas produtos e serviços, mas também
            experiências que facilitam e enriquecem o dia a dia dos nossos
            clientes.
          </p>
          <p className="text-xl leading-8 text-zinc-800">
            Hoje, a Rede Tradição se orgulha de operar com 53 unidades no Rio
            Grande do Sul, 18 em Santa Catarina e 2 no Paraná, além de contar
            com nosso Centro Administrativo em Marau – RS. Cada uma dessas
            unidades reflete nosso propósito de atender com excelência e
            humanização, sempre priorizando a sua satisfação.
          </p>
          <p className="text-xl leading-8 font-bold italic text-zinc-800">
            Rede Tradição, a Tua Rede de Postos. Facilitando Teu Dia.
          </p>
          <Separator />
        </div>
        <div className="flex flex-col md:flex-row gap-24 mb-24">
          <div className="flex flex-col items-center gap-2">
            <span className="uppercase font-light text-[#979797] text-[64px] leading-[89px]">
              Anos
            </span>
            <span className="font-normal text-7xl text-zinc-800">7</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="uppercase font-light text-[#979797] text-[64px] leading-[89px]">
              Postos
            </span>
            <span className="font-normal text-7xl text-zinc-800">70+</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="uppercase font-light text-[#979797] text-[64px] leading-[89px]">
              Clientes
            </span>
            <span className="font-normal text-7xl text-zinc-800">200mil+</span>
          </div>
        </div>
      </section>
      <Carousel
        className="w-[1200px] m-auto p-6 md:p-0 mb-20"
        infinite
        dots
        speed={1500}
        slidesToShow={4}
        slidesToScroll={1}
        autoplay
      >
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Marcio} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Marcio Andre Pagnussat</span>
            <span className="text-md text-zinc-700">CEO</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Eluir} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Elui Seiffert</span>
            <span className="text-md text-zinc-700">Assessor de Novos Negócios e Expansão</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Claudia} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Cláudia Pereto Pagnussat</span>
            <span className="text-md text-zinc-700">Diretora Administrativa</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Milena} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Milena Pereto Pagnussat</span>
            <span className="text-md text-zinc-700">Diretora Administrativa</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Fabio} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Fábio Remedi Trindade</span>
            <span className="text-md text-zinc-700">Assessor de Relação Institucional</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Matheus} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Matheus Brugnera</span>
            <span className="text-md text-zinc-700">Gerente Executivo Combustíveis e Gás</span>
          </Card>
        </div>
        <div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Everton} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Everton Moreno</span>
            <span className="text-md text-zinc-700">Gerente Executivo Financeiro</span>
          </Card>
        </div><div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Paulo} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Paulo Ricardo Sampaio</span>
            <span className="text-md text-zinc-700">Gerente Executivo das Empresas Associadas</span>
          </Card>
        </div><div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Cristiano} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Cristiano Pena</span>
            <span className="text-md text-zinc-700">Gerente Executivo Comercial</span>
          </Card>
        </div><div>
          <Card className="border items-center border-gray-300 w-[284px] gap-2 h-[350px] p-6 flex flex-col">
            <img src={Luciano} alt="logo" className='rounded-md' />
            <span className="text-lg text-zinc-800">Luciano Dall-Alba</span>
            <span className="text-md text-zinc-700">Gerente Executivo Administrativo, Suprimentos e Logística</span>
          </Card>
        </div>
      </Carousel>
    </AppLayout>
  );
}
