import { IconPokeball } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { Button } from '@/components/ui/Button';
import { getPokemonSearchItems } from '@/features/search/services';

export function RandomPokemonButton() {
  const router = useRouter();
  const { data: allPokemons } = useSWR(`pokemon-autocomplete`, getPokemonSearchItems, {
    fallbackData: [],
  });

  function getRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    return allPokemons[randomIndex];
  }

  function goToRandomPokemon() {
    const randomPokemon = getRandomPokemon();
    router.push(`/pokemon/${randomPokemon.name}`);
  }

  return (
    <Button
      onClick={goToRandomPokemon}
      variant="none"
      className="group animate-fade-in sm:dark:text-muted-foreground bg-primary dark:bg-background flex items-center justify-center gap-2 border-2 border-white px-4 py-1.5 text-white opacity-0 [animation-delay:1s] hover:border-white hover:text-white sm:border-transparent sm:bg-transparent sm:dark:bg-transparent"
    >
      Random
      <IconPokeball className="group-hover:animate-wiggle" />
    </Button>
  );
}
