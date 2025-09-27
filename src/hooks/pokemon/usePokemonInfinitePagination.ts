import { useMemo } from 'react';
import useSWRInfinite from 'swr/infinite';
import { usePokemonCounter } from '@/app/explore/contexts/usePokemonCounter';
import { getGenerationPagination } from '@/services/generations';
import { type PokemonByGeneration } from '@/services/pokemon';

const DEFAULT_GENERATION = '0';

export function usePokemonInfinitePagination(
  initialData?: PokemonByGeneration,
  generation: string = DEFAULT_GENERATION,
) {
  const { data, setSize, size, isValidating, isLoading } = useSWRInfinite(getKey, fetchPagination, {
    fallbackData: isDefaultGeneration() && initialData ? [getInitialData()] : undefined,
    revalidateFirstPage: false,
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { pokemonCount, setPokemonCount } = usePokemonCounter();
  const isEndOfList = useMemo(() => {
    console.log('isEndOfList', { data, size, isEnd: !data?.[size - 1]?.next });

    return !data?.[size - 1]?.next;
  }, [data, size]);

  function getInitialData(): PokemonByGeneration {
    return {
      pokemons: initialData?.pokemons ?? [],
      next: initialData?.next ?? null,
      previous: null,
      count: initialData?.count ?? 0,
    };
  }

  function isDefaultGeneration() {
    return generation === DEFAULT_GENERATION;
  }

  function getKey(pageIndex: number, previousPageData: PokemonByGeneration) {
    const isFirstPage = pageIndex === 0;
    const isLastPage = previousPageData && !previousPageData.next;

    if (isLastPage) return null;

    if (isFirstPage) {
      return `/generation/${generation}?limit=20`;
    }

    return previousPageData.next;
  }

  async function fetchPagination(key: string) {
    const [, query] = key.split('?');
    const searchParams = new URLSearchParams(query);
    const offset = Number(searchParams.get('offset'));
    const limit = Number(searchParams.get('limit'));

    if (offset === 0 && isDefaultGeneration()) {
      return getInitialData();
    }

    const { pokemons, next, previous, count } = await getGenerationPagination(generation, offset, limit);
    setPokemonCount({ ...pokemonCount, [generation]: count });

    return { pokemons, next, previous, count };
  }

  return { pagination: data, setSize, size, isValidating, isLoading, isEndOfList };
}
