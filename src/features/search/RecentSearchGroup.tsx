import { CommandGroup, CommandSubItem } from '@/components/Command';
import { type PokemonSearchItem } from '@/features/search/models/PokemonSearchItem';
import { PokemonCmdItem } from '@/features/search/PokemonCmdItem';
import { type BaseComponent } from '@/models/utils';

interface Props {
  pokemons: PokemonSearchItem[];
  onSelect: (pokemon: PokemonSearchItem) => void;
  onDeleteAll: () => void;
}

export function RecentSearchGroup({ pokemons, onSelect, onDeleteAll }: BaseComponent<Props>) {
  return (
    <CommandGroup heading="Recent searches">
      {pokemons.map((pokemon) => (
        <PokemonCmdItem key={pokemon.id} pokemon={pokemon} onSelect={() => onSelect(pokemon)} />
      ))}
      <div>
        <CommandSubItem onSelect={onDeleteAll}>Delete all recent searches</CommandSubItem>
      </div>
    </CommandGroup>
  );
}
