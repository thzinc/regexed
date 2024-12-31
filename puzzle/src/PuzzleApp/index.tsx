import { AttemptsRemaining } from "./AttemptsRemaining";
import { Challenges } from "./Challenges";
import { GameResult } from "./GameResult";
import { PatternInput } from "./PatternInput";
import { Puzzle, GameState } from "../types";
import { useGame } from "../use-game";
import { ViewHelpButton } from "../ViewHelpButton";
import "./index.css";

interface PuzzleAppProps {
  puzzle: Puzzle;
}

export function PuzzleApp({ puzzle }: PuzzleAppProps) {
  const {
    attempt,
    attempts,
    gameChallenges,
    gameState,
    remainingAttempts,
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
      <div className="attemptsContainer">
        <AttemptsRemaining
          count={gameState === GameState.Incomplete ? remainingAttempts : 0}
        />
        <ViewHelpButton />
      </div>
      <Challenges puzzle={puzzle} challenges={gameChallenges} />
    </>
  );
}
