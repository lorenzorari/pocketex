import { ThemeProvider } from 'next-themes';
import { ThemeColorScript } from '@/components/scripts/ThemeColorScript';
import { ThemeColorManager } from '@/components/theme/ThemeColorManager';
import { COLOR_PRIMARY } from '@/constants';
import { Navbar } from '@/features/navbar/Navbar';
import { type WithChildren } from '@/models/utils';

export function HomeLayout({ children }: WithChildren) {
  return (
    <body className="bg-background-home">
      <ThemeColorScript lightColor={COLOR_PRIMARY} />
      <ThemeProvider attribute="class">
        <ThemeColorManager lightColor={COLOR_PRIMARY} />
        <Navbar isHome />
        <main className="mx-auto -mt-[72px]">{children}</main>
      </ThemeProvider>
    </body>
  );
}
