import { LogOut, User } from "lucide-react";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";

const LogoutModal = () => {
  const handleLogout = () => {
    localStorage.removeItem("@app::session");

    window.location.href="/login"
    
    handleCloseModal();
  }

  const handleCloseModal = () => {
    const event = new CustomEvent("closemodal");

    window.dispatchEvent(event);
  }

  return (
    <div
      className="bg-slate-100 p-8 rounded-lg border border-s-gray-400 flex flex-col text-gray-900"
    >
      <h1
        className="text-2xl font-semibold text-center tracking-wide"
      >
        Voce deseja mesmo sair?
      </h1>

      <p
        className="my-10 text-md text-slate-700 text-center max-w-[80%] mx-auto"
      >
        Ao sair você precisará entrar novamente para executar operações dentro da plataforma.
      </p>


      <div className="flex items-center justify-center gap-6 mx-auto">
        <Button className="w-[200px]" variant="neutral" onClick={handleCloseModal}>
          Cancelar
        </Button>

        <Button className="w-[200px]" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  )
}

export function SessionButton() {
  const navigate = useNavigate();

  const handleOpenConfirmLogoutModal = () => {
    const event = new CustomEvent("openmodal", {
      detail: {
        component: LogoutModal
      },
    });

    window.dispatchEvent(event);
  }

  return (
    <div className="relative w-14 h-14 rounded-full border border-gray-500/40 group">
      <img src="https://randomuser.me/api/portraits/men/89.jpg" alt="" className="w-14 h-14 rounded-full" />

      <div className="absolute hidden bg-zinc-200 shadow-md rounded-md group-hover:flex hover:flex flex-col gap-2 min-w-[160px] left-0 overflow-hidden bottom-[100%] text-zinc-950">
        <button className="flex items-center justify-center gap-4 w-full p-4 hover:cursor-pointer hover:bg-black/40" onClick={() => navigate(ROUTES_NAME.PROFILE)}>
          Pefil
          <User size={20} className="ml-auto" />
        </button>

        <button className="flex items-center justify-center gap-4 w-full p-4 hover:cursor-pointer hover:bg-black/40" onClick={handleOpenConfirmLogoutModal}>
          Sair
          <LogOut size={20} className="ml-auto" />
        </button>
      </div>
    </div>
  )
}

