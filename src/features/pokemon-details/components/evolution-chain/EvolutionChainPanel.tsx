import { EvolutionChain } from '@/components/pokemon/evolution-chain/EvolutionChain';
import { Panel } from '@/components/ui/panel';

interface Props {
  evolutionChainUrl?: string;
}

export function EvolutionChainPanel({ evolutionChainUrl }: Props) {
  if (!evolutionChainUrl) return null;

  return (
    <Panel className="mb-10" title="Evolution Chain">
      <EvolutionChain evolutionChainUrl={evolutionChainUrl} />
    </Panel>
  );
}
