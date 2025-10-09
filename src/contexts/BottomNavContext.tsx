import { createContext, useContext, useState, ReactNode } from "react";

interface BottomNavContextType {
  useBottomNav: boolean;
  toggleBottomNav: () => void;
}

const BottomNavContext = createContext<BottomNavContextType | undefined>(undefined);

export function BottomNavProvider({ children }: { children: ReactNode }) {
  const [useBottomNav, setUseBottomNav] = useState(true);

  const toggleBottomNav = () => {
    setUseBottomNav((prev) => !prev);
  };

  return (
    <BottomNavContext.Provider value={{ useBottomNav, toggleBottomNav }}>
      {children}
    </BottomNavContext.Provider>
  );
}

export function useBottomNavContext() {
  const context = useContext(BottomNavContext);
  if (context === undefined) {
    throw new Error("useBottomNavContext must be used within a BottomNavProvider");
  }
  return context;
}
