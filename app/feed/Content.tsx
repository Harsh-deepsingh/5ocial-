import React from "react";
import SubContent from "./SubContent";

const Content = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div>
      {children}
      <SubContent></SubContent>
    </div>
  );
};

export default Content;
