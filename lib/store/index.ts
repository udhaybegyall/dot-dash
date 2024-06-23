import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import gridReducer from './slices/gridSlice';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        grid: gridReducer,
        player: playerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
