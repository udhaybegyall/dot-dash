import type { Metadata } from 'next';
import { Jersey_15, Jersey_20 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import StoreProvider from './store-provider';

import './globals.css';
import Navbar from '@/components/ui/navbar';

const jersey15 = Jersey_15({ 
    subsets: ['latin'],
    variable: '--font-jersey-15',
    weight: '400'
});

const jersey20 = Jersey_20({ 
    subsets: ['latin'],
    variable: '--font-jersey-20',
    weight: '400'
});

export const metadata: Metadata = {
    title: 'Dot Dash',
    description: 'A fun nostalgia game.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${jersey15.variable} ${jersey20.variable}`} style={{ fontFamily: 'var(--font-jersey-20)' }}>
                <ThemeProvider
                    attribute='class'
                    defaultTheme='dark'
                    enableSystem={true}
                >
                    <Navbar />
                    <StoreProvider>{children}</StoreProvider>
                    <Analytics />
                </ThemeProvider>
            </body>
        </html>
    );
}
