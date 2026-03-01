import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Pocketex',
  description: 'A mini but cool Pokédex',
  icons: '/assets/svg/logo.svg',
  verification: {
    google: 'DSgL2xeRX1u2zjkIo9TG9DCsbDVd7mtMmVbOOtgP6Yg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        {children}
      </html>
    </>
  );
}
