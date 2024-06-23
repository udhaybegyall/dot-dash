import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { switchTurn } from '@/lib/store/slices/gameSlice';

type Player = 'player1' | 'player2';

function useGameTurn() {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(
        (state: RootState) => state.game.currentPlayer
    );

    function switchTurnAction() {
        dispatch(switchTurn());
    }

    function isCurrentPlayer(player: Player) {
        return currentPlayer === player;
    }

    return {
        currentPlayer,
        switchTurn: switchTurnAction,
        isCurrentPlayer,
    };
}

export default useGameTurn;
