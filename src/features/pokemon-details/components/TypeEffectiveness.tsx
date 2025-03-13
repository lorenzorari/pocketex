'use client';

import { useState } from 'react';
import { DetailField } from '@/components/details';
import PokemonTypeBadge from '@/components/PokemonTypeBadge';
import { Button, ButtonVariant } from '@/components/ui/Button';
import { Panel } from '@/components/ui/panel';
import { type PokemonType } from '@/models/types';
import {
  type TypeEffectivenessGroup,
  TypeEffectivenessGroupLabel,
  type TypeEffectiveness as TypeEffectivenessData,
} from '@/services/types';

interface Props {
  typeEffectiveness: TypeEffectivenessData;
}

export const TypeEffectiveness = ({ typeEffectiveness }: Props) => {
  const [activeTrigger, setActiveTrigger] = useState<TypeEffectivenessGroupLabel>(TypeEffectivenessGroupLabel.Attack);
  const [activeContent, setActiveContent] = useState<TypeEffectivenessGroup>(
    typeEffectiveness[TypeEffectivenessGroupLabel.Attack],
  );

  function setTab(group: TypeEffectivenessGroupLabel) {
    setActiveTrigger(group);
    setActiveContent(typeEffectiveness[group]);
  }

  return (
    <Panel title="Type Effectiveness">
      <div className="mb-4 flex gap-2">
        <Button
          variant={activeTrigger === TypeEffectivenessGroupLabel.Attack ? ButtonVariant.Dark : ButtonVariant.Outline}
          onClick={() => setTab(TypeEffectivenessGroupLabel.Attack)}
        >
          Attack
        </Button>
        <Button
          variant={activeTrigger === TypeEffectivenessGroupLabel.Defense ? ButtonVariant.Dark : ButtonVariant.Outline}
          onClick={() => setTab(TypeEffectivenessGroupLabel.Defense)}
        >
          Defense
        </Button>
      </div>
      <DetailField label="No Damage">
        {activeContent?.noDamage?.length ? (
          <div className="flex gap-1">
            {activeContent?.noDamage.map((type) => <PokemonTypeBadge key={type} variant={type as PokemonType} />)}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
      <DetailField label="Half Damage">
        {activeContent?.halfDamage?.length ? (
          <div className="flex gap-1">
            {activeContent?.halfDamage.map((type) => <PokemonTypeBadge key={type} variant={type as PokemonType} />)}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
      <DetailField label="Double Damage">
        {activeContent?.doubleDamage?.length ? (
          <div className="flex gap-1">
            {activeContent?.doubleDamage.map((type) => <PokemonTypeBadge key={type} variant={type as PokemonType} />)}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
      <DetailField label="Quadruple Damage">
        {activeContent?.quadrupleDamage?.length ? (
          <div className="flex gap-1">
            {activeContent?.quadrupleDamage.map((type) => (
              <PokemonTypeBadge key={type} variant={type as PokemonType} />
            ))}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
    </Panel>
  );
};
