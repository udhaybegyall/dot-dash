import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
    player1: string;
    player2: string;
}

const initialState: PlayerState = {
    player1: '',
    player2: '',
};

const playerSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        setPlayers: (
            state,
            action: PayloadAction<{ player1: string; player2: string }>
        ) => {
            state.player1 = action.payload.player1;
            state.player2 = action.payload.player2;
        },
    },
});

export const { setPlayers } = playerSlice.actions;

export default playerSlice.reducer;
