import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./index.css";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  primaryCallToAction?: boolean;
  analyticsEventName?: string;
}

export function Button({
  primaryCallToAction = false,
  analyticsEventName,
  ...props
}: ButtonProps) {
  const ctaClassName = primaryCallToAction ? "cta" : undefined;
  const plausibleEventClassName = analyticsEventName
    ? `plausible-event-name=${analyticsEventName?.replace(/\s/g, "+")}`
    : undefined;
  return (
    <button
      {...props}
      className={["button", ctaClassName, plausibleEventClassName].join(" ")}
    />
  );
}
