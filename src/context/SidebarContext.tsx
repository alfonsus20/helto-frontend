import React, { createContext, useContext, useState } from "react";

type SidebarState = {
  isOpened: boolean;
  toogleIsOpened: () => void;
};

const defaultValue: SidebarState = {
  isOpened: true,
  toogleIsOpened: () => {},
};

const SidebarContext = createContext(defaultValue);

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const toogleIsOpened = () => {
    setIsOpened(!isOpened);
  };

  return (
    <SidebarContext.Provider value={{ isOpened, toogleIsOpened }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
