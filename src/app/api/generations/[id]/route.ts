import { type NextRequest } from 'next/server';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { getGeneration } from '@/services/generations';
import { getPokemonCardPagination, loadPokemonCards } from '@/services/pokemon';

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
    const pagination = await getPokemonCardPagination(offset, limit);

    return Response.json(pagination);
  }

  if (!isGenerationCached) {
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
  }

  const species = speciesByGenerationCache[+generationId];
  const slicedSpecies = species.results.slice(offset, offset + limit);
  const pokemons = await loadPokemonCards(slicedSpecies);
  const count = species.count;
  const getSiblingUrl = (offset: number) => `/gen/${generationId}/pokemon-species/?offset=${offset}&limit=${limit}`;

  return Response.json({
    pokemons,
    count,
    next: offset + limit < count ? getSiblingUrl(offset + limit) : null,
    previous: offset > 0 ? getSiblingUrl(offset - limit) : null,
  });
}
