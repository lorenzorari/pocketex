import { notFound } from 'next/navigation';
import { EvolutionChainPanel } from '@/features/pokemon-details/components/evolution-chain';
import { PokemonDetailHero } from '@/features/pokemon-details/components/Hero';
import { BreedingPanel } from '@/features/pokemon-details/components/panels/BreedingPanel';
import { ContinuePanel } from '@/features/pokemon-details/components/panels/ContinuePanel';
import { StatsPanel } from '@/features/pokemon-details/components/panels/stats';
import { TrainingPanel } from '@/features/pokemon-details/components/panels/TrainingPanel';
import { TypeEffectivenessPanel } from '@/features/pokemon-details/components/panels/TypeEffectivenessPanel';
import { getIdFromResourceUrl } from '@/helpers/get-id-from-resource-url';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { type PokemonType } from '@/models/types';
import { getPokemon, getPokemonCard } from '@/services/pokemon';
import { getSpecies, getSpeciesPagination } from '@/services/species';
import { getTypeEffectiveness } from '@/services/types';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const FIRST_GENERATION_COUNT = 151;
  const { results } = await getSpeciesPagination(undefined, FIRST_GENERATION_COUNT);

  if (!results) return [];

  const pokemonIds = results.map(({ url }) => getIdFromResourceUrl(url).toString());
  const pokemonNames = results.map(({ name }) => name);

  return [...pokemonIds, ...pokemonNames].map((id) => ({ id }));
}

const DetailsPage = async ({ params }: Props) => {
  const pokemonId = (await params).id;
  const pokemon = await getPokemon(pokemonId);
  const speciesData = await getSpecies(`${pokemon?.id}`);

  if (!pokemon || !speciesData) return notFound();

  const [prevPokemon, nextPokemon] = await Promise.all([
    pokemon.id > 1 ? getPokemonCard(`${pokemon.id - 1}`) : null,
    getPokemonCard(`${pokemon.id + 1}`),
  ]);

  const { species, genus, description } = speciesData;

  const pokemonTypes = (pokemon?.types?.map(({ type }) => type.name) || []) as PokemonType[];
  const typeEffectiveness = await getTypeEffectiveness(pokemonTypes);
  const logoColorCSS = `var(--color-${pokemonTypes?.[0]}-1)`;

  return (
    <DefaultLayout logoColorCSS={logoColorCSS}>
      {pokemon ? (
        <>
          <PokemonDetailHero genus={genus} pokemon={pokemon} pokemonTypes={pokemonTypes} description={description} />
          {species && (
            <div className="relative z-10 rounded-t-[40px] bg-white py-10 shadow-[0px_100px_484px_0px_rgba(0,0,0,0.4)] lg:-mt-16 lg:py-[60px]">
              <div className="px-5 lg:px-10 xl:px-32">
                <EvolutionChainPanel evolutionChainUrl={species.evolutionChain?.url} />
                <div className="grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
                  <BreedingPanel species={species} />
                  <TrainingPanel pokemon={pokemon} species={species} />
                  <TypeEffectivenessPanel typeEffectiveness={typeEffectiveness} />
                  <StatsPanel stats={pokemon.stats} />
                </div>
                <hr className="my-10" />
                <ContinuePanel prevPokemon={prevPokemon} nextPokemon={nextPokemon} />
              </div>
            </div>
          )}
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default DetailsPage;
