import { Attempts } from "./Attempts";
import { PatternInput } from "./PatternInput";
import { Challenges } from "./Challenges";
import { Puzzle } from "./types";
import { GameState, useGame } from "./use-game";

interface PuzzleAppProps {
  puzzle: Puzzle;
}

export function PuzzleApp({ puzzle }: PuzzleAppProps) {
  const {
    gameState,
    gameChallenges,
    attempts,
    remainingAttempts,
    attempt,
    setPattern,
  } = useGame(puzzle);

  return (
    <>
      <Challenges puzzle={puzzle} challenges={gameChallenges} />
      <PatternInput
        disabled={gameState !== GameState.Incomplete}
        onChange={(pattern) => setPattern(pattern)}
        onSubmit={(pattern, source) => attempt(pattern, source)}
      />
      <Attempts
        remainingAttempts={remainingAttempts}
        challengeCount={gameChallenges.length}
        attempts={attempts}
      />
    </>
  );
}
