import axios from 'axios';
import { api } from '@/helpers/http';
import { capitalize } from '@/utils/capitalize';
import { type PokemonPagination } from '../models/pokemon/pagination';

const URL_GENERATION = 'https://pokeapi.co/api/v2/generation';

const getGeneration = async (id?: number): Promise<PokemonPagination> => {
  const url = URL_GENERATION + (id ? `/${id}` : '');

  return axios.get(url).then((res) => res.data as PokemonPagination);
};

const getGenerations = async () => {
  const { results } = await api<PokemonPagination>('generation');

  return results?.map(({ name }) => formatGenerationName(name)) ?? [];
};

function formatGenerationName(name: string) {
  const template = new RegExp('^generation-.+$');

  if (!template.test(name)) {
    console.error('Invalid generation name', name);
    return 'Generation-???';
  }

  const [label, generationNumber] = name.split('-');

  return `${capitalize(label)} ${generationNumber.toUpperCase()}`;
}

export { getGeneration, getGenerations };
