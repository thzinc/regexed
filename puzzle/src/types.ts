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
