import { AttemptsRemaining } from "./AttemptsRemaining";
import { Challenges } from "./Challenges";
import { PatternInput } from "./PatternInput";
import { Puzzle } from "./types";
import { GameState, useGame } from "./use-game";

interface PuzzleAppProps {
  puzzle: Puzzle;
}

export function PuzzleApp({ puzzle }: PuzzleAppProps) {
  const { gameState, gameChallenges, remainingAttempts, attempt, setPattern } =
    useGame(puzzle);

  return (
    <>
      <PatternInput
        disabled={gameState !== GameState.Incomplete}
        onChange={(pattern) => setPattern(pattern)}
        onSubmit={(pattern, source) => attempt(pattern, source)}
      />
      <AttemptsRemaining count={remainingAttempts} />
      <Challenges puzzle={puzzle} challenges={gameChallenges} />
    </>
  );
}
