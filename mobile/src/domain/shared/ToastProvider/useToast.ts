import { useContext } from "react";

import { ToastContext } from "src/domain/shared/ToastProvider/ToastProvider";
import type { ToastContextType } from "src/domain/shared/ToastProvider/types";

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
