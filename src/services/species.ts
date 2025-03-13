import { api, pokeapi } from '@/helpers/http';
import { type PokemonPagination } from '@/models/pokemon/pagination';
import { type Species } from '@/models/species';

type GetSpeciesData = {
  species: Species;
  genus: string;
};

const BASE_URL = 'pokemon-species';

export async function getSpecies(pokemonId: string): Promise<GetSpeciesData> {
  const species = await api<Species>(`${BASE_URL}/${pokemonId}`);
  const genus = getGenus(species);

  return { species, genus };
}

function getGenus(species: Species) {
  const genus = species?.genera?.find(({ language }) => language?.name === 'en')?.genus;

  if (!genus) return '';

  return genus.replace('Pokémon', '').trim();
}

export async function getSpeciesPagination(offset: number = 0, limit: number = 20) {
  const params = offset || limit ? `?offset=${offset}&limit=${limit}` : '';
  const url = `${BASE_URL}${params}`;

  return await pokeapi.get(url).json<PokemonPagination>();
}
