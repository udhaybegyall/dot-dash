'use client';

import Game from '@/components/Game/game';

const GamePage = () => {
    // const [players, setPlayers] = useState({ player1: '', player2: '' });

    // useEffect(() => {
    //     if (player1 && player2) {
    //         setPlayers({ player1, player2 });
    //     } else {
    //         router.push('/setup');
    //     }
    // }, [player1, player2, router]);

    // if (!players.player1 || !players.player2) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            {/* <h1 className='text-3xl font-bold'>Game</h1> */}
            <Game />
        </div>
    );
};

export default GamePage;
