import { useEffect, useState } from 'react';
import Grid from './grid';
import Player from './player';
import GameOverDialog from '@/components/game-over-dialog';
import { useGame } from '@/hooks/useGame';
import { PlayerID } from '@/lib/types/player';
import { useRouter } from 'next/navigation';

const Game = () => {
    const game = useGame();
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const totalSquares = (game.grid.rows - 1) * (game.grid.cols - 1);
        const totalScore =
            game.players.player1.score + game.players.player2.score;

        if (totalScore === totalSquares) {
            setIsGameOver(true);
            setWinner(
                game.players.player1.score > game.players.player2.score
                    ? game.players.player1.name
                    : game.players.player2.name
            );
        }
    }, [
        game.players.player1.score,
        game.players.player2.score,
        game.grid.rows,
        game.grid.cols,
        game.players.player1.name,
        game.players.player2.name,
    ]);

    const player_one_score = game.players?.player1?.score ?? 0;
    const player_two_score = game.players?.player2?.score ?? 0;

    // get the score of the winner
    const winnerScore =
        game.players.player1.score > game.players.player2.score
            ? game.players.player1.score
            : game.players.player2.score;

    const handleSquareCompletion = (player: PlayerID) => {
        game.incrementScore(player);
    };

    const handleTurnEnd = (squareCompleted: boolean) => {
        if (!squareCompleted) {
            game.switchTurn();
        }
    };

    const handleGameRestart = () => {
        game.resetGame();
        game.setGridSize(game.grid.rows, game.grid.cols);
        setIsGameOver(false);
    };

    const handleGameEnd = () => {
        game.fullReset();
        router.push('/');
    };

    return (
        <div>
            <div className='flex gap-4'>
                <Player
                    name={game.players.player1.name}
                    score={player_one_score}
                    isCurrentPlayer={game.isCurrentPlayer('player1')}
                    playerId={'player1'}
                />
                <Player
                    name={game.players.player2.name}
                    score={player_two_score}
                    isCurrentPlayer={game.isCurrentPlayer('player2')}
                    playerId={'player2'}
                />
            </div>
            <Grid
                rows={game.grid.rows}
                cols={game.grid.cols}
                dotSize={13}
                spacing={40}
                player1={game.players.player1.name}
                player2={game.players.player2.name}
                selectedDot={game.grid.selectedDot}
                connections={game.grid.connections}
                squares={game.grid.squares}
                currentPlayer={game.currentPlayer}
                // @ts-ignores
                onDotSelect={game.selectDot}
                onConnectionAdd={game.addConnection}
                onSquareAdd={game.addSquare}
                onSquareCompletion={handleSquareCompletion}
                onTurnEnd={handleTurnEnd}
            />
            <GameOverDialog
                isOpen={isGameOver}
                winner={winner}
                winnerScore={winnerScore}
                onClose={handleGameEnd}
                onRestart={handleGameRestart}
            />
        </div>
    );
};

export default Game;
