import { type NextRequest } from 'next/server';
import pLimit from 'p-limit';
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

export async function GET(req: NextRequest, { params }: RouteProps) {
  const { id: generationId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const offset = searchParams.get('offset') ? Number(searchParams.get('offset')) : undefined;
  const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined;

  if (generationId === '0') {
    const { results, next, previous, count } = await getSpeciesPagination(offset, limit);
    const pokemons = await loadPokemons(results);

    return Response.json({ pokemons, next, previous, count });
  }

  const generationRes = await getGeneration(+generationId);
  const pokemons = await loadPokemons(generationRes.pokemonSpecies);

  return Response.json({ pokemons, count: pokemons.length });
}

async function loadPokemons(data: NamedAPIResource[] | undefined) {
  if (!data) return [];

  const limit = pLimit(1);

  const pokemons = await Promise.all(data.map(({ name }) => limit(() => getPokemonCardInfo(name))));

  return pokemons;
}
