'use client';

import { IconDeviceLaptop, IconSun, IconMoon, IconPointFilled } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { COLOR_BLACK, COLOR_WHITE } from '@/constants';
import { type BaseComponent } from '@/models/utils';
import { cn } from '@/utils/classnames';

const ICON_STROKE = 1.2;
const THEMES = ['system', 'light', 'dark'];
const THEME_ICONS = {
  system: IconDeviceLaptop,
  light: IconSun,
  dark: IconMoon,
};

export function ThemeSwitcher({ className }: BaseComponent) {
  const [isMounted, setIsMounted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setIsMounted(true), []);

  if (!isMounted)
    return (
      <div className="p-1">
        <IconPointFilled className="text-muted-foreground/50 size-5 animate-pulse" />
      </div>
    );

  function handleClick() {
    if (!theme) return;

    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
    setMetaThemeColor(THEMES[nextIndex]);
  }

  function setMetaThemeColor(targetTheme: string) {
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.remove());

    if (targetTheme === 'system') {
      const metaLight = document.createElement('meta');
      metaLight.name = 'theme-color';
      metaLight.media = '(prefers-color-scheme: light)';
      metaLight.content = COLOR_WHITE;
      document.head.appendChild(metaLight);

      const metaDark = document.createElement('meta');
      metaDark.name = 'theme-color';
      metaDark.media = '(prefers-color-scheme: dark)';
      metaDark.content = COLOR_BLACK;
      document.head.appendChild(metaDark);

      return;
    }

    const meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = targetTheme === 'light' ? COLOR_WHITE : COLOR_BLACK;
    document.head.appendChild(meta);
  }

  function ThemeIcon({ isHover = false }) {
    let Icon = THEME_ICONS[(resolvedTheme ?? THEME_ICONS.dark) as keyof typeof THEME_ICONS];
    const isSystem = theme === 'system';

    if (isHover && isSystem) Icon = IconDeviceLaptop;

    return <Icon className={cn('size-5', !isHover && isSystem ? 'animate-fade-in' : '')} stroke={ICON_STROKE} />;
  }

  return (
    <Button
      className={cn('align-middle', className)}
      variant="menu"
      size="icon"
      onClick={handleClick}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setTimeout(() => setIsHover(false), 500)}
    >
      <ThemeIcon isHover={isHover} />
    </Button>
  );
}
