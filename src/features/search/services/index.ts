import { type PokemonSearchItem } from '@/features/search/models/PokemonSearchItem';
import { getArtworkUrl } from '@/helpers/get-artwork-url';
import { getFormattedPokemonName } from '@/helpers/get-formatted-pokemon-name';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { getSpeciesPagination } from '@/services/species';

export async function getPokemonSearchItems() {
  const { results } = await getSpeciesPagination(undefined, 9999);

  if (!results) return [];

  return results.map(({ name, url }) => {
    const id = getIdFromResourceUrl(url);

    return {
      id,
      name,
      formattedName: getFormattedPokemonName(name),
      url: `/pokemon/${name}`,
      imageUrl: getArtworkUrl(id),
    } as PokemonSearchItem;
  });
}
