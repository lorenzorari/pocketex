import { type Maybe } from '@/models/utils';
import { zeroPad } from '@/utils/zero-pad';

export function getPokemonNumber(id: Maybe<number>) {
  return `#${zeroPad(id ?? 0, 4)}`;
}
