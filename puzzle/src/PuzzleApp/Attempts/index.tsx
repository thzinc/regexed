import { useEffect, useState } from "react";
import { GameAttempt, GameChallengeResult } from "../../types";
import { Attempt } from "./Attempt";
import "./index.css";

interface AttemptsProps {
  attempts: GameAttempt[];
  remainingAttempts?: number;
  challengeCount: number;
}

interface PlaceholderAttempt {
  results: GameChallengeResult[];
}

export function Attempts({
  remainingAttempts = 0,
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
