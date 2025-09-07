'use client';

import { useState } from 'react';
import { type PokemonByGeneration } from '@/app/explore/page';
import { type GenerationListItem } from '@/services/generations';
import { GenerationFilter } from './filters/GenerationFilter';
import PokemonList from './pokemon-list';

interface Props {
  generations: GenerationListItem[];
  pokemonListInitialValue: PokemonByGeneration;
}

export function ExploreMainContent({ generations, pokemonListInitialValue }: Props) {
  const [selectedGeneration, setSelectedGeneration] = useState<string>('0');

  return (
    <>
      <div className="mb-10">
        <GenerationFilter generations={generations} onValueChange={setSelectedGeneration} />
      </div>
      <PokemonList initialValue={pokemonListInitialValue} generation={selectedGeneration} />
    </>
  );
}
