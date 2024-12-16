import React from "react";
import ReactDOM from "react-dom/client";
import { LandingApp } from "./LandingApp";
import { PuzzleApp } from "./PuzzleApp";
import { Puzzle } from "./types";

const landingEl = document.getElementById("landing") as HTMLElement;
if (landingEl) {
  const landing = ReactDOM.createRoot(landingEl);
  landing.render(
    <React.StrictMode>
      <LandingApp
        puzzleNumber={landingEl.dataset.puzzleNumber}
        playUrl={landingEl.dataset.playUrl}
      />
    </React.StrictMode>
  );
}

const puzzleEl = document.getElementById("puzzle") as HTMLElement;
if (puzzleEl) {
  const puzzle = ReactDOM.createRoot(puzzleEl);
  const challengesEl = document.getElementById(
    puzzleEl.dataset.challengesId!
  ) as HTMLScriptElement;
  const challenges = JSON.parse(challengesEl.textContent!) as Array<any>;
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

const rootEl = document.getElementById("root") as HTMLElement;
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  const playUrl = "/puzzles/3";
  const fakePuzzle = {
    puzzleNumber: "3",
    type: "needle-in-the-haystack",
    theme: "group-chat",
    challenges: [
      {
        haystack: "omg, have you seen regexed.com?",
        needle: ["regexed.com", "regexed.com?"],
        metadata: { sender: "Alice" },
      },
      {
        haystack:
          "Whoa! Today's puzzle at https://regexed.com/puzzle/3 is very meta.",
        needle: "https://regexed.com/puzzle/3",
        metadata: { sender: "Bob" },
      },
      {
        haystack:
          "Wait, are **we** in this puzzle? Is https://regexed.com/puzzle/3#description talking about us?",
        needle: "https://regexed.com/puzzle/3#description",
        metadata: { sender: "Bob" },
      },
      {
        haystack:
          "I'm going to blog about this at http://bloggerpress.example?id=9176431&ref=The%20Meta. Help me go viral?",
        needle: "http://bloggerpress.example?id=9176431&ref=The%20Meta",
        metadata: { sender: "Alice" },
      },
      {
        haystack:
          "You know that's not how it works 😐 Nothing at bloggerpress.example goes #viral.",
        needle: "bloggerpress.example",
        metadata: { sender: "Bob" },
      },
    ],
  } as Puzzle;

  root.render(
    <React.StrictMode>
      <LandingApp puzzleNumber={fakePuzzle.puzzleNumber} playUrl={playUrl} />
      <hr />

      <PuzzleApp puzzle={fakePuzzle} />
    </React.StrictMode>
  );
}
