import { Breeding } from '@/features/pokemon-details/components/Breeding';
import { EvolutionChainPanel } from '@/features/pokemon-details/components/evolution-chain';
import { PokemonDetailHero } from '@/features/pokemon-details/components/Hero';
import { Stats } from '@/features/pokemon-details/components/stats';
import { Training } from '@/features/pokemon-details/components/Training';
import { TypeEffectiveness } from '@/features/pokemon-details/components/TypeEffectiveness';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { type PokemonType } from '@/models/types';
import { getPokemon } from '@/services/pokemon';
import { getSpecies } from '@/services/species';
import { getTypeEffectiveness } from '@/services/types';

interface Params {
  id: string;
}

interface Props {
  params: Promise<Params>;
}

const DetailsPage = async ({ params }: Props) => {
  const pokemonId = (await params).id;
  const pokemon = await getPokemon(pokemonId);
  const { species, genus, description } = await getSpecies(pokemonId);

  const pokemonTypes = (pokemon?.types?.map(({ type }) => type.name) || []) as PokemonType[];
  const typeEffectiveness = await getTypeEffectiveness(pokemonTypes);
  const logoColorCSS = `var(--color-${pokemonTypes?.[0]}-1)`;

  return (
    <DefaultLayout logoColorCSS={logoColorCSS}>
      {pokemon ? (
        <>
          <PokemonDetailHero genus={genus} pokemon={pokemon} pokemonTypes={pokemonTypes} description={description} />
          {species && (
            <div className="relative z-10 rounded-t-[40px] bg-white px-5 py-10 shadow-[0px_100px_484px_0px_rgba(0,0,0,0.4)] lg:-mt-16 lg:px-10 lg:py-[60px] xl:px-32">
              <div className="mb-10 grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
                <Breeding species={species} />
                <Training pokemon={pokemon} species={species} />
                <TypeEffectiveness typeEffectiveness={typeEffectiveness} />
                {pokemon.stats && <Stats stats={pokemon.stats} />}
              </div>
              <EvolutionChainPanel evolutionChainUrl={species.evolutionChain?.url} />
            </div>
          )}
        </>
      ) : null}
    </DefaultLayout>
  );
};

export default DetailsPage;
