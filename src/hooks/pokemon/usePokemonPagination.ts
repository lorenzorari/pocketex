import useSWRInfinite from 'swr/infinite';
import { usePokemonCounter } from '@/app/explore/contexts/usePokemonCounter';
import { type PokemonByGeneration } from '@/app/explore/page';

export function usePokemonPagination(initialData?: PokemonByGeneration) {
  const { data, setSize, size, isValidating } = useSWRInfinite(getKey, fetchPagination, {
    fallbackData: initialData
      ? [{ pokemons: initialData.pokemons, next: initialData.next, previous: undefined }]
      : undefined,
    revalidateFirstPage: false,
  });
  const { setPokemonCount } = usePokemonCounter();

  function getKey(pageIndex: number, previousPageData: PokemonByGeneration) {
    const isFirstPage = pageIndex === 0;
    const isLastPage = previousPageData && !previousPageData.next;

    if (isLastPage) return null;

    if (isFirstPage) {
      return `/pokemon-species?limit=20`;
    }

    // add the cursor to the API endpoint
    return previousPageData.next;
  }

  async function fetchPagination(key: string) {
    const [, query] = key.split('?');
    const searchParams = new URLSearchParams(query);
    const offset = Number(searchParams.get('offset'));
    const limit = Number(searchParams.get('limit'));

    const data = await fetch(`/api/generations/0?offset=${offset}&limit=${limit}`);
    const { count, pokemons, next, previous } = (await data.json()) as PokemonByGeneration;
    setPokemonCount(count);

    return { pokemons, next, previous };
  }

  return { pagination: data, setSize, size, isValidating };
}
