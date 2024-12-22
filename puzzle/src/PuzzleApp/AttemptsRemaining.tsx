import "./AttemptsRemaining.css";
interface AttemptsRemainingProps {
  count: number;
}

export function AttemptsRemaining({ count }: AttemptsRemainingProps) {
  const content = (function () {
    switch (count) {
      case 0:
        return "Game over";
      case 1:
        return "Last attempt";
      default:
        return `${count} attempts remaining`;
    }
  })();

  return <div className="attempts-remaining">{content}</div>;
}
