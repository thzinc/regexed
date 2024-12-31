import { RefObject } from "react";
import { Dialog } from "../Dialog";
import { Button } from "../Button";

interface HelpDialogProps {
  onClose: () => void;
  modalRef: RefObject<HTMLDialogElement>;
}
export function HelpDialog({ onClose, modalRef }: HelpDialogProps) {
  return (
    <Dialog ref={modalRef}>
      <h1>How to play</h1>
      <p>
        Write a{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions">
          Regular Expression
        </a>{" "}
        pattern to satisfy the prompt and match all five of the challenges in 6
        tries or fewer.
      </p>
      <p>
        At the start, none of the challenges are revealed yet. Rely on the
        prompt to guide you to make your best guess.
      </p>
      <p>
        With each attempt, challenges will be revealed from top to bottom. If a
        pattern matches a challenge, the next challenge will be revealed.
      </p>
      <p>
        While writing a pattern, each revealed challenge highlights the matching
        text and displays an indicator of whether the challenge is satisfied by
        the pattern.
      </p>
      <p>
        The{" "}
        <a href="https://tc39.es/ecma262/multipage/text-processing.html#sec-regexp-regular-expression-objects">
          ECMAScript Regular Expression
        </a>{" "}
        implementation is used here, with the Unicode sets mode (i.e., the{" "}
        <code>v</code> flag) enabled. This permits use of named Unicode sets in
        the pattern.
      </p>
      <div className="actions">
        <Button primaryCallToAction onClick={onClose}>
          Close
        </Button>
      </div>
    </Dialog>
  );
}
