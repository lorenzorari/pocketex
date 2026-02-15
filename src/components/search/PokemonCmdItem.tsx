import { CommandItem } from '@/components/Command';
import { type PokemonSearchItem } from '@/components/search/models/PokemonSearchItem';
import { Image } from '@/components/ui/Image';
import { getPokemonNumber } from '@/helpers/getPokemonNumber';

interface Props {
  pokemon: PokemonSearchItem;
  onSelect: () => void;
}

export function PokemonCmdItem({ pokemon, onSelect }: Props) {
  return (
    <CommandItem onSelect={onSelect} className="flex gap-2">
      <Image src={pokemon.imageUrl} alt={pokemon.name} className="w-6" loadingClassName="text-muted-foreground" />
      <div>
        <span className="capitalize">{pokemon.name} </span>
        <span className="text-muted-foreground text-[10px]">{getPokemonNumber(pokemon.id)}</span>
      </div>
    </CommandItem>
  );
}
