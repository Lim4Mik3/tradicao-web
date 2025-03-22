import { ListGasStation } from "@/services/ListGasStation";
import { debounce } from "@/utils/debounce";
import { useInfiniteQuery } from "@tanstack/react-query";

interface UseGasStationsParams {
  term?: string;
  limit?: number;
}

let cache = {};

export const useListGasStation = ({ term, limit = 15 }: UseGasStationsParams) => {
  const debouncedFetch = debounce(async (params: { term?: string; page: number; limit: number }) => {
    if (params.term && params.term.length < 3) {
      return cache;
    }

    const result = await ListGasStation({
      term: params.term,
      page: params.page,
      limit: params.limit,
    });

    cache = result;

    return result;
  }, 500);

  return useInfiniteQuery({
    queryKey: ["gas-station", term, limit],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await debouncedFetch({ term, page: pageParam, limit });

      if (!!result) {
        return result;
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage && lastPage.stations.length < limit) {
        return cache;
      }
      return lastPage?.page + 1;
    },
    initialPageParam: 1,
    staleTime: 0,
    // Evita que o erro "Termo de busca muito curto" seja tratado como um erro real
    retry: (failureCount, error) => {
      if (error.message === "Termo de busca muito curto, mantendo o último resultado") {
        return false;
      }
      return failureCount < 3;
    },
  });
};