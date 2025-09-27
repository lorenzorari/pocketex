import { SVG } from '@/components/SVG';

interface Props {
  pokemonType: string;
}

const PokemonBackgroundImage = ({ pokemonType }: Props) => {
  return (
    <div className="absolute -right-12 -bottom-[2.4rem] left-10">
      <SVG
        className="size-full"
        style={{ color: 'var(--color-type-2)' }}
        src={`/assets/svg/pokemon-types/${pokemonType}.svg`}
      />
    </div>
  );
};

export default PokemonBackgroundImage;
