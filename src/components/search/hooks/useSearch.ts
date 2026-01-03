import { useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { useLocalStorage } from 'usehooks-ts';
import { getAllPokemons, type PokemonSearchItem } from '@/services/pokemon';

const POKEMON_QUANTITY_LIMIT = 10;
const RECENT_SEARCHES_LIMIT = 8;

export function useSearch() {
  const router = useRouter();
  const { data: allPokemons, isLoading: isFetchingPokemon } = useSWR(`pokemon-autocomplete`, getAllPokemons, {
    fallbackData: [],
  });
  const [recentSearches, setRecentSearches] = useLocalStorage<PokemonSearchItem[]>('recentSearches', [], {
    initializeWithValue: false,
  });

  const [query, setQuery] = useState<string>('');

  const filteredPokemons = useMemo(() => {
    if (!query) return allPokemons.slice(0, POKEMON_QUANTITY_LIMIT);

    const q = query.toLowerCase();
    const filteredItems = allPokemons.filter(({ name, id }) => {
      if (isNaN(+q)) return name.toLowerCase().includes(q);
      console.log(id, q);

      return id.toString().includes(q);
    });

    return filteredItems.slice(0, POKEMON_QUANTITY_LIMIT);
  }, [allPokemons, query]);

  const showRecentSearches = useMemo(() => !query && recentSearches.length > 0, [query, recentSearches]);
  const showPokemonGroup = useMemo(() => query && filteredPokemons.length > 0, [query, filteredPokemons]);
  const showNoResults = useMemo(() => !isFetchingPokemon && query, [query, isFetchingPokemon]);

  function handleSelect(suggestion: PokemonSearchItem) {
    handleRecentSearches(suggestion);
    router.push(`/pokemon/${suggestion.name}`);
  }

  function handleRecentSearches(suggestion: PokemonSearchItem) {
    const isLimitReached = recentSearches.length === RECENT_SEARCHES_LIMIT;
    const newRecentSearches = isLimitReached ? recentSearches.slice(0, RECENT_SEARCHES_LIMIT - 1) : recentSearches;
    const alreadyExists = newRecentSearches.findIndex((recentSearch) => recentSearch.id === suggestion.id);

    if (alreadyExists > -1) {
      newRecentSearches.splice(alreadyExists, 1);
    }

    newRecentSearches.unshift(suggestion);
    setRecentSearches(newRecentSearches);
  }

  function removeAllRecentSearches() {
    setRecentSearches([]);
  }

  return {
    allPokemons,
    isFetchingPokemon,
    filteredPokemons,
    query,
    setQuery,
    recentSearches,
    handleSelect,
    showRecentSearches,
    showPokemonGroup,
    showNoResults,
    removeAllRecentSearches,
  };
}
