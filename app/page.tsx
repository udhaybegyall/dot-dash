'use client';

import { Suspense } from 'react';
import PlayerSelection from '@/components/Game/player-selection';

export default function Home() {
    return (
        <main className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-24'>
            <div
                className='animate-background fixed inset-0 z-0 mt-20 h-full w-full'
                style={{
                    backgroundImage: "url('/assets/background2.png')",
                    backgroundSize: '120%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            />
            <div className='absolute inset-0 z-10 bg-background opacity-95' />
            {/* Gradient overlays */}
            <div className='pointer-events-none absolute inset-0 z-20'>
                {/* Left side gradient */}
                <div className='absolute left-0 top-0 h-full w-1/6 bg-gradient-to-r from-background to-transparent' />
                {/* Right side gradient */}
                <div className='absolute right-0 top-0 h-full w-1/6 bg-gradient-to-l from-background to-transparent' />
                {/* Bottom gradient */}
                <div className='absolute bottom-0 left-0 h-1/6 w-full bg-gradient-to-t from-background to-transparent' />
            </div>
            <div className='z-30'>
                <Suspense fallback={<div>Loading...</div>}>
                    <div className='flex flex-col items-center justify-center rounded-lg border border-border bg-background p-10'>
                        <h1 className='mb-5 text-lg text-white'>
                            Choose number of players
                        </h1>
                        <PlayerSelection />
                    </div>
                </Suspense>
            </div>
            <style jsx global>{`
                @keyframes backgroundMove {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }
                .animate-background {
                    animation: backgroundMove 60s ease infinite;
                }
            `}</style>
        </main>
    );
}
