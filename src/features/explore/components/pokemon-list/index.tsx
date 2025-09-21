'use client';

import Link from 'next/link';
import React, { useCallback, useRef } from 'react';
import { type PokemonByGeneration } from '@/app/explore/page';
import InfiniteScroll from '@/components/infinite-scroll';
import PokemonCard from '@/components/pokemon/card';
import { Loader } from '@/components/ui/Loader';
import { usePokemonInfinitePagination } from '@/hooks/pokemon/usePokemonInfinitePagination';

interface Props {
  initialValue?: PokemonByGeneration;
  generation: string;
}

const PokemonList = ({ initialValue, generation }: Props) => {
  const { pagination, size, setSize, isValidating, isEndOfList } = usePokemonInfinitePagination(
    initialValue,
    generation,
  );
  const loaderRef = useRef(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const { isIntersecting } = entries[0];
      const loadMore = () => setSize(size + 1);

      if (isIntersecting && !isValidating) {
        console.log('isIntersecting');
        loadMore();
      }
    },
    [isValidating, setSize, size],
  );

  return (
    <>
      <InfiniteScroll
        observerCallback={handleObserver}
        ref={loaderRef}
        isEnd={isEndOfList}
        loaderElement={
          <div ref={loaderRef} className="flex justify-center py-8">
            <Loader />
          </div>
        }
      >
        <div className="mb-12 grid grid-cols-[repeat(auto-fit,13rem)] justify-center gap-4 lg:justify-start xl:grid-cols-5">
          {pagination?.map((page) =>
            page.pokemons?.map((pokemon) => (
              <Link key={pokemon.id} href={`/pokemon/${pokemon.name?.toLowerCase()}`}>
                <PokemonCard className="transition-all will-change-transform hover:scale-105" pokemon={pokemon} />
              </Link>
            )),
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default PokemonList;
