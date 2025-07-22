'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RadioGroup from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

const PlayerSelection = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const router = useRouter();

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleStartGame = () => {
        if (selectedOption) {
            router.push(`/setup?players=${selectedOption}`);
        }
    };

    return (
        <>
            <div className='mb-10'>
                <RadioGroup
                    options={['2P', '3P', '4P']}
                    onChange={handleOptionChange}
                />
            </div>
            <Button
                size='lg'
                onClick={handleStartGame}
                disabled={!selectedOption}
                className='text-lg'
            >
                Start Game
            </Button>
        </>
    );
};

export default PlayerSelection;
