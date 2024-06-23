import Grid from './grid';
import Player from './player';
import useGameTurn from '@/hooks/useGameTurn';
import useGameScore from '@/hooks/useGameScore';

type Game = {
    player1: string;
    player2: string;
};

const Game = ({ player1, player2 }: Game) => {
    const { currentPlayer, switchTurn, isCurrentPlayer } = useGameTurn();
    const { scores, incrementScore } = useGameScore();

    const handleSquareCompletion = (player: 'player1' | 'player2') => {
        incrementScore(player);
    };

    const handleTurnEnd = (squareCompleted: boolean) => {
        if (!squareCompleted) {
            switchTurn();
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Player
                    name={player1}
                    score={scores.player1}
                    isCurrentPlayer={isCurrentPlayer('player1')}
                />
                <Player
                    name={player2}
                    score={scores.player2}
                    isCurrentPlayer={isCurrentPlayer('player2')}
                />
            </div>
            <Grid
                rows={5}
                cols={5}
                dotSize={13}
                spacing={40}
                player1={player1}
                player2={player2}
                currentPlayer={currentPlayer}
                onSquareCompletion={handleSquareCompletion}
                onTurnEnd={handleTurnEnd}
            />
        </div>
    );
};

export default Game;
