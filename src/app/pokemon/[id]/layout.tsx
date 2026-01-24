import { getDocumentTitle } from '@/helpers/getDocumentTitle';
import { getPokemon } from '@/services/pokemon';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const pokemon = await getPokemon(id);
  const capitalizedName = pokemon?.formattedName ?? undefined;

  return {
    title: getDocumentTitle(capitalizedName),
  };
}

export default function PokemonDetailsLayout({ children }: Props) {
  return children;
}
