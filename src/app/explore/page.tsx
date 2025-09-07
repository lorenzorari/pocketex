import { ExploreMainContent } from '@/features/explore/components/ExploreMainContent';
import { getGenerations } from '@/services/generations';
import { type PokemonCardInfo } from '@/services/pokemon';
import { cn } from '@/utils/classnames';

export interface PokemonByGeneration {
  pokemons: PokemonCardInfo[];
  next: string;
  count: number;
  previous?: string;
}

const ExplorePage = async () => {
  const generations = await getGenerations();
  const data = await fetch(`${process.env.domain}/api/generations/0`);
  const res = (await data.json()) as PokemonByGeneration;

  return (
    <section className="px-5 pt-8 lg:px-10 xl:px-32">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-4xl font-bold">Pokémon</h2>
        <span
          className={cn('rounded-full bg-gray-200/70 px-2 text-sm text-gray-500 opacity-0', {
            'opacity-100 transition-opacity': (res.count || 0) > 0,
          })}
        >
          {res.count}
        </span>
      </div>
      <ExploreMainContent generations={generations} pokemonListInitialValue={res} />
    </section>
  );
};

export default ExplorePage;
