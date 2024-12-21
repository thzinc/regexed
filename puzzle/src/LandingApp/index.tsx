import { useCallback } from "react";
import { useStats } from "../use-stats";
import "./index.css";
import { StatsDialog } from "./StatsDialog";

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
  } = useStats();

  const playPuzzle = useCallback(() => {
    if (!playUrl) return;
    window.location.href = playUrl;
  }, [playUrl]);

  return (
    <>
      {hasStats && (
        <StatsDialog
          onClose={closeModal}
          played={played}
          bestStreak={bestStreak}
          currentStreak={currentStreak}
          winRate={winRate}
          attemptCounts={attemptCounts}
          modalRef={modalRef}
        />
      )}
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
    </>
  );
}
