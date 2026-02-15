import { useEvolutionNode } from './evolution-node.context';

export function EvolutionTrigger() {
  const { details } = useEvolutionNode();

  const trigger = details?.[0]?.minLevel || null;

  if (!trigger) return null;

  return (
    <div className="bg-muted-background text-muted-foreground z-10 rounded-md px-2 py-1 font-bold">
      <span className="hidden md:inline">Level </span>
      {trigger}
    </div>
  );
}
