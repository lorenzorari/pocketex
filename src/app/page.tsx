import { type Viewport } from 'next';
import { HeroBanner } from '@/components/hero-banner';
import { COLOR_PRIMARY } from '@/constants';
import { HomeLayout } from '@/layouts/HomeLayout';

export const viewport: Viewport = {
  themeColor: COLOR_PRIMARY,
};

export default function HomePage() {
  return (
    <HomeLayout>
      <HeroBanner heading="Pocketex" />
    </HomeLayout>
  );
}
