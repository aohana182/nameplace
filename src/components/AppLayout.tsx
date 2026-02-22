import { ReactNode } from "react";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="h-screen w-full bg-background flex flex-col overflow-hidden">
      <Header />
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
};
