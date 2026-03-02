import { IconPokeball } from '@tabler/icons-react';

interface Props {
  onClick?: () => void;
}

export function RandomPokemonButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group animate-fade-in dark:bg-muted-background text-muted-foreground hover:text-foreground flex size-[40px] items-center justify-center rounded-full bg-white opacity-0 transition-all [animation-delay:1s]"
    >
      <IconPokeball className="group-hover:animate-wiggle" />
    </button>
  );
}
