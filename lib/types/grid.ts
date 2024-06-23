import { Coordinate } from './common';
import { PlayerID } from './player';

export interface Dot extends Coordinate {
  isSelected: boolean;
}

export interface Connection {
  dot1: Coordinate;
  dot2: Coordinate;
}

export interface Square extends Coordinate {
  player: string;
}

export interface GridState {
  selectedDot: Coordinate | null;
  connections: Connection[];
  squares: Square[];
}

export interface GridProps {
  rows: number;
  cols: number;
  dotSize: number;
  spacing: number;
  onSquareCompletion: (player: PlayerID) => void;
  onTurnEnd: (squareCompleted: boolean) => void;
}