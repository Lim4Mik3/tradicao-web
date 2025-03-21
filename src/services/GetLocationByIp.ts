import axios from 'axios';
import { toast } from 'react-toastify';

export interface LocationByIP {
  lat: number;
  lng: number;
}

export const getLocationByIP = async (): Promise<LocationByIP | null> => {
  try {
    const response = await axios.get('http://ip-api.com/json');
    const data = response.data;

    if (response.status === 200) {
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
    return null;
  }
};