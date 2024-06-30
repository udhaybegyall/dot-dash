import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlayerID } from '@/lib/types/player';
import { Coordinate } from '@/lib/types/common';
import { Connection, Square } from '@/lib/types/grid';

interface GameState {
    players: {
        [key in PlayerID]: {
            name: string;
            score: number;
        };
    };
    currentPlayer: PlayerID;
    grid: {
        rows: number;
        cols: number;
        selectedDot: Coordinate | null;
        squares: Square[];
        connections: Connection[];
    }
}

const initialState: GameState = {
    players: {
      player1: { name: '', score: 0 },
      player2: { name: '', score: 0 },
    },
    currentPlayer: 'player1',
    grid: {
      rows: 0,
      cols: 0,
      selectedDot: null,
      connections: [],
      squares: [],
    }
  };

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setPlayers: (state, action: PayloadAction<{ player1: string; player2: string }>) => {
            state.players.player1.name = action.payload.player1;
            state.players.player2.name = action.payload.player2;
        },
        setGridSize: (state, action: PayloadAction<{ rows: number; cols: number }>) => {
            state.grid.rows = action.payload.rows;
            state.grid.cols = action.payload.cols;
        },
        switchTurn: state => {
            state.currentPlayer =
                state.currentPlayer === 'player1' ? 'player2' : 'player1';
        },
        incrementScore: (
            state,
            action: PayloadAction<PlayerID>
        ) => {
            state.players[action.payload].score++;
        },
        selectDot: (state, action: PayloadAction<Coordinate | null>) => {
            state.grid.selectedDot = action.payload;
        },
        addConnection: (state, action: PayloadAction<Connection>) => {
            state.grid.connections.push(action.payload);
            state.grid.selectedDot = null;
        },
        addSquare: (state, action: PayloadAction<Square>) => {
            state.grid.squares.push(action.payload);
        },
        resetGame: state => {
            state.players.player1.score = 0;
            state.players.player2.score = 0;
            state.currentPlayer = 'player1';
            state.grid.selectedDot = null;
            state.grid.connections = [];
            state.grid.squares = [];
        },
        fullReset: () => {
            return initialState;
        },
    },
});

export const { 
    setPlayers, 
    setGridSize,
    switchTurn, 
    incrementScore, 
    selectDot, 
    addConnection, 
    addSquare,
    resetGame,
    fullReset
} = gameSlice.actions;

export default gameSlice.reducer;
