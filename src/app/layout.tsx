import './globals.css';
import { AuthProvider } from "@/components/Providers";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { CartProvider } from '@/context/cartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Min-Commerce',
  description: 'Tu tienda online de confianza',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main>
              {children}
            </main>
            {/* Aquí podrías añadir un Footer */}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}