import dynamic from 'next/dynamic';
import { Plus_Jakarta_Sans } from 'next/font/google';

import './globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSelector } from '@/components/theme-selector';

const EasterEggs = dynamic(
  () => import('@/components/easter-eggs').then((mod) => mod.EasterEggs),
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
              className='absolute inset-0 z-0 opacity-30 dark:opacity-20'
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />
            <div className='relative z-10'>{children}</div>
            <ThemeSelector />
            <EasterEggs />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
