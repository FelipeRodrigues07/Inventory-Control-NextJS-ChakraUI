import React, { ReactNode } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";

interface SidebarContextProps {
  children: ReactNode;
}

const SidebarContext = React.createContext<UseDisclosureReturn | null>(null);

export const SidebarProvider: React.FC<SidebarContextProps> = ({ children }) => {
  const disclosure = useDisclosure();

  return (
    <SidebarContext.Provider value={disclosure}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};