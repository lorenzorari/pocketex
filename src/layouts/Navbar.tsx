'use client';

import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchTrigger } from '@/components/hero-banner/SearchTrigger';
import { Logo } from '@/components/Logo';
import { cn } from '@/utils/classnames';

interface Props {
  isHome?: boolean;
  logoColorCSS?: string;
}

const GITHUB_LINK = 'https://github.com/lorenzorari/pocketex';

export const Navbar = ({ isHome, logoColorCSS }: Props) => {
  const logoColor = logoColorCSS ?? `var(--color-primary)`;

  return (
    <header
      className={cn(
        'bg-background md:bg-background/65 sticky top-0 z-20 mx-auto px-5 py-6 md:border-b md:border-b-[#ffffff4d] md:backdrop-blur-xl lg:px-10 xl:px-32 2xl:max-w-[1440px] dark:md:border-b-transparent',
        {
          'animate-fade-in relative border-none bg-transparent opacity-0 backdrop-blur-none [animation-delay:1.5s] md:bg-transparent md:backdrop-blur-none':
            isHome,
        },
      )}
    >
      <nav className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold">
          <picture className="size-8" style={{ color: logoColor }}>
            <Logo className={cn('hover:animate-wiggle transition-opacity', isHome ? 'fill-white' : 'fill-current')} />
          </picture>
          <span className="hidden md:inline">{isHome ? null : 'Pocketex'}</span>
        </Link>
        <ul className={cn('flex items-center gap-4', { 'text-white': isHome })}>
          {!isHome && (
            <li>
              <SearchTrigger isIcon />
            </li>
          )}
          <li>
            <Link
              href="/explore"
              className={cn(
                'hover:text-foreground text-muted-foreground text-sm underline-offset-4 transition-all hover:underline',
                {
                  'text-white/88 hover:text-white': isHome,
                },
              )}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link target="_blank" href={{ pathname: GITHUB_LINK }}>
              <IconBrandGithub
                stroke={1.2}
                className={cn('hover:text-foreground text-muted-foreground transition-all', {
                  'text-white/88 hover:text-white': isHome,
                })}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
