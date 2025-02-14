import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';
import { NavLink } from '../NavLink';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export function Header() {
  return (
    <header className="md:flex hidden bg-white flex-col z-40 w-full items-center justify-center">
      <div className="flex h-24 max-w-[1200px] items-center justify-between gap-[480px]">
        <div className="flex">
          <img src={LogoPosto} alt="logo" width={200} height={50} />
        </div>

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/institucional">Institucional</NavLink>
          <NavLink to="/postos">Postos</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/fale-conosco">Contato</NavLink>
          <Button className='bg-[#D24248] text-white uppercase'>Buscar Posto</Button>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
