import Call from '@/assets/call.jpeg';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export function CarreiraSection() {
  return (
    <section className="md:max-w-[1200px] w-full py-24 gap-24 justify-center items-center m-auto flex flex-col ">
      <img src={Call} alt="call" className="md:w-[1200px] md:h-[700px] rounded-md object-cover" />
      <Card className="md:w-[842px] border-0 bg-white -mt-[100px] md:-mt-[238px] md:h-[388px] items-start py-8 pl-8 pr-24 flex flex-col gap-[18px] rounded-xl shadow-2xl">
        <p className="uppercase text-[16px] border-l-2 pl-2 border-[#1C1C1C] text-[#1C1C1C]">carreira</p>
        <h2 className="font-bold text-[#1C1C1C] text-[42px] leading-[63px]">
          Seu próximo destino profissional é na Rede Tradição!
        </h2>
        <p className="text-[22px] text-[#1C1C1C]">
          Abasteça seu talento e profissionalismo em um de nossos postos, veja
          nossas vagas abertas.
        </p>

        <a target='_blank' href="https://painel.umentor.com.br/inteligente_novos/?con_cod=aca479200&pla=5">
          <Button variant="link" className="text-[#850B10]">
            Saiba mais <ArrowRight />
          </Button>
        </a>
      </Card>
    </section>
  );
}
