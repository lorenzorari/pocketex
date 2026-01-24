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
      <Image src={pokemon.imageUrl} alt={pokemon.name} className="w-6" loadingClassName="text-gray-300" />
      <div>
        <span className="capitalize">{pokemon.name} </span>
        <span className="text-[10px] text-gray-400">{getPokemonNumber(pokemon.id)}</span>
      </div>
    </CommandItem>
  );
}
