'use client';

import { IconMoon } from '@tabler/icons-react';
import { useState } from 'react';
import {
  type PokemonCounter as PokemonCounterType,
  PokemonCounterContext,
} from '@/app/explore/contexts/usePokemonCounter';
import { Button } from '@/components/ui/Button';
import { PokemonCounter } from '@/features/explore/components/PokemonCounter';
import { type GenerationListItem } from '@/services/generations';
import { type PokemonByGeneration } from '@/services/pokemon';
import { GenerationFilter } from './filters/GenerationFilter';
import PokemonList from './pokemon-list';

interface Props {
  generationListItems: GenerationListItem[];
  pokemonListInitialValue: PokemonByGeneration;
  count: number;
}

export function ExploreMainContent({ generationListItems, pokemonListInitialValue, count }: Props) {
  const [pokemonCount, setPokemonCount] = useState<PokemonCounterType>({ 0: count });
  const [selectedGeneration, setSelectedGeneration] = useState<string>('0');

  return (
    <>
      <PokemonCounterContext value={{ pokemonCount, setPokemonCount }}>
        <div className="flex gap-1">
          <Button>hey</Button>
          <Button variant="outline">hey</Button>
          <Button className="" size="icon">
            <IconMoon />
          </Button>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-4xl font-bold">Pokémon</h2>
          <PokemonCounter generation={selectedGeneration} />
        </div>
        <div className="mb-10">
          <GenerationFilter generationListItems={generationListItems} onValueChange={setSelectedGeneration} />
        </div>
        <PokemonList initialValue={pokemonListInitialValue} generation={selectedGeneration} />
      </PokemonCounterContext>
    </>
  );
}
