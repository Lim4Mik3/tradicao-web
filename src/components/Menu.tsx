import { Fuel, Power } from "lucide-react";
import { Link } from "react-router-dom";


export function Menu() {
  return (
    <aside
      className="h-full py-8 bg-red-400 w-full max-w-[100px] flex flex-col items-center justify-between"
    >
      <img 
        alt="Short Logo" 
        src="/logo-tradicao.jpeg" 
        className="w-15 h-15"
      />

      <nav>
        <Link to="/dashboard/gas-stations" data-tooltip="Unidades" className="hover:brightness-110">
          <Fuel size={28} color="white" className="hover:brightness-75 transition-all" />
        </Link>
      </nav>

      <button data-tooltip="Sair" className="hover:brightness-100" >
        <Power color="white" size={24} />
      </button>
    </aside>
  )
}