import useSWRInfinite from 'swr/infinite';
import { usePokemonCounter } from '@/app/explore/contexts/usePokemonCounter';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { getPokemon } from '@/services/pokemon';
import { getSpeciesPagination } from '@/services/species';

export function usePokemonPagination() {
  const { data, setSize, size, isValidating } = useSWRInfinite(getKey, fetchPagination);
  const { setPokemonCount } = usePokemonCounter();

  function getKey(pageIndex: number, previousPageData: any) {
    const isFirstPage = pageIndex === 0;
    const isLastPage = previousPageData && !previousPageData.next;

    if (isLastPage) return null;

    if (isFirstPage) return `/pokemon-species?limit=20`;

    // add the cursor to the API endpoint
    return previousPageData.next.split('v2')[1];
  }

  async function fetchPagination(key: string) {
    const [, query] = key.split('?');

    const searchParams = new URLSearchParams(query);
    const offset = Number(searchParams.get('offset'));
    const limit = Number(searchParams.get('limit'));

    const { results, previous, next, count } = await getSpeciesPagination(offset, limit);
    const pokemons = await loadPokemons(results);
    setPokemonCount(count);

    return { pokemons, next, previous };
  }

  async function loadPokemons(data: NamedAPIResource[] | undefined) {
    if (!data) return [];

    const pokemons = await Promise.all(data.map(async ({ name }) => await getPokemon(name)));

    return pokemons;
  }

  return { pagination: data, setSize, size, isValidating };
}
