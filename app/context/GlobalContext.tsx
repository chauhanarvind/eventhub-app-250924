import { createContext, useState, ReactNode } from "react";

interface GlobalContextType {
  globalVar: boolean;
  setGlobalVar: (value: boolean) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  globalVar: false,
  setGlobalVar: () => {},
});

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [globalVar, setGlobalVar] = useState(false);

  return (
    <GlobalContext.Provider value={{ globalVar, setGlobalVar }}>
      {children}
    </GlobalContext.Provider>
  );
};
