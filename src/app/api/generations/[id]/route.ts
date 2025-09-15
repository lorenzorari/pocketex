import { type NextRequest } from 'next/server';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { getGeneration } from '@/services/generations';
import { getPokemonCardInfo } from '@/services/pokemon';
import { getSpeciesPagination } from '@/services/species';

interface Params {
  id: string;
}

interface RouteProps {
  params: Promise<Params>;
}

const speciesByGenerationCache: Record<
  number,
  {
    results: NamedAPIResource[];
    start: number;
    end: number;
    count: number;
  }
> = {};

export async function GET(req: NextRequest, { params }: RouteProps) {
  const { id: generationId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const offset = Number(searchParams.get('offset'));
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 20;
  const isGenerationCached = !!speciesByGenerationCache[+generationId];
  const isDefaultGeneration = generationId === '0';

  if (isDefaultGeneration) {
    const { results, next, previous, count } = await getSpeciesPagination(offset, limit);
    const pokemons = await loadPokemons(results);

    return Response.json({ pokemons, next, previous, count });
  }

  if (!isGenerationCached) {
    console.log(`Fetching generation ${generationId}`);

    const generationRes = await getGeneration(+generationId);

    if (!generationRes) {
      return Response.json({ pokemons: [], count: 0 });
    }

    const sortedSpecies = generationRes.pokemonSpecies.sort((a, b) => {
      const idA = getIdFromResourceUrl(a.url);
      const idB = getIdFromResourceUrl(b.url);
      return idA - idB;
    });
    speciesByGenerationCache[+generationId] = {
      results: sortedSpecies,
      count: sortedSpecies.length,
      start: getIdFromResourceUrl(sortedSpecies[0].url),
      end: getIdFromResourceUrl(sortedSpecies[sortedSpecies.length - 1].url),
    };
    console.log(`Generation ${generationId} cached`);
  }

  console.log(speciesByGenerationCache);

  const species = speciesByGenerationCache[+generationId];
  const slicedSpecies = species.results.slice(offset, offset + limit);
  console.log({ slicedSpecies }, offset, limit);
  console.log('results', species.results.slice(0, 3));

  const pokemons = await loadPokemons(slicedSpecies);
  const count = species.count;

  return Response.json({
    pokemons,
    count,
    next: offset + limit < count ? `/pokemon-species/?offset=${offset + limit}&limit=${limit}` : null,
    previous: offset > 0 ? `/pokemon-species/?offset=${offset - limit}&limit=${limit}` : null,
  });
}

async function loadPokemons(data: NamedAPIResource[] | undefined) {
  console.log({ data });

  if (!data) return [];

  const pokemons = await Promise.all(
    data.map(({ url }) => {
      const id = getIdFromResourceUrl(url);

      return getPokemonCardInfo(`${id}`);
    }),
  );

  return pokemons.filter((p) => !!p);
}
