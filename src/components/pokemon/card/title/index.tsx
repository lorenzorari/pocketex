import { type PokemonCardInfo } from '@/services/pokemon';

interface Props {
  pokemon: PokemonCardInfo;
}

const PokemonCardTitle = ({ pokemon }: Props) => {
  return <h2 className="text-lg font-bold text-white">{pokemon.name}</h2>;
};

export default PokemonCardTitle;
