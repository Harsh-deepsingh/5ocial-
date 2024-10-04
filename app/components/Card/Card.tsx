import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex justify-center items-center text-white ">
      <div className="gap-5 w-full bg-theme-grey p-7  border rounded-md border-theme-border flex flex-col ">
        {children}
      </div>
    </div>
  );
};

export default Card;
