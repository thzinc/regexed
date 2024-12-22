import { ChallengesProps } from "./ChallengesProps";
import { NeedleInTheHaystack } from "./NeedleInTheHaystack";

export function Challenges(props: ChallengesProps) {
  switch (props.puzzle.type) {
    case "needle-in-the-haystack":
    default:
      return <NeedleInTheHaystack {...props} />;
  }
}
