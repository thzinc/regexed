import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import "./Button.css";
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  primaryCallToAction?: boolean;
}
export function Button({ primaryCallToAction = false, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={["button", primaryCallToAction && "cta"].join(" ")}
    />
  );
}
