import { type NamedAPIResources } from './../named-api-resource';

export interface PaginationResult {
  count?: number;
  next: string | null;
  previous: string | null;
  results?: NamedAPIResources;
}
