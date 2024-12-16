import { Attempts } from "./Attempts";
import { PatternInput } from "./PatternInput";
import { Challenges } from "./Challenges";
import { Puzzle } from "./types";
import { useState } from "react";

interface PuzzleAppProps {
  puzzle: Puzzle;
}

export function PuzzleApp({ puzzle }: PuzzleAppProps) {
  const [pattern, setPattern] = useState<RegExp>();

  return (
    <>
      <Attempts />
      <PatternInput
        onChange={(valid, pattern) => setPattern(pattern)}
        onSubmit={(...rest) => console.debug("submit", rest)}
      />
      <Challenges puzzle={puzzle} pattern={pattern} />
    </>
  );
}
