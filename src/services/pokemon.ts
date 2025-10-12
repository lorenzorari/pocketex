import { type PokemonAutocompleteItem } from '@/components/autocomplete/types';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { getAnthropometry } from '@/helpers/getAnthropometry';
import { pokeapi } from '@/helpers/http';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { type Pokemon } from '@/models/pokemon';
import { type PokemonPagination } from '@/models/pokemon/pagination';
import { type PokemonType } from '@/models/pokemon/type';
import { getSpeciesPagination } from '@/services/species';
import { capitalize } from '@/utils/capitalize';

export interface PokemonCardInfo {
  id: number;
  name: string;
  types: PokemonType[];
}

export interface PokemonByGeneration {
  pokemons: PokemonCardInfo[];
  next: string | null;
  count: number;
  previous: string | null;
}

const getPokemon = async (id: string): Promise<Pokemon | null> => {
  try {
    const pokemonData = await pokeapi<Pokemon>(`pokemon/${id}`);

    pokemonData.name = capitalize(pokemonData?.name ?? '');
    pokemonData.height = getAnthropometry(pokemonData.height ?? -1);
    pokemonData.weight = getAnthropometry(pokemonData.weight ?? -1);

    return pokemonData;
  } catch (error) {
    console.error(`Error while fetching Pokemon ${id}`, error);
    return null;
  }
};

const getPokemonCard = async (id: string): Promise<PokemonCardInfo | null> => {
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

  return await pokeapi<PokemonPagination>(url);
};

const getPokemonAutocompleteItems = async () => {
  const { results } = await getAllPokemons(undefined, 9999);

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

export async function loadPokemonCards(data: NamedAPIResource[] | undefined) {
  if (!data) return [];

  const pokemons = await Promise.all(
    data.map(({ url }) => {
      const id = getIdFromResourceUrl(url);

      return getPokemonCard(`${id}`);
    }),
  );

  return pokemons.filter((p) => !!p);
}

export async function getPokemonCardPagination(offset?: number, limit?: number) {
  const { results, next, previous, count } = await getSpeciesPagination(offset, limit);
  const pokemons = await loadPokemonCards(results);

  return { pokemons, next, previous, count } as PokemonByGeneration;
}

export { getPokemon, getPokemonCard, getAllPokemons, getPokemonAutocompleteItems };
