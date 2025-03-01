import { useEvolutionNode } from './evolution-node.context';

export function EvolutionTrigger() {
  const { details } = useEvolutionNode();

  const trigger = details?.[0]?.minLevel || null;

  if (!trigger) return null;

  return (
    <div className="z-10 rounded-md bg-evonode-primary px-2 py-1 font-bold text-gray-500">
      <span className="hidden md:inline">Level </span>
      {trigger}
    </div>
  );
}
