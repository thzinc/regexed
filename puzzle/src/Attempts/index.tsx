import { useEffect, useState } from "react";
import { GameAttempt, GameChallengeResult } from "../use-game";
import { Attempt } from "./Attempt";
import "./index.css";

interface AttemptsProps {
  attempts: Array<GameAttempt>;
  remainingAttempts: number;
  challengeCount: number;
}

interface PlaceholderAttempt {
  results: GameChallengeResult[];
}

export function Attempts({
  remainingAttempts,
  challengeCount,
  attempts,
}: AttemptsProps) {
  const [placeholders, setPlaceholders] = useState<PlaceholderAttempt[]>([]);

  useEffect(() => {
    const results: GameChallengeResult[] = [];
    for (let i = 0; i < challengeCount; i++) {
      results.push(GameChallengeResult.NotAttempted);
    }

    const placeholders: PlaceholderAttempt[] = [];
    for (let i = 0; i < remainingAttempts; i++) {
      placeholders.push({ results });
    }

    setPlaceholders(placeholders);
  }, [challengeCount, remainingAttempts]);

  return (
    <div className="attempts">
      {remainingAttempts} attempts remaining
      <ul>
        {attempts.map((attempt, i) => (
          <Attempt key={i} source={attempt.source} results={attempt.results} />
        ))}
        {placeholders.map((attempt, i) => (
          <Attempt key={i} placeholder results={attempt.results} />
        ))}
      </ul>
    </div>
  );
}
