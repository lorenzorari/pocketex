import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/features/navbar/Navbar';

interface Props {
  children: React.ReactNode;
  logoColorCSS?: string;
}

export function DefaultLayout({ children, logoColorCSS }: Props) {
  return (
    <body>
      <ThemeProvider attribute="class">
        <Navbar logoColorCSS={logoColorCSS} />
        <main className="mx-auto 2xl:max-w-[1440px]">{children}</main>
      </ThemeProvider>
    </body>
  );
}
