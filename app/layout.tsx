import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import StoreProvider from './store-provider';

import './globals.css';
import Navbar from '@/components/ui/navbar';

const inter = Inter({ subsets: ['latin'] });

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
            <body className={inter.className}>
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
