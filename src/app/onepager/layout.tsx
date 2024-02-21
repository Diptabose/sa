import SetNav from "@/components/ui/nav/SetNav";
import { ReactNode } from "react";

const OnepagerLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-full w-full overflow-y-auto">
      <SetNav />
      {children}
    </div>
  );
};

export default OnepagerLayout;
