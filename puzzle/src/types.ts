export interface Puzzle {
  puzzleNumber: string;
  type: string;
  theme: string;
  challenges: Array<PuzzleChallenge>;
}

export interface PuzzleChallenge {
  haystack: string;
  needle: string | Array<string>;
  metadata: Record<string, string>;
}
