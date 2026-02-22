import { HeroBanner } from '@/components/hero-banner';
import { HomeLayout } from '@/layouts/HomeLayout';

export default function HomePage() {
  return (
    <HomeLayout>
      <HeroBanner heading="Pocketex" />
    </HomeLayout>
  );
}
