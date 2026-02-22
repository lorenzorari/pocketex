'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback, useEffect } from 'react';
import { COLOR_BLACK, COLOR_WHITE } from '@/constants';

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export function ThemeColorManager({ lightColor = COLOR_WHITE, darkColor = COLOR_BLACK }: Props) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const isAlreadyCorrect = useCallback(() => {
    const metas = document.querySelectorAll('meta[name="theme-color"]');

    if (resolvedTheme === 'system') {
      if (metas.length !== 2) return false;

      const light = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: light)"]');
      const dark = document.querySelector('meta[name="theme-color"][media="(prefers-color-scheme: dark)"]');

      return light?.getAttribute('content') === lightColor && dark?.getAttribute('content') === darkColor;
    }

    if (metas.length !== 1) return false;

    const targetScheme = resolvedTheme === 'light' ? lightColor : darkColor;
    return metas[0].getAttribute('content') === targetScheme;
  }, [darkColor, lightColor, resolvedTheme]);

  useEffect(() => {
    if (isAlreadyCorrect()) return;

    document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove());

    if (!resolvedTheme || resolvedTheme === 'system') {
      ['light', 'dark'].forEach((scheme) => {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = scheme === 'light' ? lightColor : darkColor;
        meta.media = `(prefers-color-scheme: ${scheme})`;
        document.head.appendChild(meta);
      });

      return;
    }

    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = resolvedTheme === 'light' ? lightColor : darkColor;
    document.head.appendChild(meta);
  }, [darkColor, isAlreadyCorrect, lightColor, pathname, resolvedTheme]);

  return null;
}
