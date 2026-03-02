'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Particles, { type ParticlesProps } from 'react-tsparticles';
import useSWR from 'swr';
import { RandomPokemonButton } from '@/components/hero-banner/RandomPokemonButton';
import { SearchTrigger } from '@/components/hero-banner/SearchTrigger';
import tsparticlesOptions from '@/data/tsparticlesOptions';
import { getPokemonSearchItems } from '@/features/search/services';

interface Props {
  heading: string;
}

const HeroBanner = (props: Props) => {
  const router = useRouter();
  const { data: allPokemons } = useSWR(`pokemon-autocomplete`, getPokemonSearchItems, {
    fallbackData: [],
  });

  const initParticles: ParticlesProps['init'] = async (tsParticles) => {
    tsParticles.load('tsparticles', tsparticlesOptions());
  };

  function getRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * allPokemons.length);
    return allPokemons[randomIndex];
  }

  function goToRandomPokemon() {
    const randomPokemon = getRandomPokemon();
    router.push(`/pokemon/${randomPokemon.name}`);
  }

  return (
    <section className="bg-primary relative h-screen dark:bg-black">
      <Particles
        className="animate-scale-up absolute inset-0 opacity-0 [animation-delay:2s]"
        init={initParticles}
        options={tsparticlesOptions(true)}
      />

      <div className="flex h-full items-center justify-center">
        <div className="relative z-1">
          <div className="overflow-hidden">
            <h1 className="animate-slide-from-top text-[20vw] leading-snug font-semibold text-white opacity-0 [animation-delay:0.5s] lg:text-[10vw] xl:text-[8.59755vw]">
              {props.heading}
            </h1>
          </div>
          <div className="flex gap-2">
            <SearchTrigger className="animate-fade-in opacity-0 [animation-delay:1s]" withTransparentOverlay />
            <RandomPokemonButton onClick={goToRandomPokemon} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
