import type { Metadata } from "next";
import "./globals.css";
import "@/styles/variables.css";


export const metadata: Metadata = {
  title: "Pocketex",
  description: "A mini but cool Pokedex",
  icons: "/assets/svg/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
