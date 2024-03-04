import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UIProvider } from '@/lib/nextui/UIProvider';
import './globals.css';
import { Footer } from './components/shared/Footer';
import { LocaleProvider } from '@/locales/localeProvider';
import { StoreProvider } from '@/lib/redux/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GraphiQL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <head>
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicons/favicon-96x96.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/favicons/apple-icon-60x60.png"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon-180x180.png"
          type="image/png"
        />
        <link rel="manifest" href="/favicons/manifest.json" />
      </head>
      <body className={inter.className}>
        <LocaleProvider>
          <StoreProvider>
            <UIProvider>
              {children}
              <Footer />
            </UIProvider>
          </StoreProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
