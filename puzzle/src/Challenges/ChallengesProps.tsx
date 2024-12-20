import { Puzzle } from "../types";
import { GameChallenge } from "../use-game";

export interface ChallengesProps {
  puzzle: Puzzle;
  challenges: Array<GameChallenge>;
}
