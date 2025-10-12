import { IconLoader } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import { type PokemonAutocompleteItem } from '@/components/autocomplete/types';
import { CommandGroup, CommandItem } from '@/components/Command';
import { getPokemonNumber } from '@/helpers/getPokemonNumber';
import { type BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

interface Props {
  pokemons: PokemonAutocompleteItem[];
  groupTitle: string;
  handleSelect: (pokemon: PokemonAutocompleteItem) => void;
}

export function PokemonGroup({ pokemons, groupTitle, handleSelect }: BaseComponent<Props>) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <CommandGroup heading={groupTitle}>
      {pokemons.map((pokemon) => (
        <CommandItem key={`rc-${pokemon.id}`} onSelect={() => handleSelect(pokemon)}>
          <Link href={`/pokemon/${pokemon.name}`} className="flex gap-2 px-3 py-2">
            <img
              src={pokemon.imageUrl}
              alt={pokemon.name}
              className={cn('w-6', !isImageLoaded && 'hidden')}
              onLoad={() => setIsImageLoaded(true)}
            />

            {!isImageLoaded && <IconLoader className="animate-spin text-gray-300 [animation-duration:1.5s]" />}

            <div>
              <span className="capitalize">{pokemon.name} </span>
              <span className="text-[10px] text-gray-400">{getPokemonNumber(pokemon.id)}</span>
            </div>
          </Link>
        </CommandItem>
      ))}
    </CommandGroup>
  );
}
