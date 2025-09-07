import { type Name } from './name';
import { type NamedAPIResource } from './named-api-resource';

export type Generation = {
  id: number;
  name: string;
  abilities: NamedAPIResource[];
  names: Name[];
  mainRegion: NamedAPIResource;
  moves: NamedAPIResource[];
  pokemonSpecies: NamedAPIResource[];
  types: NamedAPIResource[];
  versionGroups: NamedAPIResource[];
};
