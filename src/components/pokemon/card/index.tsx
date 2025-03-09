import React from 'react';
import PokemonBackgroundImage from '@/components/pokemon/card/background-image';
import PokemonCardId from '@/components/pokemon/card/id';
import PokemonCardTitle from '@/components/pokemon/card/title';
import TypeTag from '@/components/type-tag';
import { type Pokemon } from '@/models/pokemon';
import { cn } from '@/utils/classnames';
import PokemonCardImage from './image';

interface Props {
  pokemon: Pokemon;
  className?: string;
  onClick?: () => void;
}

const PokemonCard = ({ pokemon, className, onClick }: Props) => {
  const pokemonTypes = pokemon.types;
  const pokemonType = pokemonTypes?.[0].type.name;

  const style = {
    '--color-type-1': `var(--color-${pokemonType}-1)`,
    '--color-type-2': `var(--color-${pokemonType}-2)`,
  } as React.CSSProperties;

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-[1.3rem] px-[1.6rem] pt-[1.6rem]',
        className,
      )}
      style={{ ...style, backgroundColor: 'var(--color-type-1)' }}
      onClick={onClick}
    >
      <PokemonCardTitle pokemon={pokemon} />
      <PokemonCardId pokemon={pokemon} />

      <div className="mb-4 flex gap-1.5">
        {pokemonTypes?.map(({ type }, i) => (
          <TypeTag key={i} className="p-[.4rem]" value={type.name} />
        ))}
      </div>

      <figure className="mb-4 size-[160px]">
        <PokemonCardImage pokemon={pokemon} />
      </figure>

      <PokemonBackgroundImage pokemonType={pokemonType} />
    </article>
  );
};

export default PokemonCard;
