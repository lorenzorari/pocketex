import { Pokemon } from '@/models/pokemon';
import { PokemonPagination } from '@/models/pokemon/pagination';
import { pokeapi } from '@/helpers/http';
import { getAnthropometry } from '@/helpers/getAnthropometry';
import { POKEMON_QUANTITY } from '@/constants';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { PokemonAutocompleteItem } from '@/components/autocomplete/types';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { capitalize } from '@/utils/capitalize';

const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemonData = await pokeapi.get(`pokemon/${id}`).json<Pokemon>();

  pokemonData.name = capitalize(pokemonData?.name ?? '');
  pokemonData.height = getAnthropometry(pokemonData.height ?? -1);
  pokemonData.weight = getAnthropometry(pokemonData.weight ?? -1);

  return pokemonData;
};

const getAllPokemons = async (
  offset?: number,
  limit?: number,
): Promise<PokemonPagination> => {
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

export { getPokemon, getAllPokemons, getPokemonAutocompleteItems };
