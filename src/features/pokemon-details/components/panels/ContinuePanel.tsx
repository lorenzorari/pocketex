import { type ComponentProps } from 'react';
import { SiblingLink } from '@/features/pokemon-details/components/SiblingLink';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { getPokemonNumber } from '@/helpers/getPokemonNumber';
import { type Species } from '@/models/species';

interface Props {
  prevSpecies: Species | null;
  nextSpecies: Species | null;
}

type SiblingLinkType = ComponentProps<typeof SiblingLink> | null;

export function ContinuePanel({ prevSpecies, nextSpecies }: Props) {
  const siblingLinks: SiblingLinkType[] = [
    prevSpecies && {
      href: `/pokemon/${prevSpecies.name}`,
      title: prevSpecies.name ?? '???',
      subtitle: getPokemonNumber(prevSpecies.id),
      imgSrc: getArtworkUrl(prevSpecies.id ?? 0),
    },
    nextSpecies && {
      href: `/pokemon/${nextSpecies.name}`,
      title: nextSpecies.name ?? '???',
      subtitle: getPokemonNumber(nextSpecies.id),
      imgSrc: getArtworkUrl(nextSpecies.id ?? 0),
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
