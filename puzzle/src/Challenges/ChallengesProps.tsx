import { Puzzle } from "../types";

export interface ChallengesProps {
  puzzle: Puzzle;
  pattern: RegExp | undefined;
}
