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
  const { species, genus } = await getSpecies(pokemonId);

  const pokemonTypes = (pokemon?.types?.map(({ type }) => type.name) || []) as PokemonType[];
  const typeEffectiveness = await getTypeEffectiveness(pokemonTypes);
  const logoColorCSS = `var(--color-${pokemonTypes?.[0]}-1)`;

  // useEffect(() => {
  //   if (pokemon?.name) {
  //     document.title = `${pokemon.name} | Pocketex`;
  //   }
  // }, [pokemon]);

  const getDescription = () => {
    const text = species?.flavorTextEntries?.find(({ language }) => language.name === 'en')?.flavorText;

    if (!text) return '';

    return text
      ?.replace(/u'\f'/, ' ')
      .replace(/\u00AD/g, '')

      .replace(/\u000C/g, ' ')
      .replace(/u' -\n'/, ' - ')
      .replace(/u'-\n'/, '-')
      .replace(/(\r\n|\n|\r)/gm, ' ');
  };

  return (
    // <PrimaryTypeCtx value={pokemonTypes?.[0] as PokemonType}>
    <DefaultLayout logoColorCSS={logoColorCSS}>
      {pokemon ? (
        <>
          <PokemonDetailHero
            genus={genus}
            pokemon={pokemon}
            pokemonTypes={pokemonTypes}
            description={getDescription()}
          />
          {species && (
            <div className="relative z-10 rounded-t-[40px] bg-white px-5 py-10 shadow-[0px_100px_484px_0px_rgba(0,0,0,0.4)] lg:-mt-16 lg:px-10 lg:py-[60px] xl:px-32">
              <EvolutionChainPanel evolutionChainUrl={species.evolutionChain?.url} />
              <div className="mb-10 grid gap-10 md:grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
                <Breeding species={species} />
                <Training pokemon={pokemon} species={species} />
                <TypeEffectiveness typeEffectiveness={typeEffectiveness} />
                {pokemon.stats && <Stats stats={pokemon.stats} />}
              </div>
            </div>
          )}
        </>
      ) : null}
    </DefaultLayout>
    // {/* </PrimaryTypeCtx> */}
  );
};

export default DetailsPage;
