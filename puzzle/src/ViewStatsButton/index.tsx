import { Button } from "../Button";
import { StatsDialog } from "./StatsDialog";
import { useStats } from "../use-stats";

interface ViewStatsButtonProps {
  puzzleNumber?: string;
}
export function ViewStatsButton({ puzzleNumber }: ViewStatsButtonProps) {
  const {
    attemptCounts,
    bestStreak,
    closeModal,
    currentStreak,
    hasStats,
    loading,
    modalRef,
    played,
    showModal,
    winRate,
  } = useStats(puzzleNumber);
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
      {!loading && hasStats && (
        <Button
          analyticsEventName="View Stats"
          type="button"
          tabIndex={2}
          onClick={showModal}
        >
          View Stats
        </Button>
      )}
    </>
  );
}
