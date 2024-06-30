interface PlayerProps {
    name: string;
    score: number;
    isCurrentPlayer: boolean;
    playerId: string;
}

const Player = ({ name, score, isCurrentPlayer, playerId }: PlayerProps) => {
    return (
        <div
            style={{
                fontWeight: isCurrentPlayer ? 'bold' : 'normal',
                marginBottom: '20px',
                fontSize: '17px',
            }}
        >
            <p
                className={`mb-1 text-sm ${isCurrentPlayer ? (playerId === 'player1' ? 'text-[#2DBDF9]' : 'text-[#F28124]') : 'text-gray-400'}`}
            >
                {name}
            </p>
            <div
                className='flex h-7 w-7 items-center justify-center rounded-full border-2 border-border bg-card p-5'
                style={{
                    borderColor: isCurrentPlayer
                        ? playerId === 'player1'
                            ? '#2DBDF9'
                            : '#F28124'
                        : '#9a9a9a',
                }}
            >
                <p>{score}</p>
            </div>
        </div>
    );
};

export default Player;
