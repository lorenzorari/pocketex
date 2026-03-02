import { getFormattedPokemonName } from '@/helpers/get-formatted-pokemon-name';
import { getDocumentTitle } from '@/helpers/getDocumentTitle';
import { getSpecies } from '@/services/species';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  // Use species to avoid errors with pokemon form names
  const pokemon = await getSpecies(id);
  const capitalizedName = pokemon?.species.name ? getFormattedPokemonName(pokemon?.species.name) : undefined;

  return {
    title: getDocumentTitle(capitalizedName),
  };
}

export default function PokemonDetailsLayout({ children }: Props) {
  return children;
}
