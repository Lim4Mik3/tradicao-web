// src/components/ServicesInput.tsx
import { ServiceCard } from './ServiceCard';
import { useGetResources } from '@/hooks/useGetResources';
import { useState } from 'react';

type Props = {
  title: string;
  onChange?: (selectedIds: string[]) => void;
};

export function ServicesInput({ title, onChange }: Props) {
  const { data, isLoading, error } = useGetResources('SERVICES');
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
    return <div className="flex justify-center">Carregando...</div>;
  }

  if (error) {
    return <div className="flex justify-center">Erro ao carregar serviços: {error.message}</div>;
  }

  const resources = data?.data?.resources || [];

  return (
    <div className="flex flex-col w-full">
      <span className="flex text-sm font-semibold text-gray-600 mb-4">{title}</span>

      <div className="grid grid-cols-5 gap-4 w-full">
        {resources.length > 0 && (
          resources.map((resource) => (
            <ServiceCard
              key={resource.id}
              resource={resource}
              isSelected={selectedIds.includes(resource.id)}
              onToggle={() => toggleSelection(resource.id)}
            />
          ))
        )}
      </div>

      { resources.length === 0 && (
          <p className="text-gray-500 py-12 flex items-center justify-center w-full border border-dashed rounded-md border-gray-300">
            Nenhum serviço encontrado, cadastre um novo para selecionar.
          </p>
        )}
    </div>
  );
}