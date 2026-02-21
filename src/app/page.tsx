import { type Viewport } from 'next';
import { HeroBanner } from '@/components/hero-banner';
import { COLOR_BLACK, COLOR_PRIMARY } from '@/constants';
import { HomeLayout } from '@/layouts/HomeLayout';

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: COLOR_PRIMARY,
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: COLOR_BLACK,
    },
  ],
};

export default function HomePage() {
  return (
    <HomeLayout>
      <HeroBanner heading="Pocketex" />
    </HomeLayout>
  );
}
