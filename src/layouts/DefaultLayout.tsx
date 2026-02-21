import { ThemeProvider } from 'next-themes';
import { COLOR_BLACK, COLOR_WHITE } from '@/constants';
import { Navbar } from '@/features/navbar/Navbar';

interface Props {
  children: React.ReactNode;
  logoColorCSS?: string;
}

export function DefaultLayout({ children, logoColorCSS }: Props) {
  return (
    <body className="bg-background">
      <ThemeProvider attribute="class">
        <Navbar logoColorCSS={logoColorCSS} />
        <main className="mx-auto 2xl:max-w-[1440px]">{children}</main>
      </ThemeProvider>
      <script>
        {`
          (function() {
            const mode = localStorage.getItem('theme') || 'system'
            if (mode === 'light' || mode === 'dark') {
              const colors = { light: '${JSON.stringify(COLOR_WHITE)}', dark: '${JSON.stringify(COLOR_BLACK)}' }
              document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove())
              const meta = document.createElement('meta')
              meta.name = 'theme-color'
              meta.content = colors[mode]
              document.head.appendChild(meta)
            }
          })()`}
      </script>
    </body>
  );
}
