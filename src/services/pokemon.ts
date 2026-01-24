import { getFormattedPokemonName } from '@/helpers/get-formatted-pokemon-name';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { getAnthropometry } from '@/helpers/getAnthropometry';
import { pokeapi } from '@/helpers/http';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { type Pokemon } from '@/models/pokemon';
import { type PokemonType } from '@/models/pokemon/type';
import { getSpeciesPagination } from '@/services/species';

export interface PokemonCardInfo {
  id: number;
  name: string;
  url: string;
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

    pokemonData.formattedName = getFormattedPokemonName(pokemonData.name);
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
    id: pokemonData.id,
    name: pokemonData.formattedName ?? '???',
    url: `/pokemon/${pokemonData.name}`,
    types: pokemonData.types ?? [],
  };
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

export { getPokemon, getPokemonCard };
