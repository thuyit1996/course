import { ReactNode } from "react";

type AlertType = "success" | "error" | "info" | "warning";
type AlertPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

let showAlert: (type: AlertType, message: ReactNode, position?: AlertPosition) => void = () => {};

export const alert = {
  success: (msg: string | ReactNode, position?: AlertPosition) => showAlert("success", msg, position),
  error: (msg: string, position?: AlertPosition) => showAlert("error", msg, position),
  info: (msg: string, position?: AlertPosition) => showAlert("info", msg, position),
  warning: (msg: string, position?: AlertPosition) => showAlert("warning", msg, position),
};

export const setAlertHandler = (
  handler: (type: AlertType, message: ReactNode, position?: AlertPosition) => void
) => {
  showAlert = handler;
};