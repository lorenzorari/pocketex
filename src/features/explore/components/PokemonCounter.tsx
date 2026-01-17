'use client';

import { usePokemonCounter, type PokemonCounter } from '@/app/explore/contexts/usePokemonCounter';
import { cn } from '@/utils/classnames';

interface Props {
  count?: PokemonCounter;
  generation?: string;
}

export function PokemonCounter({ count, generation }: Props) {
  const { pokemonCount } = usePokemonCounter();
  const currentCount = pokemonCount?.[generation ?? ''] ?? count;

  return (
    <span
      className={cn(
        'dark:bg-muted-background rounded-full bg-gray-200/70 px-2 text-sm text-gray-500 opacity-0 dark:text-gray-200',
        {
          'opacity-100 transition-opacity': (currentCount || 0) > 0,
        },
      )}
    >
      {currentCount}
    </span>
  );
}
