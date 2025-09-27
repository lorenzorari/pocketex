'use client';

import { useState } from 'react';
import {
  type PokemonCounter as PokemonCounterType,
  PokemonCounterContext,
} from '@/app/explore/contexts/usePokemonCounter';
import { type PokemonByGeneration } from '@/app/explore/page';
import { PokemonCounter } from '@/features/explore/components/PokemonCounter';
import { type GenerationListItem } from '@/services/generations';
import { GenerationFilter } from './filters/GenerationFilter';
import PokemonList from './pokemon-list';

interface Props {
  generations: GenerationListItem[];
  pokemonListInitialValue: PokemonByGeneration;
  count: number;
}

export function ExploreMainContent({ generations, pokemonListInitialValue, count }: Props) {
  const [pokemonCount, setPokemonCount] = useState<PokemonCounterType>({ 0: count });
  const [selectedGeneration, setSelectedGeneration] = useState<string>('0');

  return (
    <>
      <PokemonCounterContext value={{ pokemonCount, setPokemonCount }}>
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-4xl font-bold">Pokémon species</h2>
          <PokemonCounter generation={selectedGeneration} />
        </div>
        <div className="mb-10">
          <GenerationFilter generations={generations} onValueChange={setSelectedGeneration} />
        </div>
        <PokemonList initialValue={pokemonListInitialValue} generation={selectedGeneration} />
      </PokemonCounterContext>
    </>
  );
}
