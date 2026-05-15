import type { Metadata } from 'next';
import { Playfair_Display, Inter, Poppins } from 'next/font/google';
import './globals.css';
import FloatingContactWrapper from '@/components/FloatingContact/FloatingContactWrapper';
import BackToTop from '@/components/BackToTop';
import { CartProvider } from '@/context/CartContext';
import { Toaster } from 'react-hot-toast';

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

const fontPoppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800'],
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
      <body className={`${fontSans.variable} ${fontSerif.variable} ${fontPoppins.variable} antialiased`}>
        <CartProvider>
          {children}
          <FloatingContactWrapper />
          <BackToTop />
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                borderRadius: '16px',
                background: '#333',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 'bold',
                padding: '16px 24px',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
