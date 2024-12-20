import { useEffect, useState } from "react";
import { PuzzleChallenge } from "../../types";
import { ChallengesProps } from "../ChallengesProps";
import "./index.css";
import { GameChallenge } from "../../use-game";

export function NeedleInTheHaystack({ puzzle, challenges }: ChallengesProps) {
  return (
    <div>
      {challenges.map((c) => (
        <Challenge challenge={c} />
      ))}
    </div>
  );
}

interface ChallengeProps {
  challenge: GameChallenge;
}
function Challenge({ challenge }: ChallengeProps) {
  if (challenge.revealed) {
    return (
      <div className={challenge.matched ? "pass" : "fail"}>
        {challenge.prefix}
        {challenge.highlight && (
          <span className="highlight">{challenge.highlight}</span>
        )}
        {challenge.suffix}
      </div>
    );
  } else {
    return <div>REDACTED</div>;
  }
}
