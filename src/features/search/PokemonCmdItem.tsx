import { CommandItem } from '@/components/Command';
import { Image } from '@/components/ui/Image';
import { type PokemonSearchItem } from '@/features/search/models/PokemonSearchItem';
import { getPokemonNumber } from '@/helpers/getPokemonNumber';

interface Props {
  pokemon: PokemonSearchItem;
  onSelect: () => void;
}

export function PokemonCmdItem({ pokemon, onSelect }: Props) {
  return (
    <CommandItem onSelect={onSelect} className="flex gap-2">
      <Image
        src={pokemon.imageUrl}
        alt={pokemon.formattedName}
        className="w-6"
        loadingClassName="text-muted-foreground"
      />
      <div>
        <span>{pokemon.formattedName} </span>
        <span className="text-muted-foreground text-[10px]">{getPokemonNumber(pokemon.id)}</span>
      </div>
    </CommandItem>
  );
}
