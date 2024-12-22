export interface Puzzle {
  puzzleNumber: string;
  type: string;
  theme: string;
  challenges: PuzzleChallenge[];
}

export interface PuzzleChallenge {
  haystack: string;
  needle: string | string[];
}

export interface GameChallenge extends PuzzleChallenge, ChallengeMatch {
  revealed: boolean;
}

export interface ChallengeMatch {
  matched: boolean;
  prefix: string;
  highlight: string;
  suffix: string;
}

export enum GameState {
  Incomplete,
  Won,
  Lost,
}

export enum GameChallengeResult {
  Passed,
  Failed,
  NotAttempted,
}

export interface GameAttempt {
  pattern: RegExp;
  source: string;
  results: GameChallengeResult[];
}

export interface RecordedGame {
  revealedChallengeIndex: number;
  attempts: GameAttempt[];
  gameState: GameState;
  updatedAt: string;
  puzzleNumber: string;
  version: string;
}
