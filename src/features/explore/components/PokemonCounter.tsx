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
      className={cn('bg-muted-background text-muted-foreground rounded-full px-2 text-sm opacity-0', {
        'opacity-100 transition-opacity': (currentCount || 0) > 0,
      })}
    >
      {currentCount}
    </span>
  );
}
