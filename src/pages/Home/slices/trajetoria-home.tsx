import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function TrajetoriaHomeSection() {
  return (
    <main className='bg-[#FFFDF1]'>
      <section className='max-w-[1200px] py-24 gap-24 justify-center items-center m-auto flex flex-col '>
        <div className="flex flex-col items-center gap-2 ">
          <div className='flex items-center justify-center w-1/2'>
            <img src={LogoPosto} alt="logo" width={200} height={50} />
          </div>

          <div className='text-center font-bold md:text-end w-full flex text-[52px] text-gray-800'>Sua trajetória segura, com tradição</div>
        </div>
        <div className='flex px-6'>
          <p className=' text-[24px] text-[#282832E5'>
            Desde 2015, a Rede Tradição vem crescendo e inovando para levar
            qualidade e conveniência aos nossos clientes. Com mais de 70 unidades
            espalhadas pelo Sul do Brasil, somos movidos pelo compromisso de
            facilitar o seu dia a dia com produtos e serviços de excelência. Conte
            com a nossa tradição e inovação sempre que precisar. Rede Tradição –
            Facilitando Teu Dia!
          </p>
        </div>
        <Button variant='link' className="text-[#850B10] uppercase">Saiba Mais
          <ArrowRight size={24} />
        </Button>
      </section>
    </main>

  );
}
