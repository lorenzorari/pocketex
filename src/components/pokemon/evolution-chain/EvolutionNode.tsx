import { Image } from 'src/components/ui/Image';
import { getArtworkUrl } from 'src/helpers/get-artwork-url';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { EvolutionDetail } from 'src/models/evolution/detail';
import { NamedAPIResource } from 'src/models/named-api-resource';
import { EvolutionConnector } from './EvolutionConnector';
import { EvolutionTrigger } from './EvolutionTrigger';
import { EvolutionNodeCtx } from './evolution-node.context';
import { Root } from '@radix-ui/react-slot';

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
      <EvolutionNodeCtx.Provider value={{ details: details || [] }}>
        <div className={hasParent ? 'relative' : undefined}>
          <a href={`/pokemon/${name}`}>
            <article className="bg-evonode-primary flex items-center gap-2 rounded-lg p-3 text-lg font-bold transition-all hover:bg-gray-200">
              <picture className="block size-[48px] text-xs">
                <Image src={imageUrl} alt={name} />
              </picture>
              <h3 className="capitalize">{name}</h3>
            </article>
          </a>
          {hasParent && (
            <EvolutionConnector isFirstChild={isFirstChild}>
              <EvolutionTrigger />
            </EvolutionConnector>
          )}
        </div>
      </EvolutionNodeCtx.Provider>
    </Tag>
  );
}
