import { Image } from '@/components/ui/Image';
import { getArtworkUrl } from '@/helpers/get-artwork-url';

const PokemonCardImage = ({ pokemon }: any) => {
  return (
    <Image src={pokemon && getArtworkUrl(pokemon.id)} alt={pokemon?.name} />
  );
};

export default PokemonCardImage;
