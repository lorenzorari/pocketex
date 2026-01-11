import { Navbar } from './Navbar';

interface Props {
  children: React.ReactNode;
  logoColorCSS?: string;
}

export function DefaultLayout({ children, logoColorCSS }: Props) {
  return (
    <body>
      <Navbar logoColorCSS={logoColorCSS} />
      <main className="mx-auto 2xl:max-w-[1440px]">{children}</main>
    </body>
  );
}
