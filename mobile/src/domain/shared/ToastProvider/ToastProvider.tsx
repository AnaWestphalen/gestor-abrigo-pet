import { IonToast } from "@ionic/react";
import { type FC, createContext, useState } from "react";

import type {
  ToastContextType,
  ToastProviderProps,
} from "src/domain/shared/ToastProvider/types";

export const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toastProps, setToastProps] = useState<{
    isOpen: boolean;
    message?: string;
    duration: number;
    color?: "danger" | "warning" | "success";
  }>({ isOpen: false, message: undefined, duration: 3500 });

  const showToast: ToastContextType["showToast"] = (params) => {
    setToastProps({ ...toastProps, ...params, isOpen: true });
  };

  const clearToast = () => {
    setToastProps({ isOpen: false, duration: 3500 });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <IonToast {...toastProps} animated onDidDismiss={clearToast} />
    </ToastContext.Provider>
  );
};
