import { IconPokeball } from '@tabler/icons-react';

export function SearchLoader() {
  return (
    <div className="bg-background dark:border-muted-background absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl p-4 dark:border">
      <IconPokeball className="size-20 animate-[spin_1.25s_infinite]" />
      <span className="mt-2 text-center">Loading Pokémon...</span>
    </div>
  );
}
