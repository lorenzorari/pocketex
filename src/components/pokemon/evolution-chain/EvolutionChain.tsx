import { EvolutionNode } from 'src/components/pokemon/evolution-chain';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { Optional } from 'src/models/utils';
import { getEvolutionChain } from 'src/services/evolution-chain';
import useSWR from 'swr';

interface Props {
  evolutionChainUrl: Optional<string>;
}

export function EvolutionChain({ evolutionChainUrl }: Props) {
  const { data } = useSWR(getEvolutionChainKey(), getEvolutionChain);

  function getEvolutionChainKey() {
    if (!evolutionChainUrl) throw new Error('No evolution chain url');

    const evolutionChainId = getIdFromResourceUrl(evolutionChainUrl);

    return `evolution-chain/${evolutionChainId}`;
  }

  if (!evolutionChainUrl) return null;

  return (
    <div className="grid gap-x-evochain-col gap-y-evochain-row md:grid-cols-3">
      {data?.chain && (
        <div>
          <EvolutionNode {...data.chain.species} hasParent={false} />
        </div>
      )}

      <div className="grid gap-evochain-row md:col-span-2">
        {data?.chain?.evolvesTo?.map((evo2, evo2Idx) => (
          <div
            className="ml-14 grid gap-x-evochain-col gap-y-evochain-row md:ml-0 md:grid-cols-2"
            key={evo2.species.url}
          >
            <EvolutionNode {...evo2.species} details={evo2.evolutionDetails} isFirstChild={evo2Idx === 0} />

            {!!evo2.evolvesTo.length && (
              <div className="ml-14 grid gap-evochain-row md:ml-0">
                {evo2.evolvesTo.map((evo3, evo3Idx) => (
                  <EvolutionNode
                    key={evo3.species.url}
                    {...evo3.species}
                    details={evo3.evolutionDetails}
                    isFirstChild={evo3Idx === 0}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
