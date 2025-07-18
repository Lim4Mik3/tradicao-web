import React, { useState } from 'react';
import { useSearchNearbyGasStations } from '@/hooks/useSearchNearbyGasStations';
import { Button } from '@/components/Button';

export function PostGISTestComponent() {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  
  const { data, isLoading, error, refetch } = useSearchNearbyGasStations({
    latitude: location?.lat || 0,
    longitude: location?.lng || 0,
    radiusKm: 10,
    enabled: !!location
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          // Usar São Paulo como padrão
          setLocation({ lat: -23.5505, lng: -46.6333 });
        }
      );
    } else {
      // Usar São Paulo como padrão
      setLocation({ lat: -23.5505, lng: -46.6333 });
    }
  };

  const testWithSaoPaulo = () => {
    setLocation({ lat: -23.5505, lng: -46.6333 });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Teste PostGIS - Busca Geográfica</h2>
      
      <div className="flex gap-4 mb-4">
        <Button onClick={getCurrentLocation}>
          Usar Minha Localização
        </Button>
        <Button onClick={testWithSaoPaulo} variant="outline">
          Testar com São Paulo
        </Button>
      </div>

      {location && (
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p><strong>Localização atual:</strong></p>
          <p>Latitude: {location.lat}</p>
          <p>Longitude: {location.lng}</p>
        </div>
      )}

      {isLoading && (
        <p className="text-blue-600">Buscando postos próximos...</p>
      )}

      {error && (
        <p className="text-red-600">Erro: {error.message}</p>
      )}

      {data && (
        <div>
          <h3 className="font-semibold mb-2">
            Postos encontrados: {data.stations.length}
          </h3>
          {data.stations.length > 0 ? (
            <div className="space-y-2">
              {data.stations.map((station) => (
                <div key={station.id} className="p-3 border rounded">
                  <h4 className="font-medium">{station.name}</h4>
                  <p className="text-sm text-gray-600">
                    Distância: {station.distanceKm.toFixed(2)} km
                  </p>
                  <p className="text-sm text-gray-600">
                    {station.address?.formatted || 'Endereço não disponível'}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Nenhum posto encontrado na região.</p>
          )}
        </div>
      )}

      <div className="mt-4 pt-4 border-t text-sm text-gray-500">
        <p><strong>Como testar:</strong></p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Primeiro, crie um posto usando o formulário</li>
          <li>Depois, use este teste para verificar se a busca geográfica está funcionando</li>
          <li>Se encontrar o posto criado, o PostGIS está funcionando corretamente!</li>
        </ol>
      </div>
    </div>
  );
}
