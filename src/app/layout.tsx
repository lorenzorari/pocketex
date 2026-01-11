import type { Metadata, Viewport } from 'next';
import './globals.css';
import '@/styles/variables.css';
import { COLOR_WHITE } from '@/constants';

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
  return <html lang="en">{children}</html>;
}
