import { getDocumentTitle } from '@/helpers/getDocumentTitle';
import { getSpecies } from '@/services/species';
import { capitalize } from '@/utils/capitalize';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const { species } = await getSpecies(id);
  const capitalizedName = species?.name ? capitalize(species.name) : undefined;

  return {
    title: getDocumentTitle(capitalizedName),
  };
}

export default function PokemonDetailsLayout({ children }: Props) {
  return children;
}
