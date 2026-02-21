import Script from 'next/script';
import { ThemeProvider } from 'next-themes';
import { COLOR_BLACK, COLOR_PRIMARY } from '@/constants';
import { Navbar } from '@/features/navbar/Navbar';
import { type WithChildren } from '@/models/utils';

export function HomeLayout({ children }: WithChildren) {
  return (
    <body className="bg-background-home">
      <ThemeProvider attribute="class">
        <Navbar isHome />
        <main className="mx-auto -mt-[72px]">{children}</main>
      </ThemeProvider>
      <Script id="theme-color">
        {`
          (function() {
            const mode = localStorage.getItem('theme') || 'system'
            if (mode === 'light' || mode === 'dark') {
              const colors = { light: '${JSON.stringify(COLOR_PRIMARY)}', dark: '${JSON.stringify(COLOR_BLACK)}' }
              document.querySelectorAll('meta[name="theme-color"]').forEach(el => el.remove())
              const meta = document.createElement('meta')
              meta.name = 'theme-color'
              meta.content = colors[mode]
              document.head.appendChild(meta)
            }
          })()`}
      </Script>
    </body>
  );
}
