'use client';

import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { COLOR_BLACK, COLOR_WHITE } from '@/constants';

interface Props {
  lightColor?: string;
  darkColor?: string;
}

export function ThemeColorManager({ lightColor = COLOR_WHITE, darkColor = COLOR_BLACK }: Props) {
  const pathname = usePathname();
  const { theme } = useTheme();

  useEffect(() => {
    const metas = document.querySelectorAll('meta[name="theme-color"]');

    const isAlreadyCorrect = () => {
      if (theme === 'system') {
        if (metas.length !== 2) return false;

        return Array.from(metas).every((meta) => [lightColor, darkColor].includes(meta.getAttribute('content') ?? ''));
      }

      if (metas.length !== 1) return false;

      const targetScheme = theme === 'light' ? lightColor : darkColor;
      return metas[0].getAttribute('content') === targetScheme;
    };

    if (isAlreadyCorrect()) return;

    metas.forEach((el) => el.remove());

    const createThemeColorMeta = (scheme: string, withMedia: boolean = false) => {
      const meta = document.createElement('meta');
      meta.name = 'theme-color';
      meta.content = scheme === 'light' ? lightColor : darkColor;
      if (withMedia) meta.media = `(prefers-color-scheme: ${scheme})`;
      document.head.appendChild(meta);
    };

    if (!theme || theme === 'system') {
      ['light', 'dark'].forEach((scheme) => createThemeColorMeta(scheme, true));
      return;
    }

    createThemeColorMeta(theme);
  }, [darkColor, lightColor, pathname, theme]);

  return null;
}
