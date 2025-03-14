import { httpClient } from '@/infra/httpClient';
import { debounce } from '@/utils/debounce';
import { useState } from 'react';
import AsyncSelect from 'react-select/async'; // Use AsyncSelect explicitamente

const GetManagersPredictions = async (inputValue?: string) => {
  try {
    const url = inputValue
      ? `/user/managers?name=${inputValue}`
      : '/user/managers';

    const result = await httpClient.get(url);

    if (result.data && Array.isArray(result.data.managers)) {
      return result.data.managers.map((manager: { id: string; name: string, email: string }) => ({
        label: `${manager.name}  -  ${manager.email}`,
        value: manager.id,
      }));
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar managers:", error);
    return [];
  }
};

const handleGetPredictions = debounce(GetManagersPredictions, 1000);

type Props = {
  label: string;
  value: string;
};

export function ManagersInput({ title, hasError, onChange }: { 
  title: string; 
  onChange?: (managerId: string) => void; 
  hasError?: string;
}) {
  const [selectedManager, setSelectedManager] = useState<Props | null>(null);

  const handleChoosedManager = (selectedOption: any) => {
    if (selectedOption) {
      setSelectedManager({
        label: selectedOption.label,
        value: selectedOption.value,
      });

      if (onChange) {
        onChange(selectedOption.value);
      }
    } else {
      setSelectedManager(null);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {title && (
        <span className="text-sm font-semibold text-gray-600 mb-1">{title}</span>
      )}

      <div className="flex flex-col w-full">
        <AsyncSelect
          menuShouldBlockScroll
          onChange={handleChoosedManager}
          placeholder="Digite o nome do manager"
          noOptionsMessage={() => "Não encontramos nenhum manager"}
          // @ts-expect-error
          loadOptions={handleGetPredictions}
          classNamePrefix="react-select"
          value={selectedManager}
          defaultOptions
        />

        { hasError && (
          <span className="text-xs font-semibold tracking-wide text-red-500">{hasError}</span>
        )}
      </div>
    </div>
  );
}