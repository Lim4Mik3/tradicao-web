import React from 'react';
import { useGetResources } from '@/hooks/useResourcesQueries';
import { ResourceModel } from '@/models/Resource';

// Exemplo de componente para listar recursos
export function ResourcesList() {
  const { data: resources, isLoading, error } = useGetResources();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
        <p className="text-red-600">Erro ao carregar recursos: {error.message}</p>
      </div>
    );
  }

  if (!resources || resources.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Nenhum recurso encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
}

// Componente para exibir um recurso individual
function ResourceCard({ resource }: { resource: ResourceModel }) {
  const getCategoryLabel = (category: string) => {
    const options = [
      { value: 'SERVICES', label: 'Serviços' },
      { value: 'APPS', label: 'Aplicativos' },
      { value: 'BRANDS', label: 'Marcas' },
      { value: 'CONVINIENCES', label: 'Conveniências' },
      { value: 'CHANGE_OIL', label: 'Troca de Óleo' },
    ];
    return options.find(option => option.value === category)?.label || category;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'SERVICES': 'bg-blue-100 text-blue-800',
      'APPS': 'bg-indigo-100 text-indigo-800',
      'BRANDS': 'bg-purple-100 text-purple-800',
      'CONVINIENCES': 'bg-red-100 text-red-800',
      'CHANGE_OIL': 'bg-orange-100 text-orange-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {resource.image && (
        <div className="aspect-video w-full">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{resource.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
            {getCategoryLabel(resource.category)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500">
          Criado em {new Date(resource.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </div>
    </div>
  );
}
