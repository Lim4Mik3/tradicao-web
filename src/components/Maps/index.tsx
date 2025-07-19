import { useGetGasStations } from '@/hooks/useGetGasStations';
import { getLocationByIP } from '@/services/GetLocationByIp';
import { GoogleMap, InfoWindowF, MarkerF, OverlayView, useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import { CircleX } from 'lucide-react';

const mapOptions: google.maps.MapOptions = {
  streetViewControl: false,
  fullscreenControl: false,
  mapTypeControl: false,
  styles: [
    {
      featureType: "poi", // Remove todos os pontos de interesse
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const Maps = () => {
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [preciseLocation, setPreciseLocation] = useState<{ lat: number; lng: number } | null>(null);
  let mapRef = useRef<google.maps.Map | null>(null);

  const state = useGetGasStations();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDgb4iW2vKp1_RkIz1lEsnScwbybCW4Luc',
  });

  useEffect(() => {
    if (!preciseLocation) {
      const fetchInitialLocation = async () => {
        try {
          const location = await getLocationByIP();
          if (location) {
            setPreciseLocation(location);
          }
        } catch (error) {
          // Continua sem localização, usando coordenadas padrão
        }
      };

      fetchInitialLocation();
    }
  }, []);

  const handleGetPreciseLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPreciseLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        toast.success('Buscando por localização atual');
      },
      (denied) => {
        if (denied.PERMISSION_DENIED) {
          return toast.error('Não foi permitida a localização atual.');
        }

        if (denied.POSITION_UNAVAILABLE) {
          // return toast.error('A localização não pode ser encontrada.');
        }

        toast.error('Aconteceu um erro ao pegar a localização.');
      }
    );
  };

  const handleDetailsClick = () => {
    window.location.href = '/postos';
  };

  const fitMapToMarkers = () => {
    if (!mapRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();

    if (preciseLocation) {
      bounds.extend(preciseLocation);
    }

    if (state.data?.stations && state.data.stations.length > 0) {        state.data.stations.forEach(({ address }) => {
        bounds.extend({
          lat: address.coordinates[1], // PostGIS format: [lng, lat]
          lng: address.coordinates[0], // So coordinates[1] = lat, coordinates[0] = lng
        });
      });
    }

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds);

      const listener = window.google.maps.event.addListenerOnce(mapRef.current, 'bounds_changed', () => {
        const currentZoom = mapRef.current?.getZoom();
        if (mapRef.current && currentZoom && currentZoom > 15) {
          mapRef.current.setZoom(15);
        }
      });
      setTimeout(() => {
        if (listener) {
          window.google.maps.event.removeListener(listener);
        }
      }, 1000);
    } else {
      // Caso não haja marcadores nem localização, foca na região Sul do Brasil
      mapRef.current.setCenter({ lat: -28.5, lng: -51.5 });
      mapRef.current.setZoom(7);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      fitMapToMarkers();
    }
  }, [state.data?.stations, preciseLocation]);

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

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando o mapa...</div>;

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-full rounded-md relative border border-zinc-300"
        zoom={7} // Zoom reduzido para mostrar toda região Sul
        center={preciseLocation || { lat: -28.5, lng: -51.5 }} // Centro da região Sul do Brasil (SC/RS)
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
          fitMapToMarkers();
        }}
      >
        {state.data?.stations?.map((station) => (
          <MarkerF
            key={station.id}
            position={{ lat: station.address.coordinates[1], lng: station.address.coordinates[0] }}
            icon={{
              url: '/bg-icon.png',
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 25),
            }}
            onClick={() => setSelectedStation(station)}
          >
            {selectedStation?.id === station.id && (
              <OverlayView
                position={{ lat: selectedStation.address.coordinates[1], lng: selectedStation.address.coordinates[0] }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <div className='flex relative overflow-hidden min-w-max flex-col rounded-lg'>
                  <button type='button' className='absolute top-2 right-2 z-10 bg-black/20 rounded-full p-1 cursor-pointer shadow-md hover:bg-black/30 transition-colors' onClick={() => setSelectedStation(null)}>
                    <CircleX />
                  </button>

                  <img 
                    src={selectedStation.images[0]} 
                    alt={selectedStation.name} 
                    className='object-cover w-[260px] h-[150px]'
                  />
                  <div
                    className='p-4 bg-white max-w-[260px] space-y-2'
                  >
                    <p className='text-sm text-gray-900 font-semibold'>{selectedStation.name}</p>

                    <span className='text-xs text-gray-600'>
                      {selectedStation.address.label}
                    </span>

                    <button 
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium mt-2 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        openMapsWithRoute(selectedStation);
                      }}
                    >
                      <span>Como chegar</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </OverlayView>
            )}
          </MarkerF>
        ))}

        <div className="absolute bg-white/20 h-14 left-1/2 -translate-x-1/2 bottom-5 flex items-center justify-center opacity-40 hover:opacity-100 transition-all">
          <Button onClick={handleGetPreciseLocation}>Buscar próximos</Button>
        </div>
      </GoogleMap>

      {/* {showDetails && selectedStationDetails && (
        <div className='bg-red-500 p-10'>
          <button
            onClick={closeDetails}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
            {selectedStationDetails.name}
            <span style={{ fontSize: '12px', color: '#666' }}> (Posto bem avaliado)</span>
          </h3>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>
            {selectedStationDetails.address.formatted}
          </p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '5px' }}>
              Produtos
            </button>
            <button style={{ background: '#f0f0f0', border: '1px solid #ccc', padding: '5px' }}>
              Serviços Adicionais
            </button>
          </div>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Tel: (11) 3958-6000</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            {state.data?.stations
              .find((s) => s.id === selectedStationDetails.id)
              ?.images.slice(0, 2)
              .map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Imagem ${index + 1} do posto`}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                />
              ))}
          </div>
          <button
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Navegar
          </button>
        </div>
      )} */}
    </>
  );
};

export { Maps };
