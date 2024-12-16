import { Attempts } from "./Attempts";
import { PatternInput } from "./PatternInput";
import { Challenges } from "./Challenges";

interface PuzzleAppProps {
  puzzleNumber: string | undefined;
  type: string | undefined;
  theme: string | undefined;
  challenges: Array<any> | undefined;
}

export function PuzzleApp({
  puzzleNumber,
  type,
  theme,
  challenges,
}: PuzzleAppProps) {
  return (
    <>
      <Attempts />
      <PatternInput
        onChange={(...rest) => console.debug("change", rest)}
        onSubmit={(...rest) => console.debug("submit", rest)}
      />
      <Challenges />
    </>
  );
}
