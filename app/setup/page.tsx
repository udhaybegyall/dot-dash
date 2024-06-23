'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const SetupPage = () => {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');

    const router = useRouter();

    const handleStartGame = () => {
        if (player1 && player2) {
            router.push(
                `/game?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}`
            );
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <Input
                type='text'
                placeholder='Player 1 Name'
                value={player1}
                onChange={e => setPlayer1(e.target.value)}
            />
            <Input
                type='text'
                placeholder='Player 2 Name'
                value={player2}
                onChange={e => setPlayer2(e.target.value)}
            />
            <Button onClick={handleStartGame}>Let&apos;s Go!</Button>
        </div>
    );
};

export default SetupPage;
