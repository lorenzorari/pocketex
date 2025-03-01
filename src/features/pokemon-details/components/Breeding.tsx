import { IconGenderFemale, IconGenderMale } from '@tabler/icons-react';
import { useMemo } from 'react';
import { DetailField } from 'src/components/details';
import { Panel } from 'src/components/ui/panel';
import { Species } from 'src/models/species';

interface Props {
  species: Species;
}

export const Breeding = ({ species }: Props) => {
  const eggGroups = useMemo(() => {
    if (!species.eggGroups?.length) return 'No egg groups';

    return species.eggGroups.map((group) => group.name).join(', ');
  }, [species.eggGroups]);

  const genderRatio = useMemo(() => {
    if (!species.genderRate || species.genderRate === -1) return 'Genderless';

    const femaleRatio = species.genderRate * 12.5;
    const maleRatio = 100 - femaleRatio;

    return [maleRatio, femaleRatio];
  }, [species.genderRate]);

  return (
    <Panel title="Breeding">
      <section>
        <DetailField label="Egg Groups">{eggGroups}</DetailField>
        <DetailField label="Egg Cycles">
          {species?.hatchCounter} cycles
        </DetailField>
        <DetailField label="Gender Ratio">
          <span className="inline-flex items-center gap-1">
            <IconGenderMale className="size-4 text-blue-400" />
            {genderRatio[0]}%{' '}
          </span>
          <br />
          <span className="inline-flex items-center gap-1 leading-5">
            <IconGenderFemale className="size-4 text-pink-400" />
            {genderRatio[1]}%{' '}
          </span>
        </DetailField>
      </section>
    </Panel>
  );
};
