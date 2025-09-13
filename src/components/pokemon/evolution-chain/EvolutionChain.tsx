import { EvolutionNode } from '@/components/pokemon/evolution-chain';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { getEvolutionChain } from '@/services/evolution-chain';

interface Props {
  evolutionChainUrl?: string;
}

export async function EvolutionChain({ evolutionChainUrl }: Props) {
  // const { data } = useSWR(getEvolutionChainKey(), getEvolutionChain);
  const data = await getEvolutionChain(getEvolutionChainKey());

  function getEvolutionChainKey() {
    if (!evolutionChainUrl) throw new Error('No evolution chain url');

    const evolutionChainId = getIdFromResourceUrl(evolutionChainUrl);

    return `evolution-chain/${evolutionChainId}`;
  }

  if (!evolutionChainUrl) return null;

  return (
    <div className="gap-x-evochain-col gap-y-evochain-row grid md:grid-cols-3">
      {data?.chain && (
        <div>
          <EvolutionNode {...data.chain.species} hasParent={false} />
        </div>
      )}

      <div className="gap-evochain-row grid md:col-span-2">
        {data?.chain?.evolvesTo?.map((evo2, evo2Idx) => (
          <div
            className="gap-x-evochain-col gap-y-evochain-row ml-14 grid md:ml-0 md:grid-cols-2"
            key={evo2.species.url}
          >
            <EvolutionNode {...evo2.species} details={evo2.evolutionDetails} isFirstChild={evo2Idx === 0} />

            {!!evo2.evolvesTo.length && (
              <div className="gap-evochain-row ml-14 grid md:ml-0">
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
