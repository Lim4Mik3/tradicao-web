import { PencilLine, Trash } from "lucide-react";
import { Fragment, useState } from "react";
import ModalVariant from "./modal-variant";
import { Button } from "./Button";
import dayjs from 'dayjs'
import { useDeleteGasStation } from "@/hooks/useDeleteGasStation";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";

type Props = {
  station: any
  refetch: () => void;
}

export function GasStationBackofficeCard({ station, refetch }: Props) {
  const [deleteModal, setDeleteModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal((prev) => !prev);

  const deleteGasStation = useDeleteGasStation();
  const navigate = useNavigate();

  const handleDeleteGasStation = async () => {
    try {
      await deleteGasStation.mutateAsync({ id: station._id });
      
      refetch()

      toggleDeleteModal()
    } catch (error) {
    }
  }

  const resourceCount = 
    station.apps.length +
    station.brands.length +
    station.conveniences.length +
    station.oilChanges.length +
    station.services.length;

  return (
    <Fragment>
      <div
        className="bg-white max-w-[270px] h-full max-h-[310px] rounded-lg border border-zinc-200 flex flex-col"
      >
        <header className="relative border-b border-zinc-200">
          <img 
            alt={station.name} 
            className="object-cover rounded-t-lg h-[160px] w-full"
            src={station.images[0] || "/logo.png"}
            onLoad={e => {
              e.currentTarget.style.objectFit = "cover";
            }}
            onError={e => {
              e.currentTarget.src = "/logo.png";
              e.currentTarget.style.objectFit = "contain";
            }}
          />

          <div className="absolute right-[10px] top-[10px] flex items-center gap-2">
            <button
              className="relative group hover:cursor-pointer p-2 border border-gray-200 rounded-md bg-zinc-100 hover:brightness-90 transition-all"
              onClick={() => navigate(ROUTES_NAME.EDIT_GAS_STATION.replace(":id", station._id))}
            >
              <div 
                className="bg-zinc-950/95 absolute bottom-[110%] left-1/2 -translate-x-1/2 rounded-md py-1 px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all"
              >
                Editar
              </div>
              <PencilLine 
                size={24}
                className="text-zinc-500"
              />
            </button>

            <button onClick={toggleDeleteModal} className="relative group hover:cursor-pointer p-2 border border-gray-200 rounded-md bg-zinc-100 hover:bg-red-200/80 hover:backdrop-blur-3xl transition-all">
              <div 
                className="bg-red-700/95 absolute bottom-[110%] left-1/2 -translate-x-1/2 rounded-md py-1 px-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all"
              >
                Excluir
              </div>

              <Trash
                size={24}
                className="text-zinc-500"
              />
            </button>
          </div>
        </header>

        <div
          className="bg-slate-50 p-4 h-full flex flex-col"
        >
          <h3 className="text-md text-zinc-950 font-semibold tracking-tight line-clamp-2">
            {station.name}
          </h3>

          <span className="inline-flex mt-1 text-sm text-zinc-800 font-light line-clamp-1">
            {station.address.label} {", "} {station.address.street_number || "N/A"}<br />
          </span>

          {
            resourceCount !== 0
              ? (
                <span className="flex text-green-800 text-xs mt-auto font-medium tracking-wide">{resourceCount} recursos vinculados.</span>
              )
              : (
                <span className="flex text-gray-400 text-xs mt-auto font-medium tracking-wide">Nenhum recurso vinculado.</span>
              )
          }
        </div>
      </div>

      <ModalVariant 
        isOpen={deleteModal} 
        onClose={toggleDeleteModal} 
        title="Deseja excluir essa unidade?"
      >
        <div className="text-zinc-900 flex flex-col gap-4">
          <span className="block">Unidade: <b>{station.name}</b></span>

          <span className="block">Endereço: <b>{station.address.formatted}</b></span>

          <span 
            className="block"
          >
            Unidade criada em: <b>{dayjs(station.createdAt).format("DD/MM/YYYY")}</b>
          </span>
        </div>

        <footer className="flex items-center justify-center mt-10">
          <Button 
            onClick={handleDeleteGasStation} 
            loading={deleteGasStation.isPending} 
            className="mx-auto"
          >
            Excluir
          </Button>
        </footer>
      </ModalVariant>
    </Fragment>
  )

}