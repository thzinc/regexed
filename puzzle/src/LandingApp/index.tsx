import { useCallback } from "react";
import { useStats } from "../use-stats";
import "./index.css";
import { StatsDialog } from "./StatsDialog";
import { Button } from "../Button";

interface LandingAppProps {
  puzzleNumber: string | undefined;
  playUrl: string | undefined;
}
export function LandingApp({ puzzleNumber, playUrl }: LandingAppProps) {
  const {
    showModal,
    hasStats,
    closeModal,
    played,
    bestStreak,
    currentStreak,
    winRate,
    attemptCounts,
    modalRef,
    hasCompletedLatestPuzzle,
  } = useStats(puzzleNumber);

  const playPuzzle = useCallback(() => {
    if (!playUrl) return;
    window.location.href = playUrl;
  }, [playUrl]);

  return (
    <>
      <StatsDialog
        onClose={closeModal}
        played={played}
        bestStreak={bestStreak}
        currentStreak={currentStreak}
        winRate={winRate}
        attemptCounts={attemptCounts}
        modalRef={modalRef}
      />
      <fieldset className="container">
        {hasStats && (
          <Button type="button" tabIndex={2} onClick={showModal}>
            View Stats
          </Button>
        )}
        <Button
          type="button"
          primaryCallToAction
          tabIndex={1}
          onClick={playPuzzle}
        >
          {hasCompletedLatestPuzzle ? "View Result" : "Play"}
        </Button>
      </fieldset>
    </>
  );
}
