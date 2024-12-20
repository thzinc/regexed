import { Attempts } from "./Attempts";
import { PatternInput } from "./PatternInput";
import { Challenges } from "./Challenges";
import { Puzzle } from "./types";
import { useState } from "react";
import { GameState, useGame } from "./use-game";

interface PuzzleAppProps {
  puzzle: Puzzle;
}

export function PuzzleApp({ puzzle }: PuzzleAppProps) {
  const { gameState, gameChallenges, attempt, setPattern } = useGame(puzzle);

  switch (gameState) {
    case GameState.Incomplete:
      return (
        <>
          <Attempts />
          <PatternInput
            onChange={(valid, pattern) => setPattern(pattern)}
            onSubmit={(pattern) => attempt(pattern)}
          />
          <Challenges puzzle={puzzle} challenges={gameChallenges} />
        </>
      );
    case GameState.Lost:
      return <>YOU DIED</>;
    case GameState.Won:
      return <>w00t</>;
  }
}
