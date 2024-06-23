export type PlayerID = 'player1' | 'player2';

export interface Player {
    id: PlayerID;
    name: string;
    score: number;
}

export type PlayerState = {
    [key in PlayerID]: Player;
};