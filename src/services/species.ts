import { api, pokeapi } from '@/helpers/http';
import { type PokemonPagination } from '@/models/pokemon/pagination';
import { type Species } from '@/models/species';

type GetSpeciesData = {
  species: Species;
  genus: string;
  description: string;
};

const BASE_URL = 'pokemon-species';

export async function getSpecies(pokemonId: string): Promise<GetSpeciesData> {
  const species = await api<Species>(`${BASE_URL}/${pokemonId}`);
  const genus = getGenus(species);
  const description = getDescription(species);

  return { species, genus, description };
}

function getGenus(species: Species) {
  const genus = species?.genera?.find(({ language }) => language?.name === 'en')?.genus;

  if (!genus) return '';

  return genus.replace('Pokémon', '').trim();
}

const getDescription = (species: Species) => {
  const text = species?.flavorTextEntries?.find(({ language }) => language.name === 'en')?.flavorText;

  if (!text) return '';

  return text
    ?.replace(/u'\f'/, ' ')
    .replace(/\u00AD/g, '')

    .replace(/\u000C/g, ' ')
    .replace(/u' -\n'/, ' - ')
    .replace(/u'-\n'/, '-')
    .replace(/(\r\n|\n|\r)/gm, ' ');
};

export async function getSpeciesPagination(offset: number = 0, limit: number = 20) {
  const params = offset || limit ? `?offset=${offset}&limit=${limit}` : '';
  const url = `${BASE_URL}${params}`;

  const res = await pokeapi.get(url).json<PokemonPagination>();

  if (res?.next) {
    res.next = res.next.split('v2')[1];
  }

  return res;
}
