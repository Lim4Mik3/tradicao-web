// src/components/GoogleMap.jsx
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

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
    googleMapsApiKey: 'AIzaSyBnkDzNXxlOBOAZ35nOuy3ScjMHqAUVYJE', // Substitua pela sua chave de API
  });

  if (loadError) return <div>Erro ao carregar o mapa</div>;
  if (!isLoaded) return <div>Carregando o mapa...</div>;

  return (
    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={center}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export { Maps };
