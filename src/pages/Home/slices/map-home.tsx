import { Maps } from "@/components/Maps";
import { Button } from "@/components/ui/button";

export function MapSection() {
  return (
    <section className="max-w-[1200px] p-6 m-auto gap-24 grid-cols-1 grid md:grid-cols-2">
      <div className="flex justify-center">
        <Maps />
      </div>
      <div className='flex flex-col items-center md:items-start justify-center md:max-w-[600px] gap-3'>
        <h3 className='text-[#850B10] text-center md:text-start font-bold text-4xl md:text-[46px] leading-[69px]'>A Tua jornada passa pela Tradição.</h3>
        <p className="text-4xl text-gray-600 text-center md:text-start md:text-[46px] leading-[69px]">Descubra o Posto Tradição mais próximo.</p>
        <div>
          <Button variant='default' className='uppercase bg-[#D24248] text-white'>Encontre o Posto</Button>
        </div>

      </div>
    </section>
  );
}