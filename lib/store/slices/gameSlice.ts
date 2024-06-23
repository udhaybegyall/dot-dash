import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState } from '@/lib/types/game';

const initialState: GameState = {
    currentPlayer: 'player1',
    scores: {
        player1: 0,
        player2: 0,
    },
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        switchTurn: state => {
            state.currentPlayer =
                state.currentPlayer === 'player1' ? 'player2' : 'player1';
        },
        incrementScore: (
            state,
            action: PayloadAction<'player1' | 'player2'>
        ) => {
            state.scores[action.payload]++;
        },
        resetScores: state => {
            state.scores = { player1: 0, player2: 0 };
        },
    },
});

export const { switchTurn, incrementScore, resetScores } = gameSlice.actions;
export default gameSlice.reducer;
