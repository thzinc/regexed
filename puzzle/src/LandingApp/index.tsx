import { useCallback } from "react";
import { useStats } from "../use-stats";
import { Button } from "../Button";
import { ViewStatsButton } from "../ViewStatsButton";
import "./index.css";

interface LandingAppProps {
  puzzleNumber?: string;
  playUrl: string | undefined;
}
export function LandingApp({ puzzleNumber, playUrl }: LandingAppProps) {
  const { loading, hasCompletedLatestPuzzle } = useStats(puzzleNumber);

  const playPuzzle = useCallback(() => {
    if (!playUrl) return;
    window.location.href = playUrl;
  }, [playUrl]);

  return (
    <>
      <fieldset className="container">
        <ViewStatsButton puzzleNumber={puzzleNumber} />
        <Button
          type="button"
          primaryCallToAction
          analyticsEventName="Play"
          tabIndex={1}
          onClick={playPuzzle}
        >
          {!loading && hasCompletedLatestPuzzle ? "View Result" : "Play"}
        </Button>
      </fieldset>
    </>
  );
}
