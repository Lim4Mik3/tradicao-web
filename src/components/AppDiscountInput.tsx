// src/components/AppsInput.tsx
import { ServiceCard } from './ServiceCard';
import { useGetResources } from '@/hooks/useGetResources';
import { useState } from 'react';

type Props = {
  title: string;
  onChange?: (selectedIds: string[]) => void;
};

export function AppsInput({ title, onChange }: Props) {
  const { data, isLoading, error } = useGetResources('APPS');
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
    return <div className="flex justify-center text-red-500">Erro ao carregar apps: {error.message}</div>;
  }

  const resources = data?.data?.resources || [];

  return (
    <div className="flex flex-col w-full">
      <span className="flex text-sm font-semibold text-gray-600 mb-4">{title}</span>

      <div className="grid grid-cols-5 gap-4">
        {resources.length > 0 ? (
          resources.map((resource) => (
            <ServiceCard
              key={resource.id}
              resource={resource}
              isSelected={selectedIds.includes(resource.id)}
              onToggle={() => toggleSelection(resource.id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full py-8">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-500 text-center">
              Nenhum recurso de app cadastrado, cadastre um e aparecerá aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}