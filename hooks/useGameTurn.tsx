import { useState } from 'react';

type Player = 'player1' | 'player2';

function useGameTurn(initialPlayer: Player) {
  const [currentPlayer, setCurrentPlayer] = useState(initialPlayer);

  function switchTurn() {
    setCurrentPlayer(prevPlayer =>
      prevPlayer === 'player1' ? 'player2' : 'player1'
    );
  }

  function isCurrentPlayer(player: Player) {
    return currentPlayer === player;
  }

  return {
    currentPlayer,
    switchTurn,
    isCurrentPlayer,
  };
}

export default useGameTurn;
