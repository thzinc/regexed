import { useCallback, useState } from "react";
import "./ShareWidget.css";
import { GameAttempt, GameChallengeResult } from "../types";
import { Button } from "../Button";
import { ViewStatsButton } from "../ViewStatsButton";

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
      <ViewStatsButton puzzleNumber={puzzleNumber} />
      <Button
        primaryCallToAction
        analyticsEventName="Share"
        type="button"
        onClick={share}
      >
        Share {shared ? "✅" : "📋"}
      </Button>
    </div>
  );
}
