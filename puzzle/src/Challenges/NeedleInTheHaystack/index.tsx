import { useEffect, useState } from "react";
import { PuzzleChallenge } from "../../types";
import { ChallengesProps } from "../ChallengesProps";
import "./index.css";

export function NeedleInTheHaystack({ puzzle, pattern }: ChallengesProps) {
  return (
    <div>
      {puzzle.challenges.map((c) => (
        <Challenge challenge={c} revealed={true} pattern={pattern} />
      ))}
    </div>
  );
}

interface ChallengeProps {
  challenge: PuzzleChallenge;
  revealed: boolean;
  pattern: RegExp | undefined;
}
function Challenge({ challenge, revealed, pattern }: ChallengeProps) {
  const [match, setMatch] = useState<Array<string>>(["", "", ""]);
  const [foundNeedle, setFoundNeedle] = useState<boolean>(false);

  useEffect(() => {
    if (revealed && pattern) {
      const results = pattern.exec(challenge.haystack);
      if (results && results.length > 0) {
        const [result] = results;
        setMatch([
          challenge.haystack.slice(0, results.index),
          challenge.haystack.slice(
            results.index,
            results.index + result.length
          ),
          challenge.haystack.slice(results.index + result.length),
        ]);

        if (challenge.needle instanceof Array) {
          setFoundNeedle(challenge.needle.includes(result));
        } else {
          setFoundNeedle(result === challenge.needle);
        }
      } else {
        setMatch([challenge.haystack, "", ""]);
        setFoundNeedle(false);
      }
    } else {
      setMatch([challenge.haystack, "", ""]);
      setFoundNeedle(false);
    }
  }, [revealed, challenge, pattern]);

  if (revealed) {
    const [prefix, highlight, suffix] = match;

    return (
      <div className={foundNeedle ? "pass" : "fail"}>
        {prefix}
        {highlight && <span className="highlight">{highlight}</span>}
        {suffix}
      </div>
    );
  } else {
    return <div>REDACTED</div>;
  }
}
