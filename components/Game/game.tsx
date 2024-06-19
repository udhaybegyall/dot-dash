import { useState } from "react";
import Grid from "./grid";
import Player from "./player";

type Game = {
    player1: string;
    player2: string;
}

const Game = ({ player1, player2 }: Game) => {
    const [currentPlayer, setCurrentPlayer] = useState<number>(1);
    const [scores, setScores] = useState({ player1: 0, player2: 0 });

    const handleSquareCompletion = (player: number) => {
        if (player === 1) {
          setScores((prevScores) => ({
            ...prevScores,
            player1: prevScores.player1 + 1,
          }));
        } else {
          setScores((prevScores) => ({
            ...prevScores,
            player2: prevScores.player2 + 1,
          }));
        }
    };
    
    const handleTurnEnd = (squareCompleted: boolean) => {
        if (!squareCompleted) {
          setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
        }
    };

    return (
        <div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Player
          name={player1}
          score={scores.player1}
          isCurrentPlayer={currentPlayer === 1}
        />
        <Player
          name={player2}
          score={scores.player2}
          isCurrentPlayer={currentPlayer === 2}
        />
      </div>
      <Grid
        rows={5}
        cols={10}
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