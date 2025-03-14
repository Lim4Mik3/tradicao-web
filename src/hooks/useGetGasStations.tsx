import { GetGasStation } from '@/services/GetGasStations';
import { useQuery } from '@tanstack/react-query';

type Props = {
  enabled?: boolean;
}

export function useGetGasStations(props: Props) {
  return useQuery({
    queryKey: ['gas-stations'],
    queryFn: () => GetGasStation(),
    enabled: props.enabled
  });
}