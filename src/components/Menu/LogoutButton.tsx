import { Power } from "lucide-react";
import { Button } from "../Button";

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

export function LogoutButton() {
  const handleOpenConfirmLogoutModal = () => {
    const event = new CustomEvent("openmodal", {
      detail: {
        component: LogoutModal
      },
    });

    window.dispatchEvent(event);
  }

  return (
    <button  
      data-tooltip="Sair" 
      className="hover:brightness-100 hover:cursor-pointer p-4 rounded-full hover:bg-black/20 transition-all" 
      onClick={handleOpenConfirmLogoutModal}
    >
      <Power className="text-gray-900" size={28} />
    </button>
  )
}