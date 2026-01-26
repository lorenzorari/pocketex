import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/features/navbar/Navbar';
import { type WithChildren } from '@/models/utils';

export function HomeLayout({ children }: WithChildren) {
  return (
    <body className="bg-primary">
      <ThemeProvider attribute="class">
        <Navbar isHome />
        <main className="mx-auto -mt-[80px]">{children}</main>
      </ThemeProvider>
    </body>
  );
}
