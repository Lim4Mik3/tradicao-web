import { useGetGasStations } from '@/hooks/useGetGasStations';
import { getLocationByIP } from '@/services/GetLocationByIp';
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '../Button';

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
  const [selectedStation, setSelectedStation] = useState(null);
  const [preciseLocation, setPreciseLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedStationDetails, setSelectedStationDetails] = useState(null);
  let mapRef = useRef<google.maps.Map>(null);

  const state = useGetGasStations({
    enabled: !!preciseLocation,
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDgb4iW2vKp1_RkIz1lEsnScwbybCW4Luc',
  });

  useEffect(() => {
    if (!preciseLocation) {
      const fetchInitialLocation = async () => {
        const location = await getLocationByIP();


        if (location) {
          setPreciseLocation(location);
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
          return toast.error('A localização não pode ser encontrada.');
        }

        toast.error('Aconteceu um erro ao pegar a localização.');
      }
    );
  };

  const fitMapToMarkers = () => {
    if (!mapRef.current) return;

    const bounds = new window.google.maps.LatLngBounds();

    if (preciseLocation) {
      bounds.extend(preciseLocation);
    }

    if (state.data?.stations && state.data.stations.length > 0) {
      state.data.stations.forEach(({ address }) => {
        bounds.extend({
          lat: address.coordinates[0],
          lng: address.coordinates[1],
        });
      });
    }

    if (!bounds.isEmpty()) {
      mapRef.current.fitBounds(bounds);

      const listener = window.google.maps.event.addListenerOnce(mapRef.current, 'bounds_changed', () => {
        if (mapRef.current && mapRef.current.getZoom() > 15) {
          mapRef.current.setZoom(15);
        }
      });
      setTimeout(() => window.google.maps.event.removeListener(listener), 1000);
    } else {
      // TODO: Caso não haja marcadores nem localização, define um centro padrão
      mapRef.current.setCenter({ lat: 0, lng: 0 });
      mapRef.current.setZoom(2);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      fitMapToMarkers();
    }
  }, [state.data?.stations, preciseLocation]);

  const handleDetailsClick = (station) => {
    setSelectedStationDetails(station);
    setShowDetails(true);
    setSelectedStation(null);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedStationDetails(null);
  };

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando o mapa...</div>;

  return (
    <>
      <GoogleMap
        mapContainerClassName="w-full h-full rounded-md relative border border-zinc-300"
        zoom={12}
        center={preciseLocation || { lat: 0, lng: 0 }} // Usa a localização do usuário, se disponível
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
          fitMapToMarkers();
        }}
      >
        {state.data?.stations.map((station) => (
          <MarkerF
            key={station.id}
            position={{ lat: station.address.coordinates[0], lng: station.address.coordinates[1] }}
            icon={{
              url: '/bg-icon.png',
              scaledSize: new window.google.maps.Size(50, 50),
              anchor: new window.google.maps.Point(25, 25),
            }}
            onClick={() => setSelectedStation(station)}
          >
            {selectedStation?.id === station.id && (
              <InfoWindowF
                position={{
                  lat: station.address.coordinates[0],
                  lng: station.address.coordinates[1]
                }}
                onCloseClick={() => setSelectedStation(null)}
                options={{ headerDisabled: true }}
              >
                <div className='p-4'>
                  <h3 className='text-xl text-zinc-900 tracking-wide font-semibold mb-4'>
                    {station.name}
                  </h3>
                  <p className='text-xs text-zinc-700'>{station.address.formatted}</p>


                  <Button className='mt-10'>
                    Ver detalhes
                  </Button>
                </div>
              </InfoWindowF>
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
