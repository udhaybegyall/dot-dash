import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { incrementScore, resetScores } from '@/lib/store/slices/gameSlice';

type Player = 'player1' | 'player2';

function useGameScore() {
    const dispatch = useDispatch();
    const scores = useSelector((state: RootState) => state.game.scores);

    function incrementScoreAction(player: Player) {
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
