/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

interface DrawerContextProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

interface DrawerProviderProps {
  children: ReactNode;
}

export const DrawerContext = createContext({} as DrawerContextProps);

export function useDrawerContext() {
  return useContext(DrawerContext);
}

export function DrawerProvider({ children }: DrawerProviderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerState => !oldDrawerState);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}
