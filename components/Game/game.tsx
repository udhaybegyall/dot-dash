import { useState } from 'react';
import Grid from './grid';
import Player from './player';
import useGameTurn from '@/hooks/useGameTurn';

type Game = {
  player1: string;
  player2: string;
};

const Game = ({ player1, player2 }: Game) => {
  // const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const { currentPlayer, switchTurn, isCurrentPlayer } = useGameTurn('player1');
  const [scores, setScores] = useState({ player1: 0, player2: 0 });

  const handleSquareCompletion = (player: string) => {
    if (player === 'player1') {
      setScores(prevScores => ({
        ...prevScores,
        player1: prevScores.player1 + 1,
      }));
    } else {
      setScores(prevScores => ({
        ...prevScores,
        player2: prevScores.player2 + 1,
      }));
    }
  };

  const handleTurnEnd = (squareCompleted: boolean) => {
    if (!squareCompleted) {
      // setCurrentPlayer(prevPlayer => (prevPlayer === 1 ? 2 : 1));
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
