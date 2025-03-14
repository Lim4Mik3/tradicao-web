import { toast } from 'react-toastify';

export interface LocationByIP {
  lat: number;
  lng: number;
}

export const getLocationByIP = async (): Promise<LocationByIP | null> => {
  try {
    const response = await fetch('http://ip-api.com/json');
    const data = await response.json();

    if (data.status === 'success') {
      return {
        lat: data.lat,
        lng: data.lon,
      };
    } else {
      toast.error('Não foi possível obter a localização por IP.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar localização por IP:', error);
    toast.error('Erro ao buscar localização por IP.');
    return null;
  }
};