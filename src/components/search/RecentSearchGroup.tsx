import { type PokemonAutocompleteItem } from '@/components/autocomplete/types';
import { CommandGroup, CommandSubItem } from '@/components/Command';
import { PokemonCmdItem } from '@/components/search/PokemonCmdItem';
import { type BaseComponent } from '@/models/utils';

interface Props {
  pokemons: PokemonAutocompleteItem[];
  groupTitle: string;
  onSelect: (pokemon: PokemonAutocompleteItem) => void;
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
