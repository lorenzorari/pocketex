import { CommandGroup } from '@/components/Command';
import { type PokemonSearchItem } from '@/features/search/models/PokemonSearchItem';
import { PokemonCmdItem } from '@/features/search/PokemonCmdItem';
import { type BaseComponent } from '@/models/utils';

interface Props {
  pokemons: PokemonSearchItem[];
  onSelect: (pokemon: PokemonSearchItem) => void;
}

export function PokemonGroup({ pokemons, onSelect }: BaseComponent<Props>) {
  return (
    <CommandGroup heading="Pokémon">
      {pokemons.map((pokemon) => (
        <PokemonCmdItem key={pokemon.id} pokemon={pokemon} onSelect={() => onSelect(pokemon)} />
      ))}
    </CommandGroup>
  );
}
