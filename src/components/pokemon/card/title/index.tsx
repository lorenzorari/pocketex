import { replaceDashesBySpaces } from '@/utils/replace-dash-by-space';

const PokemonCardTitle = ({ pokemon }: any) => {
  return <h2 className="text-lg font-bold text-white capitalize">{replaceDashesBySpaces(pokemon?.name)}</h2>;
};

export default PokemonCardTitle;
