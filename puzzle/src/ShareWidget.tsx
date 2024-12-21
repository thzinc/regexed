import { useCallback, useState } from "react";
import "./ShareWidget.css";
import { GameAttempt, GameChallengeResult } from "./use-game";

interface ShareWidgetProps {
  attempts: GameAttempt[];
  maxAttempts: number;
  puzzleNumber: string;
  won: boolean;
}

export function ShareWidget({
  attempts,
  maxAttempts,
  puzzleNumber,
  won,
}: ShareWidgetProps) {
  const [shared, setShared] = useState<any>();

  const share = useCallback(() => {
    const emojiBlock = attempts
      .map((attempt) =>
        attempt.results
          .map((result) => {
            switch (result) {
              case GameChallengeResult.Passed:
                return "✅";
              case GameChallengeResult.Failed:
                return "❌";
              case GameChallengeResult.NotAttempted:
              default:
                return "⬛️";
            }
          })
          .join("")
      )
      .join("\n");
    const attemptsText = won
      ? `${attempts.length}/${maxAttempts}`
      : `X/${maxAttempts}`;
    const shareText = `regexed 🗯️ #${puzzleNumber}: ${attemptsText}\n${emojiBlock}`;
    navigator.clipboard.writeText(shareText);

    if (shared) {
      clearTimeout(shared);
    }
    const timeout = setTimeout(() => setShared(undefined), 1000);
    setShared(timeout);
  }, [attempts, maxAttempts, puzzleNumber, shared, won]);
  return (
    <div className="share">
      <button type="button" onClick={share}>
        Share 📋
      </button>
      <div>{shared && "Copied to clipboard"}</div>
    </div>
  );
}
