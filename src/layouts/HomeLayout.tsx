import { type WithChildren } from '@/models/utils';
import { Navbar } from './Navbar';

export function HomeLayout({ children }: WithChildren) {
  return (
    <body className="bg-primary">
      <Navbar isHome />
      <main className="mx-auto -mt-[80px]">{children}</main>
    </body>
  );
}
