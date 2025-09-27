import { type NamedAPIResources } from './../named-api-resource';

export interface PokemonPagination {
  count?: number;
  next: string | null;
  previous: string | null;
  results?: NamedAPIResources;
}
