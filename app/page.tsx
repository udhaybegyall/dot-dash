'use client';

import { Suspense } from 'react';
import PlayerSelection from '../components/game/player-selection';

export default function Home() {
    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-24'>
            <h1 className='mb-5 text-lg'>Choose number of players</h1>

            <Suspense fallback={<div>Loading...</div>}>
                <PlayerSelection />
            </Suspense>
        </main>
    );
}
