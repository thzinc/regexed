import { useEffect, useState } from "react";
import { ChallengesProps } from "../ChallengesProps";
import { GameChallenge } from "../../../types";
import "./index.css";

export function NeedleInTheHaystack({ puzzle, challenges }: ChallengesProps) {
  return (
    <div className={["challenges", puzzle.theme].join(" ")}>
      {challenges.map((c, i) => (
        <Challenge key={i} challenge={c} />
      ))}
    </div>
  );
}

interface ChallengeProps {
  challenge: GameChallenge;
}

function Challenge({ challenge }: ChallengeProps) {
  const [redacted, setRedacted] = useState<string>("REDACTED");

  useEffect(() => {
    const redacted = challenge.haystack
      .split(/\s/g)
      .map((word) => {
        return Array.from(word)
          .map(() => {
            const r = String.fromCharCode(33 + Math.floor(Math.random() * 93));
            return r;
          })
          .join("");
      })
      .join(" ");

    setRedacted(redacted);
  }, [challenge.haystack]);

  const content = challenge.revealed ? (
    <>
      {challenge.prefix}
      {challenge.highlight && (
        <span className="highlight">{challenge.highlight}</span>
      )}
      {challenge.suffix}
    </>
  ) : (
    <>{redacted}</>
  );

  const matchedClassName =
    challenge.revealed && challenge.matched ? "pass" : "fail";

  const revealedClassName = challenge.revealed ? "revealed" : "concealed";
  return (
    <>
      <div
        className={["challenge", matchedClassName, revealedClassName].join(" ")}
      >
        <div className="indicator">
          {challenge.revealed ? (challenge.matched ? "✅" : "❌") : ""}
        </div>
        <div className="content">{content}</div>
      </div>
    </>
  );
}
