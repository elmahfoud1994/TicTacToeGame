export interface Result {
  winPlayer?: number;
  winCells?: number[][];
  draw?: boolean;
}

export interface FeedbackBarProps {
  player: number;
  result: Result;
  resetGame: () => void;
}

export interface BoardProps {
  values: number[][];
  result: Result;
  player: number;
  playCell: (row: number, cell: number) => void;
}

export interface CellProps {
  value: number;
  player: number;
  playCell?: () => void;
  indexIsWinner?: boolean;
  winPlayer?: number;
}
