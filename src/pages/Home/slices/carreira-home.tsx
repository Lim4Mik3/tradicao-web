import Call from "@/assets/call.jpeg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function CarreiraSection() {
  return (
    <section className='max-w-[1200px] py-24 gap-24 justify-center items-center m-auto flex flex-col '>
      <img src={Call} alt="call" width={1200} height={700} />
      <Card className="w-[842px] border-0 bg-white -mt-[238px] h-[388px] items-start py-8 pl-8 pr-24 flex flex-col gap-[18px] rounded-xl shadow-2xl">
        <p className="uppercase text-[16px] text-[#1C1C1C]">carreira</p>
        <h2 className="font-bold text-[42px] leading-[63px]">Seu próximo destino profissional é na Rede Tradição!</h2>
        <p className="text-[22px]">Abasteça seu talento e profissionalismo em um de nossos postos, veja nossas vagas abertas.</p>
        <Button variant='link' className="text-[#850B10]">Saiba mais <ArrowRight /></Button>
      </Card>
    </section>
  )
}
