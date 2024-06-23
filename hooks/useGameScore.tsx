import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { incrementScore, resetScores } from '@/lib/store/slices/gameSlice';
import { PlayerID } from '@/lib/types/player';

function useGameScore() {
    const dispatch = useDispatch();
    const scores = useSelector((state: RootState) => state.game.scores);

    function incrementScoreAction(player: PlayerID) {
        dispatch(incrementScore(player));
    }

    function resetScoresAction() {
        dispatch(resetScores());
    }

    return {
        scores,
        incrementScore: incrementScoreAction,
        resetScores: resetScoresAction,
    };
}

export default useGameScore;
