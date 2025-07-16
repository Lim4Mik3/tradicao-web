// src/components/BrandsInput.tsx
import { ServiceCard } from './ServiceCard';
import { useGetResourcesByCategory } from '@/hooks/useResourcesQueries';
import { useState } from 'react';

type Props = {
  title: string;
  onChange?: (selectedIds: string[]) => void;
};

export function BrandsInput({ title, onChange }: Props) {
  const { data: resources, isLoading, error } = useGetResourcesByCategory('BRANDS');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const newSelectedIds = prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id];
      if (onChange) onChange(newSelectedIds);
      return newSelectedIds;
    });
  };

  if (isLoading) {
    return <div className="flex justify-center">Carregando marcas...</div>;
  }

  if (error) {
    return <div className="flex justify-center text-red-500">Erro ao carregar marcas: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <span className="flex text-sm font-semibold text-gray-600 mb-4">{title}</span>

      <div className="grid grid-cols-5 gap-4">
        {resources && resources.length > 0 ? (
          resources.map((resource) => (
            <ServiceCard
              key={resource.id}
              resource={resource}
              isSelected={selectedIds.includes(resource.id)}
              onToggle={() => toggleSelection(resource.id)}
            />
          ))
        ) : (
          <div className="col-span-5 text-center text-gray-500 py-4">
            Nenhuma marca encontrada. 
            <a href="/backoffice/resources/create" className="text-blue-500 hover:underline ml-1">
              Criar primeira marca
            </a>
          </div>
        )}      </div>
    </div>
  );
}