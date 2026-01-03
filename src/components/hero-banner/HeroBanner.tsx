'use client';

import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import { SearchTrigger } from '@/components/hero-banner/SearchTrigger';
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
          <div className="flex gap-2">
            <SearchTrigger />
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
