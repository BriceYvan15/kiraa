
export enum AppStage {
  LOGIN = 'LOGIN',
  PUZZLE = 'PUZZLE',
  MESSAGE = 'MESSAGE'
}

export interface Tile {
  id: number;
  currentPos: number;
  correctPos: number;
}

export interface GeminiResponse {
  poem: string;
  reasons: string[];
}
