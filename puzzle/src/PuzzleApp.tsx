import { AttemptsRemaining } from "./AttemptsRemaining";
import { Challenges } from "./Challenges";
import { GameResult } from "./GameResult";
import { PatternInput } from "./PatternInput";
import { Puzzle, GameState } from "./types";
import { useGame } from "./use-game";

interface PuzzleAppProps {
  puzzle: Puzzle;
}

export function PuzzleApp({ puzzle }: PuzzleAppProps) {
  const {
    gameState,
    gameChallenges,
    remainingAttempts,
    attempts,
    attempt,
    setPattern,
  } = useGame(puzzle);

  return (
    <>
      <GameResult
        gameState={gameState}
        attempts={attempts}
        challengeCount={gameChallenges.length}
        remainingAttempts={remainingAttempts}
        puzzleNumber={puzzle.puzzleNumber}
      />
      <PatternInput
        disabled={gameState !== GameState.Incomplete}
        onChange={(pattern) => setPattern(pattern)}
        onSubmit={(pattern, source) => attempt(pattern, source)}
      />
      <AttemptsRemaining
        count={gameState === GameState.Incomplete ? remainingAttempts : 0}
      />
      <Challenges puzzle={puzzle} challenges={gameChallenges} />
    </>
  );
}
