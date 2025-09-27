import { ExploreMainContent } from '@/features/explore/components/ExploreMainContent';
import { getGenerationListItems } from '@/services/generations';
import { getPokemonCardPagination } from '@/services/pokemon';

const ExplorePage = async () => {
  const generationListItems = await getGenerationListItems();
  const pokemonCards = await getPokemonCardPagination();

  return (
    <section className="px-5 pt-8 lg:px-10 xl:px-32">
      <ExploreMainContent
        count={pokemonCards.count}
        generationListItems={generationListItems}
        pokemonListInitialValue={pokemonCards}
      />
    </section>
  );
};

export default ExplorePage;
