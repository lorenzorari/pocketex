import useSWR from 'swr';
import { getPokemonAutocompleteItems } from '@/services/pokemon';

export function usePokemonAutocomplete() {
  const { data, isLoading } = useSWR(`pokemon-autocomplete`, () => getPokemonAutocompleteItems());

  return {
    pokemonAutocompleteItems: data ?? [],
    isPokemonAutocompleteLoading: isLoading,
  };
}
