import { type NamedAPIResource, type NamedAPIResources } from '../named-api-resource';
import { type PokemonAbilities } from './ability';
import { type PokemonHeldItems } from './held-item';
import { type PokemonMoves } from './move';
import { type PokemonSprites } from './sprite';
import { type PokemonStat } from './stat';
import { type PokemonType } from './type';

export interface Pokemon {
  id: number;
  name: string;
  formattedName?: string;
  baseExperience?: number;
  height?: number;
  isDefault?: boolean;
  order?: number;
  weight?: number;
  abilities?: PokemonAbilities;
  forms?: NamedAPIResources;
  gameIndices?: any;
  heldItems?: PokemonHeldItems;
  locationAreaEncounters?: string;
  moves?: PokemonMoves;
  sprites?: PokemonSprites;
  species?: NamedAPIResource;
  stats?: PokemonStat[];
  types?: PokemonType[];
}

export declare type Pokemons = Pokemon[];
