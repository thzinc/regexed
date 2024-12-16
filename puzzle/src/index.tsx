import React from "react";
import ReactDOM from "react-dom/client";
import { LandingApp } from "./LandingApp";
import { PuzzleApp } from "./PuzzleApp";

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
        puzzleNumber={puzzleEl.dataset.puzzleNumber}
        type={puzzleEl.dataset.type}
        theme={puzzleEl.dataset.theme}
        challenges={challenges}
      />
    </React.StrictMode>
  );
}

const rootEl = document.getElementById("root") as HTMLElement;
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  const fakePuzzle = {
    playUrl: "/puzzles/3",

    puzzleNumber: "3",
    type: "needle-in-the-haystack",
    theme: "group-chat",
    challenges: [
      {
        haystack: "omg, have you seen regexed.com?",
        needle: ["regexed.com", "regexed.com?"],
        theme: "person-a",
      },
      {
        haystack:
          "Whoa! Today's puzzle at https://regexed.com/puzzle/3 is very meta.",
        needle: "https://regexed.com/puzzle/3",
        theme: "person-b",
      },
      {
        haystack:
          "Wait, are **we** in this puzzle? Is https://regexed.com/puzzle/3#description talking about us?",
        needle: "https://regexed.com/puzzle/3#description",
        theme: "person-b",
      },
      {
        haystack:
          "I'm going to blog about this at http://bloggerpress.example?id=9176431&ref=The%20Meta. Help me go viral?",
        needle: "http://bloggerpress.example?id=9176431&ref=The%20Meta",
        theme: "person-a",
      },
      {
        haystack:
          "You know that's not how it works 😐 Nothing at bloggerpress.example goes #viral.",
        needle: "bloggerpress.example",
        theme: "person-b",
      },
    ],
  };

  root.render(
    <React.StrictMode>
      <LandingApp
        puzzleNumber={fakePuzzle.puzzleNumber}
        playUrl={fakePuzzle.playUrl}
      />
      <hr />

      <PuzzleApp
        puzzleNumber={fakePuzzle.puzzleNumber}
        type={fakePuzzle.type}
        theme={fakePuzzle.theme}
        challenges={fakePuzzle.challenges}
      />
    </React.StrictMode>
  );
}
