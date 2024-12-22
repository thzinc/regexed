import { Attempts } from "./Attempts";
import { ShareWidget } from "./ShareWidget";
import { GameAttempt, GameState } from "../types";
import "./GameResult.css";

interface GameResultProps {
  puzzleNumber: string;
  gameState: GameState;
  attempts: GameAttempt[];
  challengeCount: number;
  remainingAttempts: number;
}

export function GameResult({
  puzzleNumber,
  gameState,
  attempts,
  challengeCount,
  remainingAttempts,
}: GameResultProps) {
  if (gameState === GameState.Incomplete) {
    return <></>;
  }

  const won = gameState === GameState.Won;
  return (
    <div className="game-result">
      <h1>{won ? "You won!" : "You lost"}</h1>
      <Attempts attempts={attempts} challengeCount={challengeCount} />
      <ShareWidget
        attempts={attempts}
        maxAttempts={attempts.length + remainingAttempts}
        puzzleNumber={puzzleNumber}
        won={won}
      />
    </div>
  );
}
