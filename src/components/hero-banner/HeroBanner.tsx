'use client';

import { IconSearch } from '@tabler/icons-react';
import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import tsparticlesOptions from '@/data/tsparticlesOptions';

interface Props {
  heading: string;
}

const HeroBanner = (props: Props) => {
  const [areParticlesLoading, setAreParticlesLoading] = useState<boolean>(true);

  const initParticles = (tsParticles: any) => {
    tsParticles.load('tsparticles', tsparticlesOptions).then(() => setAreParticlesLoading(false));
  };

  return (
    <section className="bg-primary relative h-screen">
      <Particles
        className="animate-scale-up absolute inset-0 opacity-0 [animation-delay:2s]"
        init={initParticles as any}
        options={tsparticlesOptions}
      />

      <div className="flex h-full items-center justify-center">
        <div className="relative z-1">
          <div className="overflow-hidden">
            <h1 className="animate-slide-from-top text-[20vw] leading-snug font-semibold text-white opacity-0 [animation-delay:0.5s] lg:text-[10vw] xl:text-[8.59755vw]">
              {props.heading}
            </h1>
          </div>
          {/* <Autocomplete placeholder="Search a pokemon by name or number..." /> */}
          <div className="flex gap-2">
            <button
              className="flex grow items-center gap-2 rounded-full bg-white px-5 py-2 text-left text-gray-400"
              type="button"
            >
              <IconSearch className="size-4 text-gray-400" />
              Search a Pokémon
              {/* <kbd className="ml-auto font-sans text-xs">⌘K</kbd> */}
            </button>
            {/* <button className="group flex size-[40px] items-center justify-center rounded-full bg-white text-gray-400 transition-all hover:text-black">
              <IconPokeball className="group-hover:animate-wiggle" />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
