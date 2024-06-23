'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import RadioGroup from '@/components/ui/radio-group';
import { useState } from 'react';

export default function Home() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const router = useRouter();

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleStartGame = () => {
        router.push('/setup');
    };

    return (
        <main className='flex min-h-screen flex-col items-center justify-center p-24'>
            <h1 className='mb-5 text-lg'>Choose number of players</h1>
            <div className='mb-10'>
                <RadioGroup
                    options={['2P', '3P', '4P']}
                    onChange={handleOptionChange}
                />
            </div>
            <Button size='lg' onClick={handleStartGame}>
                Start Game
            </Button>
        </main>
    );
}
