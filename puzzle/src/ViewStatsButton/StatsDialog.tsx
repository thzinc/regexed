import { RefObject, useMemo } from "react";
import "./StatsDialog.css";
import { Button } from "../Button";
import { Dialog } from "../Dialog";

interface StatsDialogProps {
  onClose: () => void;
  played: number;
  bestStreak: number;
  currentStreak: number;
  winRate: number;
  attemptCounts: number[];
  modalRef: RefObject<HTMLDialogElement>;
}

export function StatsDialog({
  onClose,
  played,
  bestStreak,
  currentStreak,
  winRate,
  attemptCounts,
  modalRef,
}: StatsDialogProps) {
  const highestAttemptCount = useMemo(
    () =>
      attemptCounts.reduce(
        (max, attemptCount) => Math.max(max, attemptCount),
        0
      ),
    [attemptCounts]
  );
  return (
    <Dialog className="stats-dialog" ref={modalRef}>
      <div className="win-stats">
        <div>
          <figure>
            <figcaption>Played</figcaption>
            <div>{played}</div>
          </figure>
          <figure>
            <figcaption>Win Rate</figcaption>
            <div>{Math.round(winRate * 100)}%</div>
          </figure>
        </div>
        <div>
          <figure>
            <figcaption>Current streak</figcaption>
            <div>{currentStreak}</div>
          </figure>
          <figure>
            <figcaption>Best streak</figcaption>
            <div>{bestStreak}</div>
          </figure>
        </div>
      </div>
      <div className="attempt-stats">
        <h2>Games by attempts</h2>
        <ol>
          {attemptCounts.map((attemptCount, i) => (
            <li key={i}>
              <span>{i + 1}.</span>
              <progress value={attemptCount} max={highestAttemptCount} />
              <span>({attemptCount})</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="actions">
        <Button primaryCallToAction onClick={onClose}>
          Close
        </Button>
      </div>
    </Dialog>
  );
}
