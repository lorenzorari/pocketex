'use client';

import { IconDeviceLaptop, IconSun, IconMoon, IconPointFilled } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
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
