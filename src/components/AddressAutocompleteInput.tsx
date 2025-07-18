import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { AddressService, type AddressOption } from '@/services/addressService';
import { debounceAsync } from '@/utils/debounceAsync';

const handleGetPredictions = debounceAsync(AddressService.searchAddresses, 500);

interface AddressAutocompleteInputProps {
  title: string;
  onChange: (place: any) => void;
  hasError?: string;
  value?: any;
}

export function AddressAutocompleteInput({ title, hasError, onChange, value }: AddressAutocompleteInputProps) {
  const [mapSrc, setMapSrc] = useState(value?.value?.place_id ? 
    `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=place_id:${value.value.place_id}` : 
    '');

  const handleChoosedAddress = (selectedOption: AddressOption | null) => {
    if (selectedOption) {
      // Usar o place_id para criar o mapa
      const newSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=place_id:${selectedOption.value.place_id}`;
      setMapSrc(newSrc);

      onChange(selectedOption);
    } else {
      // Limpar quando não há seleção
      setMapSrc('');
      onChange('');
    }
  };
  
  return (
    <div className="flex flex-col w-full">
      { title && (
        <span
          className="text-sm font-semibold text-gray-600 mb-1"
        >
          {title}
        </span>
      )}

      <div
        className='flex flex-col w-full'
      >
        <AsyncSelect<AddressOption>
          cacheOptions
          defaultOptions={false}
          menuShouldBlockScroll
          isClearable
          onChange={handleChoosedAddress}
          value={value ? { label: value.label, value: value.value.place_id } : null}
          placeholder="Digite o endereço da unidade"
          noOptionsMessage={({ inputValue }) => 
            inputValue.length < 3 
              ? "Digite pelo menos 3 caracteres" 
              : "Não encontramos nenhum resultado"
          }
          loadingMessage={() => "Buscando endereços..."}
          loadOptions={handleGetPredictions}
          classNamePrefix="react-select"
        />
      </div>

      { hasError && (
        <span className="text-xs font-semibold tracking-wide text-red-500">{hasError}</span>
      )}

      { mapSrc && (
        <iframe
          loading="lazy"
          className='w-full min-h-[350px] h-full rounded-2xl mt-4'
          referrerPolicy="no-referrer-when-downgrade"
          src={mapSrc}
        >
        </iframe>
      )}
    </div>
  )
}

// 