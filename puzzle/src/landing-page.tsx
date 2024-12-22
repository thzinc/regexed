import React from "react";
import ReactDOM from "react-dom/client";
import { LandingApp } from "./LandingApp";

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
