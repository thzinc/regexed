import { useCallback } from "react";
import { useStats } from "./use-stats";
import "./LandingApp.css";

interface LandingAppProps {
  puzzleNumber: string | undefined;
  playUrl: string | undefined;
}
export function LandingApp({ puzzleNumber, playUrl }: LandingAppProps) {
  const {
    showModal,
    closeModal,
    hasStats,
    played,
    bestStreak,
    currentStreak,
    winRate,
    attemptCounts,
    highestAttemptCount,
    modalRef,
  } = useStats();

  const playPuzzle = useCallback(() => {
    if (!playUrl) return;
    window.location.href = playUrl;
  }, [playUrl]);

  return (
    <>
      {hasStats && (
        <dialog className="stats-dialog" ref={modalRef}>
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
            <ol>
              {attemptCounts.map((attemptCount, attempt) => (
                <li>
                  {attempt}{" "}
                  <progress value={attemptCount} max={highestAttemptCount} />
                </li>
              ))}
            </ol>
          </div>
          <div>
            <button onClick={closeModal}>Close</button>
          </div>
        </dialog>
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
