export interface GameState {
  gameId: string;
  points: number;
  lives: number;
  running: boolean;
  controls: any;
  session: boolean;
}
