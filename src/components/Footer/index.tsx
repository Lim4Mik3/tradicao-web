import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';
import { NavLink } from '../NavLink';

export function Footer() {
  const fullYear = new Date().getFullYear();

  return (
    <footer className="w-full p-6 md:p-0 flex-col  bg-[#FFFAFA] border-t border-gray-300 text-center">
      <div className='md:max-w-[800px] m-auto justify-center grid grid-cols-1 md:grid-cols-2 items-center h-[200px]'>
        <div className="flex gap-4 md:mt-0 items-center  flex-col md:gap-11 md:items-start p-4 justify-center md:max-w-[573px]">
          <img src={LogoPosto} alt="logo" className='w-[200px] h-[50px]' />
        </div>
        <div className="flex items-start justify-center">
          <div className="flex flex-col ">
            <NavLink className="p-2 text-[#D24248] rounded-md transition" to="/institucional">Institucional</NavLink>
            <NavLink className="p-2 text-[#D24248] rounded-md transition" to="/fale-conosco">Fale Conosco</NavLink>
          </div>
        </div>
      </div>
      <div className="flex w-full p-4 items-center justify-center border-t border-gray-300">
        <p className="text-center text-[#D24248] text-foreground">
          Rede de Postos Tradição - Todos os direitos reservados - Copyright {fullYear}
        </p>
      </div>
    </footer>
  );
}
