import { capitalize } from '@/utils/capitalize';

export function getFormattedPokemonName(name: string) {
  return name.split('-').map(capitalize).join(' ');
}
