import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';
import { NavLink } from '../NavLink';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export function Header() {
  return (
    <header className="md:flex hidden bg-white flex-col z-40 w-full items-center justify-center">
      <div className="flex h-24 max-w-[1200px] px-4 items-center justify-between w-full">
        <a href="/" className='mr-4'>
          <img src={LogoPosto} alt="logo" className='max-h-14 h-full object-contain' />
        </a>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/institucional">Institucional</NavLink>
          <NavLink to="/postos">Postos</NavLink>
          <NavLink to="/fale-conosco">Contato</NavLink>
          <NavLink to="https://www.contatoseguro.com.br/grupotradicao">Ouvidoria</NavLink>

          <Button asChild className="bg-[#D24248] text-white uppercase p-6 ml-10">
            <a href="/postos">
              Buscar Posto
            </a>
          </Button>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
