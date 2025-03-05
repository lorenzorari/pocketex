import { NamedAPIResource } from '@/models/named-api-resource';

export interface PokemonStat {
  stat?: NamedAPIResource;
  effort?: number;
  baseStat?: number;
}
