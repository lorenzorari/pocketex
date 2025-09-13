import { type PokemonAutocompleteItem } from '@/components/autocomplete/types';
import { POKEMON_QUANTITY } from '@/constants';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { getAnthropometry } from '@/helpers/getAnthropometry';
import { api, pokeapi } from '@/helpers/http';
import { type Pokemon } from '@/models/pokemon';
import { type PokemonPagination } from '@/models/pokemon/pagination';
import { type PokemonType } from '@/models/pokemon/type';
import { capitalize } from '@/utils/capitalize';

export interface PokemonCardInfo {
  id: number;
  name: string;
  types: PokemonType[];
}

const getPokemon = async (id: string): Promise<Pokemon | null> => {
  try {
    const pokemonData = await api<Pokemon>(`pokemon/${id}`);

    pokemonData.name = capitalize(pokemonData?.name ?? '');
    pokemonData.height = getAnthropometry(pokemonData.height ?? -1);
    pokemonData.weight = getAnthropometry(pokemonData.weight ?? -1);

    return pokemonData;
  } catch (error) {
    console.error(`Error while fetching Pokemon ${id}`, error);
    return null;
  }
};

const getPokemonCardInfo = async (id: string): Promise<PokemonCardInfo | null> => {
  const pokemonData = await getPokemon(id);

  if (!pokemonData) return null;

  return {
    name: pokemonData.name ?? '???',
    id: pokemonData.id,
    types: pokemonData.types ?? [],
  };
};

const getAllPokemons = async (offset?: number, limit?: number): Promise<PokemonPagination> => {
  const params = offset || limit ? `?offset=${offset}&limit=${limit}` : '';
  const url = `pokemon${params}`;

  return await pokeapi.get(url).json<PokemonPagination>();
};

const getPokemonAutocompleteItems = async () => {
  const { results } = await getAllPokemons(undefined, POKEMON_QUANTITY);

  if (!results) return [];

  return results.map(({ name, url }) => {
    const id = getIdFromResourceUrl(url);

    return {
      id,
      name,
      imageUrl: getArtworkUrl(id),
    } as PokemonAutocompleteItem;
  });
};

export { getPokemon, getPokemonCardInfo, getAllPokemons, getPokemonAutocompleteItems };
