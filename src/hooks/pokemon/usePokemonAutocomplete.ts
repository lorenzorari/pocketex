import useSWR from "swr";
import { getPokemonAutocompleteItems } from '@/services/pokemon';

export function usePokemonAutocomplete() {
  const {
    data: pokemonAutocompleteItems,
    isLoading: isPokemonAutocompleteLoading,
  } = useSWR(`pokemon-autocomplete`, () => getPokemonAutocompleteItems());

  return {
    pokemonAutocompleteItems,
    isPokemonAutocompleteLoading,
  };
}
