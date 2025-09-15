import { ExploreMainContent } from '@/features/explore/components/ExploreMainContent';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { getGenerations } from '@/services/generations';
import { getPokemonCardInfo, type PokemonCardInfo } from '@/services/pokemon';
import { getSpeciesPagination } from '@/services/species';

export interface PokemonByGeneration {
  pokemons: PokemonCardInfo[];
  next: string | null;
  count: number;
  previous: string | null;
}

const ExplorePage = async () => {
  const generations = await getGenerations();
  // const data = await fetch(`${process.env.domain}/api/generations/0`, { cache: 'no-store' });
  // const res = (await data.json()) as PokemonByGeneration;

  const res = await getAllGenerations();

  async function loadPokemons(data: NamedAPIResource[] | undefined) {
    if (!data) return [];

    const pokemons = await Promise.all(
      data.map(({ url }) => {
        const id = getIdFromResourceUrl(url);

        return getPokemonCardInfo(`${id}`);
      }),
    );

    return pokemons.filter((p) => !!p);
  }

  async function getAllGenerations() {
    const { results, next, previous, count } = await getSpeciesPagination();
    const pokemons = await loadPokemons(results);

    return { pokemons, next, previous, count } as PokemonByGeneration;
  }

  return (
    <section className="px-5 pt-8 lg:px-10 xl:px-32">
      <ExploreMainContent count={res.count} generations={generations} pokemonListInitialValue={res} />
    </section>
  );
};

export default ExplorePage;
