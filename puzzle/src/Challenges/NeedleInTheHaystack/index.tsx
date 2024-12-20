import { ChallengesProps } from "../ChallengesProps";
import { GameChallenge } from "../../use-game";
import "./index.css";

export function NeedleInTheHaystack({ puzzle, challenges }: ChallengesProps) {
  return (
    <div className={["challenges", puzzle.theme].join(" ")}>
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
  const content = challenge.revealed ? (
    <>
      {challenge.prefix}
      {challenge.highlight && (
        <span className="highlight">{challenge.highlight}</span>
      )}
      {challenge.suffix}
    </>
  ) : (
    <>REDACTED</>
  );

  const matchedClassName =
    challenge.revealed && challenge.matched ? "pass" : "fail";

  const revealedClassName = challenge.revealed ? "revealed" : "concealed";
  return (
    <div
      className={["challenge", matchedClassName, revealedClassName].join(" ")}
    >
      {content}
    </div>
  );
}
