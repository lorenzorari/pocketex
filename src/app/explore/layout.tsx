import { type Metadata } from 'next';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { type WithChildren } from '@/models/utils';

export const metadata: Metadata = {
  title: 'Explore | Pocketex',
};

export default function ExploreLayout({ children }: WithChildren) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
