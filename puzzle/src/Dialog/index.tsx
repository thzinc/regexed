import { DetailedHTMLProps, DialogHTMLAttributes } from "react";
import "./index.css";

interface DialogProps
  extends DetailedHTMLProps<
    DialogHTMLAttributes<HTMLDialogElement>,
    HTMLDialogElement
  > {}
export function Dialog({ ...props }: DialogProps) {
  return <dialog {...props} />;
}
