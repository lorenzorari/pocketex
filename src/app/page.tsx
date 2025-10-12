import { HeroBanner } from '@/components/hero-banner';
import { HomeLayout } from '@/layouts/HomeLayout';

export default function HomePage() {
  return (
    <HomeLayout>
      {/* <div className="relative h-screen bg-gray-700 text-white">
        <div className="absolute top-1/2 left-1/2 h-[60vh] w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-md border-gray-600">
          <Search />
        </div>
      </div> */}
      <HeroBanner heading="Pocketex" />
    </HomeLayout>
  );
}
