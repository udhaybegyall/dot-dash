import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import {
    setPlayers,
    setGridSize,
    switchTurn,
    incrementScore,
    selectDot,
    addConnection,
    addSquare,
    resetGame,
    fullReset,
} from '@/lib/store/slices/gameSlice';
import { PlayerID } from '@/lib/types/player';
import { Connection, Square } from '@/lib/types/grid';
import { Coordinate } from '@/lib/types/common';

export function useGame() {
    const dispatch = useDispatch();
    const game = useSelector((state: RootState) => state.game);

    return {
        ...game,
        setPlayers: (players: { player1: string; player2: string }) =>
            dispatch(setPlayers(players)),
        setGridSize: (rows: number, cols: number) =>
            dispatch(setGridSize({ rows, cols })),
        switchTurn: () => dispatch(switchTurn()),
        incrementScore: (player: PlayerID) => dispatch(incrementScore(player)),
        selectDot: (dot: Coordinate) => dispatch(selectDot(dot)),
        addConnection: (connection: Connection) =>
            dispatch(addConnection(connection)),
        addSquare: (square: Square) => dispatch(addSquare(square)),
        resetGame: () => dispatch(resetGame()),
        fullReset: () => dispatch(fullReset()),
        isCurrentPlayer: (player: PlayerID) => game.currentPlayer === player,
    };
}
