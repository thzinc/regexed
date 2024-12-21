import { useCallback, useEffect, useState } from "react";
import { Puzzle, PuzzleChallenge } from "./types";

export interface GameChallenge extends PuzzleChallenge, ChallengeMatch {
  revealed: boolean;
}

interface ChallengeMatch {
  matched: boolean;
  prefix: string;
  highlight: string;
  suffix: string;
}

export enum GameState {
  Incomplete,
  Won,
  Lost,
}

export enum GameChallengeResult {
  Passed,
  Failed,
  NotAttempted,
}

export interface GameAttempt {
  pattern: RegExp;
  source: string;
  results: Array<GameChallengeResult>;
}

interface RecordedGame {
  revealedChallengeIndex: number;
  attempts: GameAttempt[];
  gameState: GameState;
}

const MAX_ATTEMPTS = 6;

export function useGame({ puzzleNumber, challenges }: Puzzle) {
  const key = `puzzles/${puzzleNumber}`;
  const [pattern, setPattern] = useState<RegExp>();
  const [attempts, setAttempts] = useState<GameAttempt[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.Incomplete);
  const [challengeMatches, setChallengeMatches] = useState<
    Array<ChallengeMatch>
  >([]);
  const [revealedChallengeIndex, setRevealedChallengeIndex] =
    useState<number>(-1);
  const [gameChallenges, setGameChallenges] = useState<Array<GameChallenge>>(
    []
  );
  const [remainingAttempts, setRemainingAttempts] =
    useState<number>(MAX_ATTEMPTS);

  useEffect(() => {
    const recordedGameString = localStorage.getItem(key);
    if (!recordedGameString) return;

    const { attempts, gameState, revealedChallengeIndex } = JSON.parse(
      recordedGameString
    ) as RecordedGame;
    setAttempts(attempts);
    setGameState(gameState);
    setRevealedChallengeIndex(revealedChallengeIndex);
  }, []);

  useEffect(() => {
    setChallengeMatches(
      challenges.map((challenge) => {
        const { haystack, needle } = challenge;
        const results = pattern?.exec(haystack);
        if (results && results.length > 0) {
          const [found] = results;

          let matched = false;
          if (challenge.needle instanceof Array) {
            matched = needle.includes(found);
          } else {
            matched = found === needle;
          }

          return {
            matched,
            prefix: haystack.slice(0, results.index),
            highlight: haystack.slice(
              results.index,
              results.index + found.length
            ),
            suffix: haystack.slice(results.index + found.length),
          };
        }

        return {
          matched: false,
          prefix: haystack,
          highlight: "",
          suffix: "",
        };
      })
    );
  }, [pattern, challenges]);

  useEffect(() => {
    setGameChallenges(
      challenges.map((challenge, i) => ({
        ...challenge,
        ...challengeMatches[i],
        revealed: i <= revealedChallengeIndex,
      }))
    );
  }, [challenges, challengeMatches, revealedChallengeIndex]);

  const recordGame = useCallback(
    (
      revealedChallengeIndex: number,
      attempts: GameAttempt[],
      gameState: GameState
    ) => {
      const recordedGame: RecordedGame = {
        revealedChallengeIndex,
        attempts,
        gameState,
      };
      localStorage.setItem(key, JSON.stringify(recordedGame));

      setRevealedChallengeIndex(revealedChallengeIndex);
      setAttempts(attempts);
      setGameState(gameState);
    },
    [puzzleNumber]
  );

  return {
    pattern,
    setPattern,
    attempts,
    remainingAttempts,
    gameState,
    gameChallenges,
    attempt(pattern: RegExp, source: string) {
      if (gameState !== GameState.Incomplete) return;

      const { i: lastConsecutiveMatchIndex } = gameChallenges.reduce(
        (prev, gc, i) => {
          if (!prev.cont) return prev;

          if (!gc.matched) {
            return {
              ...prev,
              cont: false,
            };
          }

          return {
            i,
            cont: true,
          };
        },
        { i: -1, cont: true }
      );
      const nextRevealedChallengeIndex = Math.min(
        Math.max(lastConsecutiveMatchIndex + 1, attempts.length),
        gameChallenges.length - 1
      );
      const nextAttempts = [
        ...attempts,
        {
          pattern,
          source,
          results: gameChallenges.map((gc, i) => {
            if (nextRevealedChallengeIndex < i)
              return GameChallengeResult.NotAttempted;
            if (gc.matched) return GameChallengeResult.Passed;
            return GameChallengeResult.Failed;
          }),
        },
      ];

      const nextGameState = (function () {
        if (gameChallenges.every((gc) => gc.matched)) {
          return GameState.Won;
        } else if (nextAttempts.length < MAX_ATTEMPTS) {
          return GameState.Incomplete;
        } else {
          return GameState.Lost;
        }
      })();

      recordGame(nextRevealedChallengeIndex, nextAttempts, nextGameState);
      setRemainingAttempts(MAX_ATTEMPTS - nextAttempts.length);
    },
  };
}
