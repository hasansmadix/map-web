import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from 'sonner';
import QueryProvider from '@/providers/query-provider';
import NextTopLoader from 'nextjs-toploader';

export const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-en',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MAP Media Art Production',
  description:
    'MAP Media Art Production is a leading media production company in the UAE, delivering creative video, film, and digital content across the Middle East.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" className={`${outfit.variable} light`} suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <QueryProvider>
          <NextTopLoader color="var(--color-primary)" showSpinner={false} />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontSize: '0.875rem',
                textAlign: 'start',
              },
              className: `antialiased`,
            }}
          />

          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
