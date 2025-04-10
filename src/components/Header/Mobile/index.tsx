import LogoPosto from '@/assets/Logos-Parceiros/Rede_Tradicao.png';
import { NavLink } from '@/components/NavLink';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden bg-white p-4 flex flex-col gap-2 items-end justify-end   z-50">
      <div className='flex w-full items-center justify-between'>
        <a href="/">
          <img src={LogoPosto} alt="logo" className='max-h-10 h-full aspect-[3.4]' />
        </a>
        {/* Botão do menu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg  text-[#FE1112] focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>


      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full bg-white text-[#FE1112] rounded-lg shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-2">
              <NavLink
                className="p-2 hover:bg-red-300 rounded-md transition"
                to="/"
              >
                Início
              </NavLink>
              <NavLink
                className="p-2 hover:bg-red-300 rounded-md transition"
                to="/institucional"
              >
                Institucional
              </NavLink>
              <NavLink
                className="p-2 hover:bg-red-300 rounded-md transition"
                to="/postos"
              >
                Postos
              </NavLink>
              <NavLink
                className="p-2 hover:bg-red-300 rounded-md transition"
                to="/blog"
              >
                Blog
              </NavLink>
              <NavLink
                className="p-2 hover:bg-red-300 rounded-md transition"
                to="/fale-conosco"
              >
                Contato
              </NavLink>
              <Button className="text-white bg-[#FE1112] uppercase">Buscar Posto</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
