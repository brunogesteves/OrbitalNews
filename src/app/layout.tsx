import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '@/components/home/Header/Header.view';
import Footer from '@/components/Common/Footer';
import NextAuthSessionProvider from '@/providers/sessionProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Orbital News',
  description: 'The Most Important News',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white relative">
        <NextAuthSessionProvider>
          {children}
          <Footer />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
