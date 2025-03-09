import useSWR from 'swr';
import { getPokemon } from '@/services/pokemon';

export function usePokemon(id: string) {
  const { data, isLoading } = useSWR(`pokemon/${id}`, () => getPokemon(id));

  return {
    pokemon: data,
    isPokemonLoading: isLoading,
  };
}
