import { GenerationFilter } from '@/features/explore/components/filters/GenerationFilter';
import { getGenerations } from '@/services/generations';

const ExplorePage = async () => {
  const generations = await getGenerations();
  // const [pokemonCount, setPokemonCount] = useState<PokemonCounter>(undefined);

  // const [isFilteringPokemon, setIsFilteringPokemon] = useState<boolean>(false);

  return (
    <section className="px-5 pt-8 lg:px-10 xl:px-32">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-4xl font-bold">Pokémon</h2>
        {/* <span
              className={cn('rounded-full bg-gray-200/70 px-2 text-sm text-gray-500 opacity-0', {
                'opacity-100 transition-opacity': (pokemonCount || 0) > 0,
              })}
            >
              {pokemonCount}
            </span> */}
      </div>
      <div className="mb-10">
        <GenerationFilter generations={generations} />
      </div>
      {/* <PokemonList isFiltering={isFilteringPokemon} /> */}
    </section>
  );
};

export default ExplorePage;
