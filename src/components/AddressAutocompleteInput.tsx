import { httpClient } from '@/infra/httpClient';
import { debounce } from '@/utils/debounce';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

const GetAddressPredictions = async (inputValue: string) => {
  try {
    const result = await httpClient.get(`/address/suggestions?q=${inputValue}`);

    if (result.data && Array.isArray(result.data)) {
      return result.data.map(item => ({
        label: item.endereco,
        value: item.placeId
      }));
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar previsões:", error);
    return [];
  }
};

const handleGetPredictions = debounce(GetAddressPredictions, 1000);

type Props = {
  label: string;
  value: string;
}

export function AddressAutocompleteInput({ title, onChange }: { title: string, onChange: (event: any) => void; }) {
  const [address, setCurrentAddress] = useState({} as Props);
  const [mapSrc, setMapSrc] = useState('');

  const handleChoosedAddress = (selectedOption: any) => {
    if (selectedOption) {
      const newSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAGaexRL1fyRRl77U05s7MH2Gwg3gjVxNk&q=place_id:${selectedOption.value}`;
      setMapSrc(newSrc);

      onChange(selectedOption.value);

      setCurrentAddress({
        label: selectedOption.label,
        value: selectedOption.value
      })
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
        <AsyncSelect 
          cacheOptions
          menuShouldBlockScroll
          onChange={handleChoosedAddress}
          placeholder="Digite o endereço da unidade"
          noOptionsMessage={() => "Não encontramos nenhum resultado"}
          // @ts-expect-error
          loadOptions={handleGetPredictions}
          classNamePrefix="react-select"
        />
      </div>

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