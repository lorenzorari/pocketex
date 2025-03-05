'use client'

import { useState } from 'react';
import PokemonList from '@/features/explore/components/pokemon-list';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/select';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { cn } from '@/utils/classnames';
import { PokemonCounter, PokemonCounterContext } from './contexts/usePokemonCounter';
import { useGenerations } from '@/hooks/pokemon/useGenerations';

const ExplorePage = () => {
  const { generations, formatGenerationName } = useGenerations();
  const [pokemonCount, setPokemonCount] = useState<PokemonCounter>(undefined);

  const [isFilteringPokemon, setIsFilteringPokemon] = useState<boolean>(false);

  const handleClickGeneration = (value: string) => {
    // if (value === 'All') {
    //   setFilteredPokemonResources(allPokemonResources);
    //   return;
    // }
    // const { startSlice, endSlice } = getGenerationSlices(value);
    // const slicedGeneration = allPokemonResources.slice(startSlice, endSlice);
    // setFilteredPokemonResources(slicedGeneration);
  };

  return (
    <DefaultLayout>
      <PokemonCounterContext.Provider value={{ setPokemonCount }}>
        <section className="px-5 pt-8 lg:px-10 xl:px-32">
          <div className="mb-4 flex items-center gap-2">
            <h2 className="text-4xl font-bold">Pokémon</h2>
            <span
              className={cn('rounded-full bg-gray-200/70 px-2 text-sm text-gray-500 opacity-0', {
                'opacity-100 transition-opacity': (pokemonCount || 0) > 0,
              })}
            >
              {pokemonCount}
            </span>
          </div>
          <div className="mb-10">
            <Select defaultValue="All" onValueChange={handleClickGeneration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="px-1">
                <SelectItem value={'All'} className="select-none bg-black text-white">
                  All generations
                </SelectItem>
                {generations?.map(({ name }) => (
                  <SelectItem className="select-none hover:bg-black hover:text-white" key={name} value={name}>
                    {formatGenerationName(name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <PokemonList isFiltering={isFilteringPokemon} />
        </section>
      </PokemonCounterContext.Provider>
    </DefaultLayout>
  );
};

export default ExplorePage;
