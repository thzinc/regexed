import { useEffect, useState } from "react";
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

const MAX_ATTEMPTS = 6;

export function useGame({ challenges }: Puzzle) {
  const [pattern, setPattern] = useState<RegExp>();
  const [attempts, setAttempts] = useState<Array<GameAttempt>>([]);
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

      setRevealedChallengeIndex(nextRevealedChallengeIndex);
      setAttempts(nextAttempts);
      setRemainingAttempts(MAX_ATTEMPTS - nextAttempts.length);

      if (gameChallenges.every((gc) => gc.matched)) {
        setGameState(GameState.Won);
      } else if (nextAttempts.length < MAX_ATTEMPTS) {
        setGameState(GameState.Incomplete);
      } else {
        setGameState(GameState.Lost);
      }
    },
  };
}
