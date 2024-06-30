'use client';

import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setPlayers, setGridSize } from '@/lib/store/slices/gameSlice';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { AlertCircle } from 'lucide-react';

const SetupPage = () => {
    const [player1, setPlayer1] = useState<string>('');
    const [player2, setPlayer2] = useState<string>('');
    const [rows, setRows] = useState<number>(0);
    const [cols, setCols] = useState<number>(0);
    const [error, setError] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('Names');

    const [maxGridSize, setMaxGridSize] = useState({ rows: 10, cols: 15 });

    const router = useRouter();
    const dispatch = useDispatch();

    const setGridSizeLimit = () => {
        if (window.innerWidth < 768) {
            setMaxGridSize({ rows: 5, cols: 5 });
        } else {
            setMaxGridSize({ rows: 10, cols: 15 });
        }
    };

    useEffect(() => {
        setGridSizeLimit();
        window.addEventListener('resize', setGridSizeLimit);

        return () => {
            window.removeEventListener('resize', setGridSizeLimit);
        };
    }, []);

    const handleNext = () => {
        if (player1 && player2) {
            setError('');
            setActiveTab('Grid Size');
        } else {
            setError('Please enter both player names');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleStartGame = () => {
        if (rows > 0 && cols > 0) {
            dispatch(setPlayers({ player1, player2 }));
            dispatch(setGridSize({ rows, cols }));
            router.push('/game');
        } else {
            setError('Please enter valid grid dimensions');
            setTimeout(() => setError(''), 3000);
        }
    };

    return (
        <div className='flex min-h-screen items-center justify-center p-10'>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className='w-[400px]'
            >
                <TabsList className='grid w-full grid-cols-2'>
                    <TabsTrigger value='Names'>Names</TabsTrigger>
                    <TabsTrigger value='Grid Size'>Grid Size</TabsTrigger>
                </TabsList>
                <TabsContent value='Names'>
                    <Card className='w-full max-w-md p-4'>
                        <CardHeader>
                            <CardTitle>Player Names</CardTitle>
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
                                className={
                                    error ? 'animate-pulse border-red-500' : ''
                                }
                            />
                            <Input
                                type='text'
                                placeholder='Player 2 Name'
                                value={player2}
                                onChange={e => setPlayer2(e.target.value)}
                                className={
                                    error ? 'animate-pulse border-red-500' : ''
                                }
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className='w-full' onClick={handleNext}>
                                Next
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='Grid Size'>
                    <Card className='w-full max-w-md p-4'>
                        <CardHeader>
                            <CardTitle>Grid Size</CardTitle>
                            <CardDescription>
                                Enter Grid Size
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
                                type='number'
                                placeholder='Rows'
                                value={rows}
                                onChange={e =>
                                    setRows(
                                        Math.min(
                                            parseInt(e.target.value),
                                            maxGridSize.rows
                                        )
                                    )
                                }
                                className={
                                    error ? 'animate-pulse border-red-600' : ''
                                }
                            />
                            <Input
                                type='number'
                                placeholder='Cols'
                                value={cols}
                                onChange={e =>
                                    setCols(
                                        Math.min(
                                            parseInt(e.target.value),
                                            maxGridSize.cols
                                        )
                                    )
                                }
                                className={
                                    error ? 'animate-pulse border-red-600' : ''
                                }
                            />
                        </CardContent>
                        <CardFooter>
                            <Button
                                className='w-full'
                                onClick={handleStartGame}
                            >
                                Let&apos;s Go!
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default SetupPage;
