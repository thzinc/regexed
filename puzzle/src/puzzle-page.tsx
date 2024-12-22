import React from "react";
import ReactDOM from "react-dom/client";
import { PuzzleApp } from "./PuzzleApp";

const puzzleEl = document.getElementById("puzzle") as HTMLElement;
if (puzzleEl) {
  const puzzle = ReactDOM.createRoot(puzzleEl);
  const challengesEl = document.getElementById(
    puzzleEl.dataset.challengesId!
  ) as HTMLScriptElement;
  const challenges = JSON.parse(challengesEl.textContent!) as any[];
  puzzle.render(
    <React.StrictMode>
      <PuzzleApp
        puzzle={{
          puzzleNumber: puzzleEl.dataset.puzzleNumber!,
          type: puzzleEl.dataset.type!,
          theme: puzzleEl.dataset.theme!,
          challenges,
        }}
      />
    </React.StrictMode>
  );
}
