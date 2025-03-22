import { pokeapi } from '@/helpers/http';
import { type Type } from '@/models/types';

export enum TypeEffectivenessGroupLabel {
  Defense = 'defense',
  Attack = 'attack',
}

type Effectiveness = Record<string, number>;

export type TypeEffectivenessGroup = {
  noDamage: string[];
  halfDamage: string[];
  doubleDamage: string[];
  quadrupleDamage: string[];
};

export type TypeEffectiveness = {
  [TypeEffectivenessGroupLabel.Attack]: TypeEffectivenessGroup;
  [TypeEffectivenessGroupLabel.Defense]: TypeEffectivenessGroup;
};

interface FullTypeEffectiveness {
  noDamageTo: string[];
  quarterDamageTo: string[];
  halfDamageTo: string[];
  normalDamageTo: string[];
  doubleDamageTo: string[];
  quadrupleDamageTo: string[];
  noDamageFrom: string[];
  quarterDamageFrom: string[];
  halfDamageFrom: string[];
  normalDamageFrom: string[];
  doubleDamageFrom: string[];
  quadrupleDamageFrom: string[];
}

async function getType(typeIdOrName: string) {
  return pokeapi.get(`type/${typeIdOrName}`).json<Type>();
}

export async function getTypeEffectiveness(types: string[]): Promise<TypeEffectiveness> {
  const typeData = await Promise.all(types.map(getType));

  const calculatedDefense = calculateMultipliers(typeData);
  const calculatedAttack = calculateMultipliers(typeData, true);

  const defenseGroup = groupEffectiveness(calculatedDefense, true);
  const effectivenessGroup = groupEffectiveness(calculatedAttack, false, defenseGroup);

  return {
    [TypeEffectivenessGroupLabel.Attack]: getTypeEffectivenessByGroup(
      effectivenessGroup,
      TypeEffectivenessGroupLabel.Attack,
    ),
    [TypeEffectivenessGroupLabel.Defense]: getTypeEffectivenessByGroup(
      effectivenessGroup,
      TypeEffectivenessGroupLabel.Defense,
    ),
  };
}

export function getTypeEffectivenessByGroup(
  data: FullTypeEffectiveness,
  group: TypeEffectivenessGroupLabel,
): TypeEffectivenessGroup {
  if (!data)
    return {
      noDamage: [],
      halfDamage: [],
      doubleDamage: [],
      quadrupleDamage: [],
    };

  const suffix = group === 'defense' ? 'From' : 'To';

  return {
    noDamage: data[`noDamage${suffix}`],
    halfDamage: data[`halfDamage${suffix}`],
    doubleDamage: data[`doubleDamage${suffix}`],
    quadrupleDamage: data[`quadrupleDamage${suffix}`],
  };
}

function calculateMultipliers(typeData: Type[], isAttack = false, effectiveness: Effectiveness = {}) {
  typeData.forEach((data) => {
    const damageRelations = data.damageRelations;
    const multipliers = [0, 0.5, 2];
    const categories = isAttack
      ? ['noDamageTo', 'halfDamageTo', 'doubleDamageTo']
      : ['noDamageFrom', 'halfDamageFrom', 'doubleDamageFrom'];

    categories.forEach((category, index) => {
      damageRelations[category as keyof Type['damageRelations']].forEach((type) => {
        effectiveness[type.name] = (effectiveness[type.name] || 1) * multipliers[index];
      });
    });
  });

  return effectiveness;
}

function groupEffectiveness(
  effectiveness: Effectiveness,
  isDefensive: boolean,
  groups?: FullTypeEffectiveness,
): FullTypeEffectiveness {
  const initialGroups: FullTypeEffectiveness = {
    noDamageTo: [],
    quarterDamageTo: [],
    halfDamageTo: [],
    normalDamageTo: [],
    doubleDamageTo: [],
    quadrupleDamageTo: [],
    noDamageFrom: [],
    quarterDamageFrom: [],
    halfDamageFrom: [],
    normalDamageFrom: [],
    doubleDamageFrom: [],
    quadrupleDamageFrom: [],
  };

  if (!groups) {
    groups = initialGroups;
  }

  Object.entries(effectiveness).forEach(([type, multiplier]) => {
    const prefix = isDefensive ? 'From' : 'To';
    switch (multiplier) {
      case 0:
        groups[`noDamage${prefix}` as keyof FullTypeEffectiveness].push(type);
        break;
      case 0.25:
        groups[`quarterDamage${prefix}` as keyof FullTypeEffectiveness].push(type);
        break;
      case 0.5:
        groups[`halfDamage${prefix}` as keyof FullTypeEffectiveness].push(type);
        break;
      case 1:
        groups[`normalDamage${prefix}` as keyof FullTypeEffectiveness].push(type);
        break;
      case 2:
        groups[`doubleDamage${prefix}` as keyof FullTypeEffectiveness].push(type);
        break;
      case 4:
        groups[`quadrupleDamage${prefix}` as keyof FullTypeEffectiveness].push(type);
        break;
    }
  });

  return groups;
}
