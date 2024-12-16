import { useCallback } from "react";
import "./LandingApp.css";
import { useStats } from "./use-stats";

interface LandingAppProps {
  puzzleNumber: string | undefined;
  playUrl: string | undefined;
}
export function LandingApp({ puzzleNumber, playUrl }: LandingAppProps) {
  const { showModal, hasStats } = useStats();

  const playPuzzle = useCallback(() => {
    if (!playUrl) return;
    window.location.href = playUrl;
  }, [playUrl]);

  return (
    <fieldset className="container">
      {hasStats && (
        <button type="button" tabIndex={2} onClick={showModal}>
          View Stats
        </button>
      )}
      <button type="button" className="cta" tabIndex={1} onClick={playPuzzle}>
        Play
      </button>
    </fieldset>
  );
}
