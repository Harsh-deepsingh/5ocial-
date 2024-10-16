import React from "react";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 ">
      <div className="p-2 md:p-10 md:border-l border-theme-border  bg-black flex flex-col gap-2 flex-1 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
