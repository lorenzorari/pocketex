import { type NextRequest } from 'next/server';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { getPokemon } from '@/services/pokemon';
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
}

async function loadPokemons(data: NamedAPIResource[] | undefined) {
  if (!data) return [];

  const pokemons = await Promise.all(data.map(async ({ name }) => await getPokemon(name)));

  return pokemons;
}
