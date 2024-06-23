import { PlayerID } from './player';

export interface Scores {
    player1: number;
    player2: number;
}

export interface GameState {
    currentPlayer: PlayerID;
    scores: Scores;
}

export type GameAction = 
    | { type: 'SWITCH_TURN' }
    | {type: 'INCREMENT_SCORE', payload: PlayerID}
    | {type: 'RESET_SCORES' }