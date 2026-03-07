import * as Tooltip from '@radix-ui/react-tooltip';
import { IconPokeball } from '@tabler/icons-react';

interface Props {
  onClick?: () => void;
}

export function RandomPokemonButton({ onClick }: Props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={onClick}
            className="group animate-fade-in dark:bg-muted-background text-muted-foreground hover:text-foreground flex size-[40px] items-center justify-center rounded-full bg-white opacity-0 transition-all [animation-delay:1s]"
          >
            <IconPokeball className="group-hover:animate-wiggle" />
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="bg-background border-border z-50 rounded-xl border p-2" sideOffset={5}>
            Random Pokémon
            <Tooltip.Arrow className="fill-border" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
