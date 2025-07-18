import { Bolt, Pencil, Trash2 } from "lucide-react"
import ModalVariant from "./modal-variant"
import { Fragment, useState } from "react"
import { Button } from "./Button";
import { useDeleteResource } from "@/hooks/useDeleteResource";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { ResourceModel } from "@/models/Resource";

const CATEGORY_MAP = {
  "SERVICES": "Serviços",
  "APPS": "Aplicativos",
  "BRANDS": "Marcas",
  "CONVINIENCES": "Conveniência",
  "CHANGE_OIL": "Troca de Óleo"
} as const;

type Props = {
  resource: ResourceModel, 
  reload: () => void;
}

export default function ResourceCard({ resource, reload }: Props) {
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteResource = useDeleteResource()
  
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const handleDeleteResource = async () => {
    try {
      await deleteResource.mutateAsync(resource.id);
      reload();
      toggleDeleteModal();
    } catch (error) {
      // Aqui você pode adicionar uma notificação de erro
    }
  }
  

  return (
    <Fragment>
      <div className="max-w-[260px] w-full bg-white rounded-3xl shadow-sm h-fit">
        <div className="p-4 flex items-center justify-end border-b">
          <button 
            onClick={() => navigate(ROUTES_NAME.EDIT_RESOURCE.replace(':id', resource.id))} 
            className="p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer"
          >
            <Pencil className="w-5 h-5 text-gray-500" />
          </button>

          <button 
            onClick={toggleDeleteModal} 
            className="p-2 rounded-md hover:bg-gray-100 hover:cursor-pointer"
          >
            <Trash2 className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            {
              resource.image
                ? (
                  <img src={resource.image} alt={resource.title} className="w-10 h-10 object-cover rounded-sm" />
                )
                : (
                  <Bolt className="w-8 h-8 text-red-500 stroke-2" />
                )
            }
          </div>

          <h2 className="text-2xl text-left font-bold text-slate-800 mb-1 w-full break-words md:truncate">
            {resource.title}
          </h2>

          <span className="text-zinc-700">{CATEGORY_MAP[resource.category]}</span>
        </div>
      </div>

      <ModalVariant 
        isOpen={isDeleteModalOpen} 
        onClose={toggleDeleteModal} 
        title="Confirmação de exclusão"
      >
        <div className="text-gray-700">
          <h2>Você deseja excluir o recurso <span className="font-semibold">{resource.title}</span> ?</h2>

          <div className="flex items-center justify-around mt-10" >
            <Button variant="neutral" onClick={toggleDeleteModal}>
              Cancelar
            </Button>
            
            <Button 
              loading={deleteResource.isPending} 
              onClick={handleDeleteResource}
            >
              Excluir
            </Button>
          </div>
        </div>
      </ModalVariant>
    </Fragment>
  )
}

