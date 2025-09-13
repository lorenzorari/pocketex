'use client';

import Link from 'next/link';
import React, { useCallback, useRef, useState } from 'react';
import { type PokemonByGeneration } from '@/app/explore/page';
import InfiniteScroll from '@/components/infinite-scroll';
import PokemonCard from '@/components/pokemon/card';
import { Loader } from '@/components/ui/Loader';
import { usePokemonInfinitePagination } from '@/hooks/pokemon/usePokemonInfinitePagination';
import styles from './pokemon-list.module.scss';

interface Props {
  initialValue?: PokemonByGeneration;
  generation: string;
}

const PokemonList = ({ initialValue, generation }: Props) => {
  const { pagination, size, setSize, isValidating, isLoading } = usePokemonInfinitePagination(initialValue);
  const [page, setPage] = useState<number>(1);
  const loaderRef = useRef(null);

  const handleObserver: IntersectionObserverCallback = useCallback(
    (entries) => {
      const { isIntersecting } = entries[0];

      if (isIntersecting && !isValidating && !isLoading) {
        loadMore();
      }
    },
    [isValidating, loadMore],
  );

  function loadMore() {
    setSize(size + 1);
  }

  return (
    <>
      {/* {props.isFiltering === false ? ( */}
      <InfiniteScroll
        observerCallback={handleObserver}
        loadMore={loadMore}
        page={page}
        ref={loaderRef}
        loaderElement={
          <>
            {/* TODO Remove when end list */}
            {/* {props.pokemons.length < props.limit && ( */}
            <div ref={loaderRef} className="flex justify-center py-8">
              <Loader />
            </div>
            {/* )} */}
          </>
        }
      >
        <div className={styles['pokemons-container']}>
          {pagination?.map((page) =>
            page.pokemons?.map((pokemon) => (
              <Link key={pokemon.id} href={`/pokemon/${pokemon.name?.toLowerCase()}`}>
                <PokemonCard className={styles.card} pokemon={pokemon} />
              </Link>
            )),
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default PokemonList;
