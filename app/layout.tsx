import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';

import './globals.css';

import TanStackProvider from '@/components/TanstackProvider/TanstackProvider';

const geistLato = Lato({
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
});

const geistComfortaa = Comfortaa({
  weight: ['700'],
  variable: '--font-comfortaa',
  subsets: ['cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Стартова сторінка',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

      <html
        lang="uk"
        className={`${geistLato.variable} ${geistComfortaa.variable}`}
    >
      <body>
        <TanStackProvider>
       {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
