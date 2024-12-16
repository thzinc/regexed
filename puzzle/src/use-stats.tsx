import { useEffect, useState } from "react";

export function useStats() {
  const [hasStats, setHasStats] = useState<boolean>();

  useEffect(() => {
    setHasStats(true); // TODO: update to base on localStorage
  }, [setHasStats]);
  return {
    showModal: () => alert("show modal"), // TODO: Update to actually show modal
    hasStats,
  };
}
