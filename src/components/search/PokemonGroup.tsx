import { CommandGroup } from '@/components/Command';
import { type PokemonSearchItem } from '@/components/search/models/PokemonSearchItem';
import { PokemonCmdItem } from '@/components/search/PokemonCmdItem';
import { type BaseComponent } from '@/models/utils';

interface Props {
  pokemons: PokemonSearchItem[];
  groupTitle: string;
  onSelect: (pokemon: PokemonSearchItem) => void;
}

export function PokemonGroup({ pokemons, groupTitle, onSelect }: BaseComponent<Props>) {
  return (
    <CommandGroup heading={groupTitle}>
      {pokemons.map((pokemon) => (
        <PokemonCmdItem key={pokemon.id} pokemon={pokemon} onSelect={() => onSelect(pokemon)} />
      ))}
    </CommandGroup>
  );
}
