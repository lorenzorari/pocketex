'use client'

import { IconBrandGithub } from '@tabler/icons-react';
import { Logo } from '@/components/Logo';
import { usePrimaryType } from '@/pages/details/contexts/usePrimaryType';
import { cn } from '@/utils/classnames';
import Link from 'next/link';

interface Props {
  isHome?: boolean;
}

const GITHUB_LINK = 'https://github.com/lorenzorari/pocketex';

export const Navbar = ({ isHome }: Props) => {
  const primaryTypeColor = usePrimaryType();
  const logoColor = `var(--color-${primaryTypeColor ? `${primaryTypeColor}-1` : 'primary'})`;

  return (
    <header
      className={cn(
        'sticky top-0 z-20 mx-auto border-b border-b-[#ffffff4d] px-5 py-6 backdrop-blur-lg lg:px-10 xl:px-32 2xl:max-w-[1440px]',
        {
          'relative animate-fadeIn border-none opacity-0 backdrop-blur-none [animation-delay:1.5s]': isHome,
        },
      )}
    >
      <nav className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
          <picture className="size-8" style={{ color: logoColor }}>
            <Logo
              className={cn(
                'transition-opacity hover:animate-wiggle',
                isHome ? 'fill-white' : 'fill-current',
                primaryTypeColor === undefined ? 'opacity-0' : 'opacity-100',
              )}
            />
          </picture>
          <span className="hidden md:inline">{isHome ? null : 'Pocketex'}</span>
        </Link>
        <ul className={cn('flex items-center gap-4', { 'text-white': isHome })}>
          <li>
            <Link href="/explore" className="text-sm underline-offset-4 hover:underline">
              Explore
            </Link>
          </li>
          <li>
            <Link target="_blank" href={{ pathname: GITHUB_LINK }} className="text-sm underline-offset-4 hover:underline">
              <IconBrandGithub
                className={cn('text-gray-300 transition-colors hover:text-black', {
                  'text-white/60 hover:text-white': isHome,
                })}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
