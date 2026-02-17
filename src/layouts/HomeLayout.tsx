import { ThemeProvider } from 'next-themes';
import { type WithChildren } from '@/models/utils';

export function HomeLayout({ children }: WithChildren) {
  return (
    <body className="bg-primary dark:bg-background">
      <ThemeProvider attribute="class">
        {/* <Navbar isHome /> */}
        <main className="mx-auto">{children}</main>
      </ThemeProvider>
    </body>
  );
}
