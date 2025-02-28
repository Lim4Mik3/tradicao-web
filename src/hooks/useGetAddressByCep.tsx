import { GetAddressByCep } from '@/services/GetAddressByCep';
import { useQuery } from '@tanstack/react-query'

type Props = {
  cep: string;
}

export function useGetAddressByCep({ cep }: Props) {
  return useQuery({
    queryKey: ['address-by-cep', cep],
    queryFn: () => GetAddressByCep({ cep }),
    enabled: cep.replace(/\D/g, "").length === 8
  })
}