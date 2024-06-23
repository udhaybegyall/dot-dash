'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import { AlertCircle } from 'lucide-react';

const SetupPage = () => {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const [error, setError] = useState<string>('');

    const router = useRouter();

    const handleStartGame = () => {
        if (player1 && player2) {
            router.push(
                `/game?player1=${encodeURIComponent(player1)}&player2=${encodeURIComponent(player2)}`
            );
        } else {
            setError('Please enter both player names');
            setTimeout(() => setError(''), 3000); // Remove error after 3 seconds
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center p-10'>
            <Card className='w-full max-w-md p-4'>
                <CardHeader>
                    <CardTitle>Setup</CardTitle>
                    <CardDescription>
                        Enter Player names
                        {error && (
                            <div className='mt-2 flex items-center text-red-500'>
                                <AlertCircle className='mr-1 h-5 w-5' />
                                <span>{error}</span>
                            </div>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <Input
                        type='text'
                        placeholder='Player 1 Name'
                        value={player1}
                        onChange={e => setPlayer1(e.target.value)}
                        className={error ? 'animate-pulse border-red-500' : ''}
                    />
                    <Input
                        type='text'
                        placeholder='Player 2 Name'
                        value={player2}
                        onChange={e => setPlayer2(e.target.value)}
                        className={error ? 'animate-pulse border-red-500' : ''}
                    />
                </CardContent>
                <CardFooter>
                    <Button className='w-full' onClick={handleStartGame}>
                        Let&apos;s Go!
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default SetupPage;
