import { CommandGroup, CommandSubItem } from '@/components/Command';
import { type PokemonSearchItem } from '@/components/search/models/PokemonSearchItem';
import { PokemonCmdItem } from '@/components/search/PokemonCmdItem';
import { type BaseComponent } from '@/models/utils';

interface Props {
  pokemons: PokemonSearchItem[];
  groupTitle: string;
  onSelect: (pokemon: PokemonSearchItem) => void;
  onDeleteAll: () => void;
}

export function RecentSearchGroup({ pokemons, groupTitle, onSelect, onDeleteAll }: BaseComponent<Props>) {
  return (
    <CommandGroup heading={groupTitle}>
      {pokemons.map((pokemon) => (
        <PokemonCmdItem key={pokemon.id} pokemon={pokemon} onSelect={() => onSelect(pokemon)} />
      ))}
      <div>
        <CommandSubItem onSelect={onDeleteAll}>Delete all recent searches</CommandSubItem>
      </div>
    </CommandGroup>
  );
}
