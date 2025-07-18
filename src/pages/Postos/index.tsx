import { AppLayout } from '@/Layouts/app';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import Tradicao from "../../../public/tradicao.png"
import { Input } from '@/components/Input';
import { useListGasStationPublic } from '@/hooks/useListGasStationPublic';
import { useGeolocation } from '@/hooks/useGeolocation';

export function PostosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationRequested, setLocationRequested] = useState(false);
  
  const {
    latitude,
    longitude,
    getCurrentPosition,
    isSupported
  } = useGeolocation();

  const userLocation = latitude && longitude 
    ? { latitude, longitude } 
    : null;

  // Solicitar localização automaticamente quando a página carrega
  useEffect(() => {
    if (isSupported && !locationRequested) {
      getCurrentPosition();
      setLocationRequested(true);
    }
  }, [isSupported, locationRequested, getCurrentPosition]);

  const {
    data,
    isLoading,
    isError,
  } = useListGasStationPublic({ 
    term: searchTerm,
    userLocation: userLocation,
    radiusKm: 25
  });

  const stations = (data as any)?.stations || [];
  const totalStations = stations.length;

  const openMapsWithRoute = (station: any) => {
    const [lng, lat] = station.location?.coordinates || [0, 0];
    if (!lat || !lng) return;

    const destination = `${lat},${lng}`;
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isMobile) {
      if (isIOS) {
        // Para iOS - tenta abrir Apple Maps primeiro, depois Google Maps
        const appleMapsUrl = `maps://maps.google.com/maps?daddr=${destination}&amp;ll=`;
        const googleMapsUrl = `comgooglemaps://?daddr=${destination}`;
        const webFallback = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        
        // Tenta Apple Maps
        window.location.href = appleMapsUrl;
        
        // Fallback após 500ms
        setTimeout(() => {
          window.location.href = googleMapsUrl;
          setTimeout(() => {
            window.open(webFallback, '_blank');
          }, 500);
        }, 500);
      } else if (isAndroid) {
        // Para Android - tenta Google Maps app primeiro
        const googleMapsApp = `google.navigation:q=${destination}`;
        const webFallback = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
        
        window.location.href = googleMapsApp;
        
        // Fallback após 500ms
        setTimeout(() => {
          window.open(webFallback, '_blank');
        }, 500);
      }
    } else {
      // Desktop - abre Google Maps web
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    }
  };
  return (
    <AppLayout>
      <Helmet>
        <title>Postos - Posto Tradição</title>
        <meta name="description" content="Conheça nossos pontos de abastecimento." />
      </Helmet>

      <main className="relative pb-20">
        <img 
          src={Tradicao}
          alt="" 
          className="w-full h-[350px] object-cover" 
        />

        <div
          className="transform -translate-y-1/2 bg-white p-10 rounded-md shadow-xl max-w-[60vw] w-full z-10 mx-auto flex items-center justify-between"
        >
          <Input
            title="Busque uma unidade"
            placeholder="Digite o nome ou localidade" 
            className="max-w-[360px]"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
          />

          <div className="min-w-max text-gray-500 flex flex-col items-end">
            {isLoading && (
              <span className="text-sm text-blue-500 font-semibold">Carregando...</span>
            )}
            {!isLoading && (
              <span>
                Encontrado{totalStations > 0 ? ` ${totalStations}` : " 0"} posto{totalStations !== 1 ? "s" : ""}
                {userLocation && " próximos"}
              </span>
            )}
            {isError && (
              <span className="text-sm text-red-500">Erro ao carregar postos</span>
            )}
          </div>
        </div>

        <div className="max-w-[60vw] mx-auto">
          {isLoading && stations.length === 0 ? (
            // Loading inicial
            <div className="grid grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : stations.length === 0 ? (
            // Nenhum resultado encontrado
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {searchTerm ? `Nenhum posto encontrado para "${searchTerm}"` : "Nenhum posto encontrado"}
              </p>
            </div>
          ) : (
            // Resultados encontrados
            <div className="grid grid-cols-4 gap-8">
              {stations.map((station: any) => (
                <div 
                  key={station._id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => openMapsWithRoute(station)}
                >
                  <div className="relative">
                    <img 
                      src={station.images?.[0] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRqLJyvJ2f6apDNFkjPhvbA3XysY6rQxE3LQ&s"} 
                      alt={`Posto ${station.name}`}
                      className="w-full h-48 object-cover"
                    />
                    {/* Máscara degradê para contraste do texto */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90"></div>
                    <div className="absolute bottom-4 left-4 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      {station.name}
                    </div>
                    {/* Mostrar distância quando usando localização */}
                    {userLocation && station.distanceKm && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        {station.distanceKm.toFixed(1)} km
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-6 h-6 text-red-600 flex-shrink-0 mt-1">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {station.address?.label || station.address?.formatted || 
                         `${station.address?.route || ""} ${station.address?.street_number || ""}, ${station.address?.neighborhood || ""}, ${station.address?.city || ""} - ${station.address?.state || ""}`.trim()}
                      </p>
                    </div>
                    
                    <button 
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        openMapsWithRoute(station);
                      }}
                    >
                      <span>Como chegar</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </AppLayout>
  );
}
