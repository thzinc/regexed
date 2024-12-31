import { useCallback, useEffect, useRef } from "react";
import { Button } from "../Button";
import { HelpDialog } from "./HelpDialog";
import { useStats } from "../use-stats";

export function ViewHelpButton() {
  const { loading, hasStats } = useStats();
  const modalRef = useRef<HTMLDialogElement>(null);

  const showHelp = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const hideHelp = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  useEffect(() => {
    if (loading) return;
    if (hasStats) return;

    showHelp();
  }, [hasStats, loading, showHelp]);
  return (
    <>
      <HelpDialog onClose={hideHelp} modalRef={modalRef} />
      <Button onClick={showHelp}>How to Play</Button>
    </>
  );
}
