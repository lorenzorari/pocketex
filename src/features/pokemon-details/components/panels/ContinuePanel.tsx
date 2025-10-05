import { type ComponentProps } from 'react';
import { SiblingLink } from '@/features/pokemon-details/components/SiblingLink';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { getPokemonNumber } from '@/helpers/getPokemonNumber';
import { type Pokemon } from '@/models/pokemon';

interface Props {
  prevPokemon: Pokemon | null;
  nextPokemon: Pokemon | null;
}

type SiblingLinkType = ComponentProps<typeof SiblingLink> | null;

export function ContinuePanel({ prevPokemon, nextPokemon }: Props) {
  const siblingLinks: SiblingLinkType[] = [
    prevPokemon && {
      href: `/pokemon/${prevPokemon.name}`,
      title: prevPokemon.name,
      subtitle: getPokemonNumber(prevPokemon.id),
      imgSrc: getArtworkUrl(prevPokemon.id),
    },
    nextPokemon && {
      href: `/pokemon/${nextPokemon.name}`,
      title: nextPokemon.name,
      subtitle: getPokemonNumber(nextPokemon.id),
      imgSrc: getArtworkUrl(nextPokemon.id),
      direction: 'right',
    },
  ];

  return (
    <section className="relative">
      <div className="grid grid-cols-2 gap-1 sm:flex sm:grid-cols-none sm:justify-between sm:gap-0">
        {siblingLinks.map((link) => link && <SiblingLink className="" key={link.href} {...link} />)}
      </div>
    </section>
  );
}
