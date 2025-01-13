import dynamic from 'next/dynamic';
import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';

import { CustomCursor } from '@/components/custom-cursor';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';

const EasterEggs = dynamic(
  () => import('@/components/easter-eggs').then((mod) => mod.EasterEggs),
  { ssr: false },
);

const ThemeSelector = dynamic(
  () => import('@/components/theme-selector').then((mod) => mod.ThemeSelector),
  { ssr: false },
);

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

const themeScript = `
  let theme = window.localStorage.getItem('theme')
  if (!theme) {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  document.documentElement.classList.add(theme)
`;

export const metadata = {
  title: 'Open Source Miners United',
  description: 'Advancing open source mining technologies together',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='scroll-smooth' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/svg/favicon.svg' type='image/svg+xml' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={jakarta.className}>
        <ThemeProvider>
          <div className='min-h-screen bg-background text-foreground relative'>
            <div
              className='absolute inset-0 z-0 opacity-50 dark:opacity-30'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='%239C92AC' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px',
              }}
            />
            <div className='relative z-10'>
              {children}
              <Footer />
            </div>
            <ThemeSelector />
            <EasterEggs />
            <CustomCursor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
