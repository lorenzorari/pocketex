'use client';

import Link from 'next/link';
import React, { useCallback, useRef } from 'react';
import InfiniteScroll from '@/components/infinite-scroll';
import PokemonCard from '@/components/pokemon/card';
import { Skeleton } from '@/components/ui/Skeleton';
import { usePokemonInfinitePagination } from '@/hooks/pokemon/usePokemonInfinitePagination';
import { type PokemonByGeneration } from '@/services/pokemon';
import { fillArray } from '@/utils/array';

interface Props {
  initialValue?: PokemonByGeneration;
  generation: string;
}

const PokemonList = ({ initialValue, generation }: Props) => {
  const { pagination, size, setSize, isValidating, isEndOfList, DEFAULT_LIMIT } = usePokemonInfinitePagination(
    initialValue,
    generation,
  );
  const loaderRef = useRef<HTMLDivElement>(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const { isIntersecting } = entries[0];
      const loadMore = () => setSize(size + 1);

      if (isIntersecting && !isValidating) {
        loadMore();
      }
    },
    [isValidating, setSize, size],
  );

  return (
    <>
      <InfiniteScroll observerCallback={handleObserver} ref={loaderRef} isLoading={!isEndOfList}>
        <div className="mb-12 grid grid-cols-[repeat(auto-fit,13rem)] justify-center gap-4 lg:justify-start xl:grid-cols-5">
          {!pagination?.[0].pokemons?.length &&
            fillArray(DEFAULT_LIMIT).map((v) => <Skeleton key={v} className={'h-[319.98px] rounded-[1.3rem]'} />)}

          {pagination?.map((page) =>
            page.pokemons.map((pokemon) => (
              <Link key={pokemon.id} href={pokemon.url}>
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
