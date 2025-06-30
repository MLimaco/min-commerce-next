import './globals.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { CartProvider } from '@/context/cartContext';
import Providers from '@/components/Providers';
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: 'Min-Commerce',
  description: 'Tu tienda online de confianza',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="font-inter">
        <Providers>
          <CartProvider>
            <Header session={session} />
            <main>
              {children}
            </main>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}