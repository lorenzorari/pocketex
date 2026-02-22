import { ThemeProvider } from 'next-themes';
import { ThemeColorScript } from '@/components/scripts/ThemeColorScript';
import { ThemeColorManager } from '@/components/theme/ThemeColorManager';
import { Navbar } from '@/features/navbar/Navbar';

interface Props {
  children: React.ReactNode;
  logoColorCSS?: string;
}

export function DefaultLayout({ children, logoColorCSS }: Props) {
  return (
    <body className="bg-background">
      <ThemeColorScript />
      <ThemeProvider attribute="class">
        <ThemeColorManager />
        <Navbar logoColorCSS={logoColorCSS} />
        <main className="mx-auto 2xl:max-w-[1440px]">{children}</main>
      </ThemeProvider>
    </body>
  );
}
