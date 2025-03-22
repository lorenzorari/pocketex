'use client';

import { Root } from '@radix-ui/react-slot';
import { Image } from '@/components/ui/Image';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { type EvolutionDetail } from '@/models/evolution/detail';
import { type NamedAPIResource } from '@/models/named-api-resource';
import { EvolutionNodeCtx } from './evolution-node.context';
import { EvolutionConnector } from './EvolutionConnector';
import { EvolutionTrigger } from './EvolutionTrigger';

type Props = NamedAPIResource & { details?: EvolutionDetail[] } & {
  hasParent?: boolean;
  isFirstChild?: boolean;
};

export function EvolutionNode({ name, url, details, hasParent = true, isFirstChild = false }: Props) {
  const pokemonId = getIdFromResourceUrl(url);
  const imageUrl = getArtworkUrl(pokemonId);
  const Tag = hasParent ? 'div' : Root;

  return (
    <Tag>
      <EvolutionNodeCtx value={{ details: details || [] }}>
        <div className={hasParent ? 'relative' : undefined}>
          <a href={`/pokemon/${name}`}>
            <article className="bg-evonode-primary flex items-center gap-2 rounded-lg p-3 font-bold transition-all hover:bg-gray-200">
              <picture className="block size-[48px] text-xs">
                <Image src={imageUrl} alt={name} />
              </picture>
              <h3 className="capitalize md:text-lg">{name}</h3>
            </article>
          </a>
          {hasParent && (
            <EvolutionConnector isFirstChild={isFirstChild}>
              <EvolutionTrigger />
            </EvolutionConnector>
          )}
        </div>
      </EvolutionNodeCtx>
    </Tag>
  );
}
