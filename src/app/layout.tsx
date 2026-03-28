import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import FloatingContactWrapper from '@/components/FloatingContact/FloatingContactWrapper';

const fontSerif = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700', '900'],
});

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Mavia Coffee Roastery',
  description: 'Nghệ thuật rang xay cà phê nguyên chất',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${fontSans.variable} ${fontSerif.variable} antialiased`}>
        {children}
        <FloatingContactWrapper />
      </body>
    </html>
  );
}
