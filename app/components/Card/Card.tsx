import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="gap-5 bg-theme-grey p-7  border rounded-md border-theme-border flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default Card;
