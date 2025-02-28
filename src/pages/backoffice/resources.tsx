import { Button } from "@/components/Button";
import { ROUTES_NAME } from "@/constants/ROUTES_NAME";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ResourceCard from "@/components/ResourceCard";

import { PrivateLayout } from "@/Layouts/PrivateLayout";
import { useGetResources } from "@/hooks/useGetResources";
import { Fragment } from "react";

export function ResourcesPage() {
  const navigate = useNavigate();
  const getResources = useGetResources();

  const resources = getResources.data?.data;
  const isEmpty = resources && resources.length === 0;

  const servicesResources = resources?.filter((item) => item.category === 'SERVICES');
  const appsResources = resources?.filter((item) => item.category === 'APPS');
  const brandsResources = resources?.filter((item) => item.category === 'BRANDS');
  const conviniencesResources = resources?.filter((item) => item.category === 'CONVINIENCES');
  const changeOilsResources = resources?.filter((item) => item.category === 'CHANGE_OIL');

  return (
    <PrivateLayout>
      <div>
        <Button
          className="flex items-center justify-center gap-4 max-w-[300px] w-full"
          onClick={() => navigate(ROUTES_NAME.CREATE_RESOURCE)}
        >
          <Plus />
          
          Criar um recurso
        </Button>
      </div>

      {
        isEmpty && (
          <span
            className="flex items-center justify-center text-lg text-zinc-900 font-medium my-20"
          >
            Nao existe nenhum recurso criado ainda.
          </span>
        )
      }

      {
        getResources.isLoading && (
          <div style={{ '--color': "red" }} className="loader mx-auto" />
        )
      }

      <div className="h-[70vh] overflow-x-hidden mt-10 w-full pr-1">
        {
          servicesResources && servicesResources.length > 0 && (
            <Fragment>
              <span className="flex text-xl text-zinc-800 font-medium">
                Categoria de Serviços
              </span>
              <div className="flex justify-start items-start w-full overflow-auto gap-8 border-b border-gray-400/50 pb-4 whitespace-nowrap pt-6">
                { servicesResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource}
                    reload={getResources.refetch} 
                  />
                )) }
              </div>
            </Fragment>
          )
        }

        {
          appsResources && appsResources.length > 0 && (
            <Fragment>
              <span className="flex mt-10 mb-6 text-xl text-zinc-800 font-medium">
                Categoria de Aplicativos
              </span>
              <div className="flex justify-start items-start overflow-auto gap-8">
                { appsResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource}
                    reload={getResources.refetch} 
                  />
                )) }
              </div>
            </Fragment>
            
            
          )
        }

        {
          brandsResources && brandsResources.length > 0 && (
            <Fragment>
              <span className="flex mt-10 mb-6 text-xl text-zinc-800 font-medium">
                Categoria de Marcas
              </span>
              <div className="flex justify-start items-start overflow-auto gap-8">
                { brandsResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource}
                    reload={getResources.refetch} 
                  />
                )) }
              </div>
            </Fragment>
          )
        }

        {
          conviniencesResources && conviniencesResources.length > 0 && (
            <Fragment>
              <span className="flex mt-10 mb-6 text-xl text-zinc-800 font-medium">
                Categoria de Conveniências
              </span>
              <div className="flex justify-start items-start overflow-auto gap-8">
                { conviniencesResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource}
                    reload={getResources.refetch} 
                  />
                )) }
              </div>
            </Fragment>
          )
        }

        {
          changeOilsResources && changeOilsResources.length > 0 && (
            <Fragment>
              <span className="flex mt-10 mb-6 text-xl text-zinc-800 font-medium">
                Categoria de Troca de Óleo
              </span>
              <div className="flex justify-start items-start overflow-auto gap-8">
                { changeOilsResources.map((resource) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource}
                    reload={getResources.refetch} 
                  />
                )) }
              </div>
            </Fragment>
          )
        }
      </div>
    </PrivateLayout>
  )
}