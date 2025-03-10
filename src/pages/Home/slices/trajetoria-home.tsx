import { ROUTES_NAME } from '@/constants/ROUTES_NAME';
import { NavLink } from '../../../components/NavLink';
import { ArrowRight } from 'lucide-react';

export function TrajetoriaHomeSection() {
  return (
    <main className="bg-[#f5d335]">
      <section className="max-w-[1200px] py-12 gap-12 justify-center items-center m-auto flex flex-col ">
        <div className="flex flex-col md:flex-row items-center gap-2 ">
          <h1 className="text-center font-bold md:text-end w-full flex text-[52px] text-[#850B10]">
            Sua trajetória segura, com tradição
          </h1>
        </div>
        <div className="flex px-6">
          <p className=" text-[24px] text-gray-800">
            Desde 2015, a Rede Tradição vem crescendo e inovando para levar
            qualidade e conveniência aos nossos clientes. Com mais de 70
            unidades espalhadas pelo Sul do Brasil, somos movidos pelo
            compromisso de facilitar o seu dia a dia com produtos e serviços de
            excelência. Conte com a nossa tradição e inovação sempre que
            precisar. Rede Tradição – Facilitando Teu Dia!
          </p>
        </div>
        <NavLink to={ROUTES_NAME.INSTITUTIONAL} className="text-[#850B10] uppercase flex items-center gap-2">
          Saiba Mais
          <ArrowRight size={24} />
        </NavLink>
      </section>
    </main>
  );
}
