import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { COLOR_BLACK, COLOR_WHITE } from '@/constants';

export const metadata: Metadata = {
  title: 'Pocketex',
  description: 'A mini but cool Pokédex',
  icons: '/assets/svg/logo.svg',
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: COLOR_WHITE,
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: COLOR_BLACK,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {children}
    </html>
  );
}
