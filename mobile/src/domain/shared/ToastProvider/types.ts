import type { ReactNode } from "react";

export type ToastContextType = {
  showToast: (params: {
    message: string;
    duration?: number;
    type?: "danger" | "warning" | "success";
  }) => void;
};

export type ToastProviderProps = {
  children: ReactNode;
};
