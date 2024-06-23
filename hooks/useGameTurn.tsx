import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { switchTurn } from '@/lib/store/slices/gameSlice';
import { PlayerID } from '@/lib/types/player';

function useGameTurn() {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(
        (state: RootState) => state.game.currentPlayer
    );

    function switchTurnAction() {
        dispatch(switchTurn());
    }

    function isCurrentPlayer(player: PlayerID) {
        return currentPlayer === player;
    }

    return {
        currentPlayer,
        switchTurn: switchTurnAction,
        isCurrentPlayer,
    };
}

export default useGameTurn;
