import { type PokemonByGeneration } from '@/app/explore/page';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { api } from '@/helpers/http';
import { type Generation } from '@/models/generation';
import { capitalize } from '@/utils/capitalize';
import { type PokemonPagination } from '../models/pokemon/pagination';

export type GenerationListItem = {
  label: string;
  id: number;
};

const URL_GENERATION = 'generation';

const getGeneration = async (id: number): Promise<Generation | null> => {
  const url = `${URL_GENERATION}/${id}`;

  try {
    const generation = await api<Generation>(url);
    return generation;
  } catch (error) {
    console.error(`Error while fetching generation ${id}`, error);
    return null;
  }
};

const getGenerations = async (): Promise<GenerationListItem[]> => {
  const { results } = await api<PokemonPagination>('generation');

  return results?.map(({ name, url }) => ({ label: formatGenerationName(name), id: getIdFromResourceUrl(url) })) ?? [];
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

async function getGenerationPagination(generation: string, offset: number, limit: number) {
  const data = await fetch(`/api/generations/${generation}?offset=${offset}&limit=${limit}`);
  return (await data.json()) as PokemonByGeneration;
}

export { getGeneration, getGenerations, getGenerationPagination };
