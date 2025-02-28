import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CreateResourceHeader() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-between text-zinc-700 w-full max-w-[90%] mx-auto"
    >
      <button
        className="border-2 border-zinc-300 rounded-lg p-2 hover:border-red-400 hover:cursor-pointer transition-all"
        onClick={() => navigate(-1)} // This makes the router goback to the previous page
      >
        <ArrowLeft size={18} className="text-zinc-600" />
      </button>

      <span
        className="text-2xl font-semibold mx-auto"
      >
        Crie um recurso
      </span>
    </div>
  );
}