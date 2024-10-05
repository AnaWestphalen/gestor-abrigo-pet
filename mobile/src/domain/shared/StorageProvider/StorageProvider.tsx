import { Storage } from "@ionic/storage";
import {
  type FC,
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

interface StorageContextProps {
  storage: Storage | null;
}

export const StorageContext = createContext<StorageContextProps>({
  storage: null,
});

export const StorageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [storage, setStorage] = useState<Storage | null>(null);

  useEffect(() => {
    const initStorage = async () => {
      const newStorage = new Storage();
      await newStorage.create();
      setStorage(newStorage);
    };

    if (!storage) initStorage();
  }, []);

  return (
    <StorageContext.Provider value={{ storage }}>
      {children}
    </StorageContext.Provider>
  );
};
