import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dot {
    x: number;
    y: number;
}

interface Connection {
    dot1: Dot;
    dot2: Dot;
}

interface Square {
    x: number;
    y: number;
    player: string;
}

interface GridState {
    selectedDot: Dot | null;
    connections: Connection[];
    squares: Square[];
}

const initialState: GridState = {
    selectedDot: null,
    connections: [],
    squares: [],
};

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        selectDot: (state, action: PayloadAction<Dot>) => {
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
