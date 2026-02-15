import { DetailField } from '@/components/details';
import { Panel } from '@/components/ui/panel';
import { type Pokemon } from '@/models/pokemon';
import { type Species } from '@/models/species';
import { replaceDashesBySpaces } from '@/utils/replace-dash-by-space';

interface Props {
  pokemon: Pokemon;
  species: Species;
}

export const TrainingPanel = ({ pokemon, species }: Props) => {
  const evYields = pokemon.stats?.filter((stat) => (stat.effort ?? -1) > 0);

  return (
    <Panel title="Catch & Training">
      <section>
        <DetailField label="Catch Rate">{species?.captureRate}</DetailField>
        <DetailField label="Base Happiness">{species.baseHappiness}</DetailField>
        <DetailField label="Growth Rate">{replaceDashesBySpaces(species?.growthRate?.name ?? '')}</DetailField>
        <DetailField label="EV Yield">
          <ul>
            {evYields?.map((evYield, index) => (
              <li key={index}>
                {evYield.effort} {replaceDashesBySpaces(evYield.stat?.name ?? '')}
              </li>
            ))}
          </ul>
        </DetailField>
        <DetailField label="Abilities">
          <ul className="list-disc pl-[1.1rem]">
            {pokemon.abilities?.map(({ ability, isHidden }) => (
              <li key={ability.name}>
                {replaceDashesBySpaces(ability.name)}{' '}
                {isHidden && (
                  <span
                    title="Hidden ability"
                    className="bg-muted-background text-muted-foreground rounded-full px-2 py-[2px] text-xs font-bold"
                  >
                    Hidden
                  </span>
                )}
              </li>
            ))}
          </ul>
        </DetailField>
      </section>
    </Panel>
  );
};
