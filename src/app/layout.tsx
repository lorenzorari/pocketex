import type { Metadata, Viewport } from 'next';
import { COLOR_WHITE } from '@/constants';
import './globals.css';
import '@/styles/variables.css';

export const metadata: Metadata = {
  title: 'Pocketex',
  description: 'A mini but cool Pokédex',
  icons: '/assets/svg/logo.svg',
};

export const viewport: Viewport = {
  themeColor: COLOR_WHITE,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en" suppressHydrationWarning>
      {children}
    </html>
  );
}
