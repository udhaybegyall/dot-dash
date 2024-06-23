import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridState, Connection, Square } from '@/lib/types/grid';
import { Coordinate } from '@/lib/types/common';

const initialState: GridState = {
    selectedDot: null,
    connections: [],
    squares: [],
};

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        selectDot: (state, action: PayloadAction<Coordinate>) => {
            state.selectedDot = action.payload;
        },
        addConnection: (state, action: PayloadAction<Connection>) => {
            state.connections.push(action.payload);
            state.selectedDot = null;
        },
        addSquare: (state, action: PayloadAction<Square>) => {
            state.squares.push(action.payload);
        },
    },
});

export const { selectDot, addConnection, addSquare } = gridSlice.actions;
export default gridSlice.reducer;
