import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/features/navbar/Navbar';
import { type WithChildren } from '@/models/utils';

export function HomeLayout({ children }: WithChildren) {
  return (
    <body className="home">
      <ThemeProvider attribute="class">
        <Navbar isHome />
        <main className="mx-auto -mt-[72px]">{children}</main>
      </ThemeProvider>
    </body>
  );
}
