import { GameChallengeResult } from "../types";
import "./Attempt.css";

interface AttemptProps {
  placeholder?: boolean;
  source?: string;
  results?: GameChallengeResult[];
}

const classNameMap: Record<GameChallengeResult, string> = {
  [GameChallengeResult.Passed]: "passed",
  [GameChallengeResult.Failed]: "failed",
  [GameChallengeResult.NotAttempted]: "not-attempted",
};

const labelMap: Record<GameChallengeResult, string> = {
  [GameChallengeResult.Passed]: "Passed",
  [GameChallengeResult.Failed]: "Failed",
  [GameChallengeResult.NotAttempted]: "Not attempted",
};

const contentMap: Record<GameChallengeResult, string> = {
  [GameChallengeResult.Passed]: "✅",
  [GameChallengeResult.Failed]: "❌",
  [GameChallengeResult.NotAttempted]: "",
};

export function Attempt({
  placeholder = false,
  source,
  results,
}: AttemptProps) {
  return (
    <li className={["attempt", placeholder && "placeholder"].join(" ")}>
      <div className="results">
        {results?.map((result) => (
          <div
            className={["result", classNameMap[result]].join(" ")}
            aria-label={labelMap[result]}
          >
            <div className="icon">{contentMap[result]}</div>
          </div>
        ))}
      </div>
      <code>{source}</code>
    </li>
  );
}
