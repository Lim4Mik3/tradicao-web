// src/components/GoogleMap.jsx
import { GoogleMap, Marker, MarkerF, useLoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '600px',
  height: '500px',
  borderRadius: '20px',
  boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.25)',
};

const center = {
  lat: -23.5505, // Latitude de São Paulo, por exemplo
  lng: -46.6333, // Longitude de São Paulo, por exemplo
};

const Maps = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyDgb4iW2vKp1_RkIz1lEsnScwbybCW4Luc',
  });

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando o mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      {/* <Marker position={center} /> */}

      <MarkerF
        position={center}
        icon={{
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
              <rect x="0" y="0" width="100" height="100" fill="white" stroke="black" stroke-width="5"/>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="16" fill="black">
                diogo zika
              </text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(50, 50),
        }}
      />
    </GoogleMap>
  );
};

export { Maps };
