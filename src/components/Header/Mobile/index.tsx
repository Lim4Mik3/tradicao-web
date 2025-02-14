import { Button } from "@/components/Button";
import { NavLink } from "@/components/NavLink";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden p-4 flex flex-col gap-2 items-end justify-end   z-50">
      {/* Botão do menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-[#D24248] text-white hover:bg-[#D24248] focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col w-full bg-[#D24248] text-white rounded-lg shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col p-2">
              <NavLink className="p-2 hover:bg-[#D24248] rounded-md transition" to="/">Início</NavLink>
              <NavLink className="p-2 hover:bg-[#D24248] rounded-md transition" to="/institucional">Institucional</NavLink>
              <NavLink className="p-2 hover:bg-[#D24248] rounded-md transition" to="/postos">Postos</NavLink>
              <NavLink className="p-2 hover:bg-[#D24248] rounded-md transition" to="/blog">Blog</NavLink>
              <NavLink className="p-2 hover:bg-[#D24248] rounded-md transition" to="/fale-conosco">Contato</NavLink>
              <Button className=' text-white uppercase'>Buscar Posto</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;