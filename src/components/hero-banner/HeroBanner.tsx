'use client';

import React from 'react';
import Particles, { type ParticlesProps } from 'react-tsparticles';
import { RandomPokemonButton } from '@/components/hero-banner/RandomPokemonButton';
import { SearchTrigger } from '@/components/hero-banner/SearchTrigger';
import tsparticlesOptions from '@/data/tsparticlesOptions';

interface Props {
  heading: string;
}

const HeroBanner = (props: Props) => {
  const initParticles: ParticlesProps['init'] = async (tsParticles) => {
    tsParticles.load('tsparticles', tsparticlesOptions());
  };

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
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <SearchTrigger className="animate-fade-in opacity-0 [animation-delay:1s]" withTransparentOverlay />
            <RandomPokemonButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
