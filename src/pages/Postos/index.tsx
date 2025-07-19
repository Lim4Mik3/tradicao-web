import { AppLayout } from '@/Layouts/app';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';

import Tradicao from "../../../public/tradicao.png"
import { Input } from '@/components/Input';
import { useListGasStationPublic } from '@/hooks/useListGasStationPublic';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Clock, Cog, Locate, Mail, MapPin, Phone } from 'lucide-react';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

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
        <title>Postos – Posto Tradição</title>
        <meta name="description" content="Conheça nossos pontos de abastecimento." />
      </Helmet>

      <main className="relative pb-20">
        <img 
          src={Tradicao}
          alt="Imagem do Posto Tradição" 
          className="w-full h-[350px] object-cover" 
        />

        <div
          className="transform -translate-y-1/2 bg-white p-4 md:p-8 lg:p-10 rounded-md shadow-xl max-w-[1200px] w-full z-10 mx-auto flex flex-col md:flex-row items-center justify-between"
        >
          <Input
            title="Busque uma unidade"
            placeholder="Digite o nome ou localidade" 
            className="max-w-[360px]"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
          />

          <div className="min-w-max text-gray-500 flex flex-col sm:items-end mt-4">
            {isLoading && (
              <span className="text-sm text-blue-500 font-semibold">Carregando…</span>
            )}
            {!isLoading && (
              <span>
                Encontrado{totalStations > 0 ? ` ${totalStations}` : " 0"} posto{totalStations !== 1 ? "s" : ""}
              </span>
            )}
            {isError && (
              <span className="text-sm text-red-500">Erro ao carregar postos</span>
            )}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-8 lg:px-0">
          {isLoading && stations.length === 0 ? (
            // Loading inicial
            <div className="grid grid-cols-1 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
              ))}
            </div>
          ) : stations.length === 0 ? (
            // Nenhum resultado encontrado
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {searchTerm ? `Nenhum posto encontrado para “${searchTerm}”` : "Nenhum posto encontrado"}
              </p>
            </div>
          ) : (
            // Resultados encontrados
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {stations.map((station: any) => (
                <div 
                  key={station._id} 
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-300"
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
                      <div className="absolute top-4 right-4 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        {station.distanceKm.toFixed(1)} km
                      </div>
                    )}
                  </div>
                  
                  <div className="p-3 flex flex-col flex-1">
                    <div className='flex flex-col gap-1 mb-3'>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        <MapPin size={12} className='inline-flex mr-1 text-slate-900' />
                        {station.address?.label}
                      </p>

                      <p className="text-gray-700 text-xs leading-relaxed truncate">
                        <Phone size={12} className='inline-flex mr-1 text-slate-900' />
                        <a href={`tel:${station.phone}`} className="hover:underline text-ellipsis overflow-hidden whitespace-nowrap">
                          {formatPhoneNumber(station.phone)}
                        </a>
                      </p>

                      <p className="text-gray-700 text-xs leading-relaxed truncate">
                        <Mail size={12} className='inline-flex mr-1 text-slate-900' />
                        <a href={`mailto:${station.email}`} className="hover:underline text-ellipsis overflow-hidden whitespace-nowrap">
                          {station.email}
                        </a>
                      </p>

                      <div className='border-t border-gray-300 mt-2 py-2'>
                        <p className="text-gray-700 text-xs leading-relaxed truncate">
                          <Clock size={12} className='inline-flex mr-1 text-slate-900 font-bold' />
                          
                          <span className='font-semibold'>Horários de funcionamento:</span>

                          <span className='block mt-1 ml-2'>Seg. a Sáb.: {station.comercial_hours}</span>
                          <span className='block mt-1 ml-2'>Dom. e feriados: {station.holidays_hours}</span>
                        </p>
                      </div>

                      {/* <div className='border-t border-gray-300 mt-2 py-2'>
                        <p className="text-gray-700 text-xs leading-relaxed truncate">
                          <Cog size={12} className='inline-flex mr-1 text-slate-900 font-bold' />
                          <span className='font-semibold'>Serviços:</span>

                          <span className='block mt-1 ml-2'>Seg. a Sáb.: {station.comercial_hours}</span>
                          <span className='block mt-1 ml-2'>Dom. e feriados: {station.holidays_hours}</span>
                        </p>
                      </div> */}
                    </div>
                    
                    <button 
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium mt-auto cursor-pointer"
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
